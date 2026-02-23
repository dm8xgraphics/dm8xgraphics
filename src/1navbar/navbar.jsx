import "./navbar.css";
import "./animations.css"; // if not importing globally
import brandLogo from "./brand-logo.png";
import mcLogo from "./minecraft-logo.png";
import { useEffect, useState } from "react";

function Navbar() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 30);
    return () => clearTimeout(t);
  }, []);

  const scrollToContact = () => {
    const section = document.getElementById("contact");
    if (section) section.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className={`navbar reveal-stagger ${loaded ? "is-loaded" : ""}`}>
      <div className="nav-left">
        <img src={brandLogo} alt="Brand Logo" className="brand-logo" />
        <span className="collab-x">×</span>
        <img src={mcLogo} alt="Minecraft Logo" className="mc-logo" />
      </div>

      <button className="contact-btn" onClick={scrollToContact}>
        CONTACT
      </button>
    </nav>
  );
}

export default Navbar;