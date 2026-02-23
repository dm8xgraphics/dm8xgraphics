import React from "react";
import "./pricing.css";

const plans = [
  {
    name: "Per Video",
    price: 19,
    features: [
      "2 YouTube-Optimized Thumbnails",
      "Delivered in 24 Hours",
      "Up to 3 Revisions",
    ],
  },
  {
    name: "3 Videos Bundle",
    price: 49,
    features: [
      "6 YouTube-Optimized Thumbnails (2 for each)",
      "Delivered in 8 Hours",
      "Unlimited Revisions",
    ],
  },
];

export default function Pricing() {
  return (
    <section className="pricing-section" id="pricing">
      
      <h2 className="pricing-heading">PRICING</h2>

      <div className="pricing-wrap">
        {plans.map((p) => (
          <article key={p.name} className="price-card">
            <div className="price-card-top">
              <h3 className="plan-title">{p.name}</h3>
            </div>

            <div className="plan-price">
              <span className="price-currency">$</span>
              <span className="price-value">{p.price}</span>
            </div>

            <div className="plan-divider" />

            <ul className="plan-features">
              {p.features.map((f) => (
                <li key={f} className="feature-item">
                  <span className="check" />
                  <span className="feature-text">{f}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}