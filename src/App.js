// App.jsx
import { useEffect } from "react";

import Navbar from "./1navbar/navbar";
import Hero from "./2hero/hero";
import Services from "./3services/services";
import Portfolio from "./4portfolio/portfolio";
import BeforeNAfter from "./5beforenafter/beforenafter";
import Pricing from "./6pricing/pricing";
import Flow from "./7flow/flow";
import Contact from "./8contact/contact";
import "./animations.css";

function App() {
  useEffect(() => {
    const root = document.documentElement;

    const move = (e) => {
      root.style.setProperty("--mx", e.clientX + "px");
      root.style.setProperty("--my", e.clientY + "px");
    };

    const down = () => root.classList.add("cursor-down");
    const up = () => root.classList.remove("cursor-down");

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mousedown", down, { passive: true });
    window.addEventListener("mouseup", up, { passive: true });

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousedown", down);
      window.removeEventListener("mouseup", up);
    };
  }, []);

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <BeforeNAfter />
      <Pricing />
      <Flow />
      <Contact />
    </>
  );
}

export default App;