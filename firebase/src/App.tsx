import "./App.css";
import { checkKaribuStatus } from "./api";
import { Navbar } from "./components/navbar";
import { About } from "./views/landing/components/about";
import { Hero } from "./views/landing/components/hero";

function App() {
  // Call the checkKaribuStatus function...
  checkKaribuStatus();
  return (
    <>
      <Navbar />
      <Hero />
      <About />
    </>
  );
}

export default App;
