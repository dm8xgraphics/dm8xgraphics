import "./flow.css";

function Flow() {
  return (
    <section className="flow">
      <div className="flow-container">
        <h2 className="flow-heading">How We Collaborate</h2>

        <div className="flow-points">
          <div className="flow-item">
            <span className="flow-dot"></span>
            <p>
              Pick a plan and specify what you expect from the design.
            </p>
          </div>

          <div className="flow-item">
            <span className="flow-dot"></span>
            <p>
              I’ll forward the invoice, and you may complete the payment by card or direct deposit to my virtual bank account.
            </p>
          </div>

          <div className="flow-item">
            <span className="flow-dot"></span>
            <p>
              Share the payment details, and I will deliver the work within the timeline specified in the package.
            </p>
          </div>

          <div className="flow-item">
            <span className="flow-dot"></span>
            <p>
              To make this risk-free, I can offer the{" "}
              <span className="minecraft-green">
                1-video package complimentary
              </span>{" "}
              as a trial.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Flow;