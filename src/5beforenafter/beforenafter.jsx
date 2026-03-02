// BeforeNAfter.jsx
import React, { useMemo, useRef, useState, useEffect, useCallback } from "react";
import "./beforenafter.css";

import before1 from "./before1.jpg";
import after1 from "./after1.jpg";
import before2 from "./before2.jpg";
import after2 from "./after2.jpg";
// removed before3/after3
import before3 from "./before3.jpg";
import after3 from "./after3.jpg";

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n));
}

function BeforeAfterCard({ title = "Thumbnail", beforeSrc, afterSrc }) {
  const wrapRef = useRef(null);

  const [pos, setPos] = useState(50);

  // Keep drag state out of React state for smoothness on mobile
  const draggingRef = useRef(false);
  const pointerIdRef = useRef(null);

  // rAF batching to avoid janky updates on small devices
  const rafRef = useRef(0);
  const lastClientXRef = useRef(null);

  const ids = useMemo(() => {
    const base = Math.random().toString(36).slice(2);
    return { before: `before-${base}`, after: `after-${base}` };
  }, []);

  const setFromClientX = useCallback((clientX) => {
    const el = wrapRef.current;
    if (!el) return;

    const r = el.getBoundingClientRect();
    const x = clamp(clientX - r.left, 0, r.width);
    const p = (x / r.width) * 100;
    setPos(clamp(p, 0, 100));
  }, []);

  const scheduleFromClientX = useCallback(
    (clientX) => {
      lastClientXRef.current = clientX;
      if (rafRef.current) return;

      rafRef.current = window.requestAnimationFrame(() => {
        rafRef.current = 0;
        const x = lastClientXRef.current;
        if (x == null) return;
        setFromClientX(x);
      });
    },
    [setFromClientX]
  );

  const stopDragging = useCallback(() => {
    draggingRef.current = false;
    pointerIdRef.current = null;
  }, []);

  const onPointerDown = useCallback(
    (e) => {
      // Only react to primary pointer
      if (e.isPrimary === false) return;

      // Prevent page pan/zoom conflicts on mobile
      e.preventDefault();

      draggingRef.current = true;
      pointerIdRef.current = e.pointerId;

      const el = wrapRef.current;
      try {
        el?.setPointerCapture?.(e.pointerId);
      } catch {}

      scheduleFromClientX(e.clientX);
    },
    [scheduleFromClientX]
  );

  const onPointerMove = useCallback(
    (e) => {
      if (!draggingRef.current) return;
      if (pointerIdRef.current != null && e.pointerId !== pointerIdRef.current) return;

      e.preventDefault();
      scheduleFromClientX(e.clientX);
    },
    [scheduleFromClientX]
  );

  const onPointerUp = useCallback(
    (e) => {
      if (pointerIdRef.current != null && e.pointerId !== pointerIdRef.current) return;
      stopDragging();
    },
    [stopDragging]
  );

  const onPointerCancel = useCallback(
    (e) => {
      if (pointerIdRef.current != null && e.pointerId !== pointerIdRef.current) return;
      stopDragging();
    },
    [stopDragging]
  );

  // Global listeners (keeps drag smooth even if finger leaves the element)
  useEffect(() => {
    const handleMove = (e) => onPointerMove(e);
    const handleUp = (e) => onPointerUp(e);
    const handleCancel = (e) => onPointerCancel(e);

    window.addEventListener("pointermove", handleMove, { passive: false });
    window.addEventListener("pointerup", handleUp, { passive: true });
    window.addEventListener("pointercancel", handleCancel, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      window.removeEventListener("pointercancel", handleCancel);

      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [onPointerMove, onPointerUp, onPointerCancel]);

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

      <div ref={wrapRef} className="ba-compare" onPointerDown={onPointerDown}>
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
          onPointerDown={onPointerDown}
        >
          <div className="ba-handleLine" />
          <div className="ba-knob" aria-hidden="true">
            <span className="ba-arrow ba-arrow--l">◀</span>
            <span className="ba-arrow ba-arrow--r">▶</span>
          </div>
        </div>

        <span id={ids.before} className="ba-srOnly">
          before image
        </span>
        <span id={ids.after} className="ba-srOnly">
          after image
        </span>
      </div>
    </article>
  );
}

export default function BeforeNAfter() {
  // total 3 sections: 1, 2, and (old 4) becomes 3
  const items = [
    { title: "", beforeSrc: before1, afterSrc: after1 },
    { title: "", beforeSrc: before2, afterSrc: after2 },
    { title: "", beforeSrc: before3, afterSrc: after3 },
  ];

  return (
    <section className="ba-section">
      <h2 className="ba-heading">RECREATED THUMBNAILS</h2>

      <div className="ba-btnWrap ba-btnWrap--top">
        <a
          className="ba-btn"
          href="https://youtube.com/playlist?list=PLQzyLA-xxFQ0vfCxjtUxoOsu8eTv_E4ui&si=UTphRXx16l3c5JBI"
          target="_blank"
          rel="noopener noreferrer"
        >
          VIEW SOURCE
        </a>
      </div>

      <div className="ba-grid">
        {items.map((it, idx) => (
          <div key={idx} className="ba-cardWrap">
            <BeforeAfterCard title={it.title} beforeSrc={it.beforeSrc} afterSrc={it.afterSrc} />
          </div>
        ))}
      </div>
    </section>
  );
}