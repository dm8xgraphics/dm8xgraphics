import "./hero.css";
import "./animations.css";
import profile from "./profile.jpg";
import { useEffect, useState, useMemo } from "react";

function Hero() {
  const titles = useMemo(
    () => [
      "Youtube Thumbnail Designer",
      "Graphic Designer",
      "Minecraft Thumbnail Specialist",
      "High-CTR Thumbnail Expert",
    ],
    []
  );

  const [loaded, setLoaded] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const current = titles[titleIndex];
    const typingSpeed = isDeleting ? 40 : 70;
    const holdTime = 1000;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        if (text.length < current.length) {
          setText(current.slice(0, text.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), holdTime);
        }
      } else {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
        } else {
          setIsDeleting(false);
          setTitleIndex((prev) => (prev + 1) % titles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [text, isDeleting, titleIndex, titles]);

  return (
    <section className={`hero reveal ${loaded ? "is-loaded" : ""}`}>
      <div className={`hero-left reveal-stagger ${loaded ? "is-loaded" : ""}`}>
        <h1 className="hero-name">DAKSH MALIK</h1>
        <h2 className="hero-label">
          {text}
          <span className="caret">|</span>
        </h2>
      </div>

      <div className={`hero-right reveal-stagger ${loaded ? "is-loaded" : ""}`}>
        <div className="hero-image-box">
          <img src={profile} alt="profile" className="hero-image" />
        </div>
      </div>
    </section>
  );
}

export default Hero;