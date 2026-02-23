import "./services.css";
import "./animations.css"; // if not importing globally
import logo from "./brand-logo.png";
import { useEffect, useState } from "react";

function Services() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 70);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={`services reveal ${loaded ? "is-loaded" : ""}`}>
      <div className={`services-container reveal-stagger ${loaded ? "is-loaded" : ""}`}>
        <h2 className="services-heading">About Me</h2>

        <p className="services-para">
          I design
          <img src={logo} alt="logo" className="inline-logo" />
          YouTube thumbnails as a graphic designer, focusing primarily on
          Minecraft-related content, and it is something I enjoy providing to my clients.
        </p>
      </div>
    </section>
  );
}

export default Services;