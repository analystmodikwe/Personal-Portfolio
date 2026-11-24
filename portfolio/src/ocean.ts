import * as THREE from "three";

const waterVertexShader = `
  uniform float uTime;
  varying float vHeight;
  varying float vDistance;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vec3 displaced = position;
    vec2 point = position.xy;

    float firstPhase = dot(point, vec2(0.82, 0.57)) * 0.11 + uTime * 0.32;
    float secondPhase = dot(point, vec2(-0.58, 0.81)) * 0.16 - uTime * 0.23;
    float thirdPhase = dot(point, vec2(0.15, -0.99)) * 0.23 + uTime * 0.19;
    float fourthPhase = dot(point, vec2(-0.95, -0.31)) * 0.08 - uTime * 0.14;

    float height = sin(firstPhase) * 0.27
      + sin(secondPhase) * 0.16
      + sin(thirdPhase) * 0.08
      + sin(fourthPhase) * 0.11;
    vec2 gradient = cos(firstPhase) * vec2(0.82, 0.57) * 0.11 * 0.27
      + cos(secondPhase) * vec2(-0.58, 0.81) * 0.16 * 0.16
      + cos(thirdPhase) * vec2(0.15, -0.99) * 0.23 * 0.08
      + cos(fourthPhase) * vec2(-0.95, -0.31) * 0.08 * 0.11;

    displaced.z += height;
    vHeight = height;
    vDistance = uv.y;
    vUv = uv;
    vNormal = normalize(normalMatrix * vec3(-gradient.x, -gradient.y, 1.0));
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`;

const waterFragmentShader = `
  varying float vHeight;
  varying float vDistance;
  varying vec2 vUv;
  varying vec3 vNormal;

  void main() {
    vec3 deep = vec3(0.016, 0.094, 0.169);
    vec3 middle = vec3(0.043, 0.227, 0.357);
    vec3 blue = vec3(0.106, 0.424, 0.561);
    vec3 foam = vec3(0.953, 0.973, 0.973);
    vec3 warm = vec3(1.0, 0.478, 0.239);

    float heightMix = smoothstep(-0.25, 0.22, vHeight);
    vec3 sea = mix(deep, middle, heightMix);
    sea = mix(sea, blue, smoothstep(0.12, 0.48, vHeight));

    float viewFresnel = pow(1.0 - max(dot(normalize(vNormal), vec3(0.0, 0.0, 1.0)), 0.0), 2.4);
    float sunSide = smoothstep(0.32, 0.92, vUv.x);
    float reflection = viewFresnel * sunSide * 0.11;
    sea = mix(sea, mix(warm, vec3(1.0, 0.698, 0.478), 0.42), reflection);

    float crest = smoothstep(0.33, 0.47, vHeight) * 0.24;
    sea = mix(sea, foam, crest);

    vec3 dusk = mix(vec3(0.016, 0.094, 0.169), vec3(0.20, 0.27, 0.32), smoothstep(0.82, 1.0, vDistance));
    float horizonGlow = exp(-pow((vUv.x - 0.72) * 4.0, 2.0)) * smoothstep(0.76, 0.98, vDistance) * 0.28;
    dusk += vec3(1.0, 0.45, 0.22) * horizonGlow;
    vec3 color = mix(sea, dusk, smoothstep(0.78, 0.995, vDistance));

    gl_FragColor = vec4(color, 1.0);
  }
`;

const sprayVertexShader = `
  uniform float uTime;
  attribute float aSeed;
  varying float vAlpha;

  void main() {
    vec3 point = position;
    float rise = mod(uTime * 0.08 + aSeed * 2.7, 2.0);
    point.y += rise;
    vAlpha = (0.12 + 0.28 * sin(uTime * 0.35 + aSeed * 6.28))
      * (1.0 - smoothstep(1.5, 2.0, rise));
    vec4 viewPosition = modelViewMatrix * vec4(point, 1.0);
    gl_Position = projectionMatrix * viewPosition;
    gl_PointSize = clamp(2.0 * (24.0 / -viewPosition.z), 1.0, 3.2);
  }
`;

const sprayFragmentShader = `
  varying float vAlpha;

  void main() {
    float radius = length(gl_PointCoord - vec2(0.5));
    float softDot = 1.0 - smoothstep(0.22, 0.5, radius);
    gl_FragColor = vec4(0.953, 0.973, 0.973, vAlpha * softDot);
  }
`;

function createSunTexture(): THREE.CanvasTexture | undefined {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (!context) return undefined;

  const glow = context.createRadialGradient(64, 64, 2, 64, 64, 64);
  glow.addColorStop(0, "rgba(255, 122, 61, 0.42)");
  glow.addColorStop(0.35, "rgba(255, 122, 61, 0.16)");
  glow.addColorStop(1, "rgba(255, 122, 61, 0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function initOcean(container: HTMLElement): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const isSmallScreen = () =>
    window.innerWidth < 768 || (navigator.hardwareConcurrency || 8) <= 4;
  let renderer: THREE.WebGLRenderer;

  try {
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.innerWidth >= 768,
      powerPreference: "low-power",
    });
  } catch {
    return () => {};
  }

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(container.clientWidth, container.clientHeight, false);
  renderer.domElement.className = "ocean-canvas";
  renderer.domElement.setAttribute("aria-hidden", "true");
  container.prepend(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 240);
  camera.position.set(0, 4, 14);
  camera.lookAt(0, 0, -25);

  const waterMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: waterVertexShader,
    fragmentShader: waterFragmentShader,
    side: THREE.DoubleSide,
  });
  const water = new THREE.Mesh(
    new THREE.PlaneGeometry(180, 128, 64, 64),
    waterMaterial,
  );
  // Rotate the plane so the shader's local Z displacement becomes world Y.
  water.rotation.x = -Math.PI / 2;
  scene.add(water);

  const sunTexture = createSunTexture();
  let sunMaterial: THREE.SpriteMaterial | undefined;
  if (sunTexture) {
    sunMaterial = new THREE.SpriteMaterial({
      map: sunTexture,
      color: 0xff7a3d,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sun = new THREE.Sprite(sunMaterial);
    sun.position.set(6, 1.6, -72);
    sun.scale.set(24, 24, 1);
    scene.add(sun);
  }

  const sprayGeometry = new THREE.BufferGeometry();
  const sprayPositions = new Float32Array(120 * 3);
  const spraySeeds = new Float32Array(120);
  for (let index = 0; index < 120; index += 1) {
    sprayPositions[index * 3] = (Math.random() - 0.5) * 76;
    sprayPositions[index * 3 + 1] = Math.random() * 1.8;
    sprayPositions[index * 3 + 2] = -4 - Math.random() * 52;
    spraySeeds[index] = Math.random();
  }
  sprayGeometry.setAttribute("position", new THREE.BufferAttribute(sprayPositions, 3));
  sprayGeometry.setAttribute("aSeed", new THREE.BufferAttribute(spraySeeds, 1));
  const sprayMaterial = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: sprayVertexShader,
    fragmentShader: sprayFragmentShader,
    transparent: true,
    depthWrite: false,
  });
  scene.add(new THREE.Points(sprayGeometry, sprayMaterial));

  let frameId = 0;
  let elapsed = 0;
  let lastFrameTime = 0;
  let visible = false;
  let disposed = false;
  let targetPointerX = 0;
  let targetPointerY = 0;
  let scrollProgress = 0;
  let cameraTargetX = 0;
  let cameraTargetY = 4;
  let waterSegments = 64;

  const resize = () => {
    const width = Math.max(container.clientWidth, 1);
    const height = Math.max(container.clientHeight, 1);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);

    const segments = isSmallScreen() ? 64 : 128;
    if (segments !== waterSegments) {
      water.geometry.dispose();
      water.geometry = new THREE.PlaneGeometry(180, 128, segments, segments);
      waterSegments = segments;
    }
  };

  const updateScroll = () => {
    const rect = container.getBoundingClientRect();
    scrollProgress = THREE.MathUtils.clamp(-rect.top / Math.max(rect.height, 1), 0, 1);
    renderer.domElement.style.opacity = String(1 - scrollProgress);
  };

  const onPointerMove = (event: PointerEvent) => {
    const bounds = container.getBoundingClientRect();
    targetPointerX = ((event.clientX - bounds.left) / Math.max(bounds.width, 1) - 0.5) * 2;
    targetPointerY = ((event.clientY - bounds.top) / Math.max(bounds.height, 1) - 0.5) * 2;
  };
  const onPointerLeave = () => {
    targetPointerX = 0;
    targetPointerY = 0;
  };

  const renderFrame = (now: number) => {
    if (disposed || !visible || document.hidden) {
      frameId = 0;
      return;
    }
    const delta = lastFrameTime ? Math.min((now - lastFrameTime) / 1000, 0.05) : 0;
    lastFrameTime = now;
    elapsed += delta;
    waterMaterial.uniforms.uTime.value = elapsed;
    sprayMaterial.uniforms.uTime.value = elapsed;

    cameraTargetX += (targetPointerX * 1.5 - cameraTargetX) * 0.025;
    cameraTargetY +=
      (4 + targetPointerY * -0.45 + scrollProgress * 2.5 - cameraTargetY) * 0.025;
    camera.position.x += (cameraTargetX - camera.position.x) * 0.025;
    camera.position.y += (cameraTargetY - camera.position.y) * 0.025;
    camera.lookAt(0, 0, -25);

    renderer.render(scene, camera);
    frameId = window.requestAnimationFrame(renderFrame);
  };

  const stop = () => {
    if (frameId) window.cancelAnimationFrame(frameId);
    frameId = 0;
    lastFrameTime = 0;
  };
  const start = () => {
    if (!disposed && visible && !document.hidden && !frameId) {
      frameId = window.requestAnimationFrame(renderFrame);
    }
  };
  const visibilityObserver = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) start();
    else stop();
  });
  visibilityObserver.observe(container);

  const onVisibilityChange = () => {
    if (document.hidden) stop();
    else start();
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(container);
  resize();
  updateScroll();
  container.addEventListener("pointermove", onPointerMove, { passive: true });
  container.addEventListener("pointerleave", onPointerLeave);
  window.addEventListener("scroll", updateScroll, { passive: true });
  document.addEventListener("visibilitychange", onVisibilityChange);

  return () => {
    disposed = true;
    stop();
    visibilityObserver.disconnect();
    resizeObserver.disconnect();
    container.removeEventListener("pointermove", onPointerMove);
    container.removeEventListener("pointerleave", onPointerLeave);
    window.removeEventListener("scroll", updateScroll);
    document.removeEventListener("visibilitychange", onVisibilityChange);
    water.geometry.dispose();
    waterMaterial.dispose();
    sprayGeometry.dispose();
    sprayMaterial.dispose();
    sunMaterial?.map?.dispose();
    sunMaterial?.dispose();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
