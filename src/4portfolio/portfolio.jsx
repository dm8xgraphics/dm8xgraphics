import "./portfolio.css";
import { useEffect, useState, useCallback } from "react";

import t1 from "./t1.png";
import t2 from "./t2.png";
import t3 from "./t3.png";
import t4 from "./t4.png";
import t5 from "./t5.png";
import t6 from "./t6.png";

function Portfolio() {
  const items = [
    { img: t1, title: "From NOOB to KING in 100 Days!",    },
    { img: t2, title: "The Calm Before I Destroy Everything",    },
    { img: t3, title: "3 Pro Speedrunners vs 1 Secret Cheater",    },
    { img: t4, title: "Minecraft Skeletons If They Had Jobs",    },
    { img: t5, title: "Surviving a Minecraft Tsunami…",    },
    { img: t6, title: "100 Tanks vs Ender Monster… Who Wins?",    },
  ];

  const [index, setIndex] = useState(0);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + items.length) % items.length);
  }, [items.length]);

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % items.length);
  }, [items.length]);

  // Auto slide every 2s
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [items.length]);

  const getPosClass = (i) => {
    const prevIndex = (index - 1 + items.length) % items.length;
    const nextIndex = (index + 1) % items.length;

    if (i === index) return "active";
    if (i === prevIndex) return "prev";
    if (i === nextIndex) return "next";
    return "hidden";
  };

  return (
    <section className="portfolio">
      <div className="portfolio-left">
        <h2 className="portfolio-heading">Portfolio</h2>
      </div>

      <div className="portfolio-right">
        <div className="portfolio-view">
          <button className="p-arrow left" onClick={prev} aria-label="Previous">
            ‹
          </button>

          <div className="coverflow">
            {items.map((item, i) => (
              <div key={i} className={`cover-card ${getPosClass(i)}`}>
                <img src={item.img} alt={item.title} />
              </div>
            ))}
          </div>

          <button className="p-arrow right" onClick={next} aria-label="Next">
            ›
          </button>

          <div className="p-dots">
            {items.map((_, i) => (
              <span
                key={i}
                className={`p-dot ${i === index ? "active" : ""}`}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        </div>

        <div className="portfolio-meta">
          <h3 className="portfolio-title">{items[index].title}</h3>
          <p className="portfolio-summary">{items[index].summary}</p>
        </div>
      </div>
    </section>
  );
}

export default Portfolio;