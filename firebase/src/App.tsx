import "./App.css";
import { Navbar } from "./components/navbar";
import { About } from "./views/landing/components/about";
import { Hero } from "./views/landing/components/hero";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
    </>
  );
}

export default App;
