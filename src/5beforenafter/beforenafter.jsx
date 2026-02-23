// beforenafter.jsx
import React, { useMemo, useRef, useState } from "react";
import "./beforenafter.css";

import before1 from "./before1.jpg";
import after1 from "./after1.jpg";
import before2 from "./before2.jpg";
import after2 from "./after2.jpg";
import before3 from "./before3.jpg";
import after3 from "./after3.jpg";
import ytlogo from "./youtube-logo.png";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function BeforeAfterCard({ title = "Thumbnail", beforeSrc, afterSrc }) {
  const wrapRef = useRef(null);
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);

  const ids = useMemo(() => {
    const base = Math.random().toString(36).slice(2);
    return { before: `before-${base}`, after: `after-${base}` };
  }, []);

  const setFromClientX = (clientX) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = clientX - r.left;
    const p = (x / r.width) * 100;
    setPos(clamp(p, 0, 100));
  };

  const onPointerDown = (e) => {
    e.preventDefault();
    setDragging(true);
    try {
      wrapRef.current?.setPointerCapture?.(e.pointerId);
    } catch {}
    setFromClientX(e.clientX);
  };

  const onPointerMove = (e) => {
    if (!dragging) return;
    setFromClientX(e.clientX);
  };

  const stopDragging = () => setDragging(false);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") setPos((p) => clamp(p - 2, 0, 100));
    if (e.key === "ArrowRight") setPos((p) => clamp(p + 2, 0, 100));
    if (e.key === "Home") setPos(0);
    if (e.key === "End") setPos(100);
  };

  return (
    <article className="ba-card">
      <div className="ba-cardTop">
        <div className="ba-title">{title}</div>
        <div className="ba-hint"></div>
      </div>

      <div
        ref={wrapRef}
        className={`ba-compare ${dragging ? "is-dragging" : ""}`}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDragging}
        onPointerCancel={stopDragging}
        onPointerLeave={stopDragging}
      >
        <img className="ba-img ba-img--base" src={afterSrc} alt={`${title} after`} />
        <div className="ba-beforeLayer" style={{ width: `${pos}%` }}>
          <img className="ba-img ba-img--before" src={beforeSrc} alt={`${title} before`} />
        </div>

        <div className="ba-label ba-label--left">BEFORE</div>
        <div className="ba-label ba-label--right">AFTER</div>

        <div
          className="ba-handle"
          style={{ left: `${pos}%` }}
          role="slider"
          tabIndex={0}
          aria-label={`${title} comparison slider`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-controls={`${ids.before} ${ids.after}`}
          onKeyDown={onKeyDown}
        >
          <div className="ba-handleLine" />
          <div className="ba-knob" aria-hidden="true">
            <span className="ba-arrow ba-arrow--l">◀</span>
            <span className="ba-arrow ba-arrow--r">▶</span>
          </div>
        </div>

        <span id={ids.before} className="ba-srOnly">before image</span>
        <span id={ids.after} className="ba-srOnly">after image</span>
      </div>
    </article>
  );
}

export default function BeforeNAfter() {
  const items = [
    { title: "", beforeSrc: before1, afterSrc: after1 },
    { title: "", beforeSrc: before2, afterSrc: after2 },
    { title: "", beforeSrc: before3, afterSrc: after3 },
  ];

  return (
    <section className="ba-section">
      <h2 className="ba-heading">RECREATED THUMBNAILS</h2>

      {/* VIEW SOURCE BUTTON (moved ABOVE thumbnails) */}
      <div className="ba-btnWrap ba-btnWrap--top">
        <a
          className="ba-btn"
          href="https://youtube.com/playlist?list=PLQzyLA-xxFQ0vfCxjtUxoOsu8eTv_E4ui&si=UTphRXx16l3c5JBI"
          target="_blank"
          rel="noopener noreferrer"
        >
          VIEW SOURCE
          {/* <img src={ytlogo} alt="YouTube" className="ba-btnLogo" /> */}
        </a>
      </div>

      <div className="ba-grid">
        {items.map((it, idx) => (
          <BeforeAfterCard
            key={idx}
            title={it.title}
            beforeSrc={it.beforeSrc}
            afterSrc={it.afterSrc}
          />
        ))}
      </div>
    </section>
  );
}