import Nav from "./components/Nav";
import ShatterPortrait from "./components/ShatterPortrait";
import About from "./components/About";
import ProjectsOrbit from "./components/ProjectsOrbit";
// import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="relative">
      <Nav />
      <main>
        <ShatterPortrait />
        <About />
        <ProjectsOrbit />
        {/* <Experience /> */}
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
