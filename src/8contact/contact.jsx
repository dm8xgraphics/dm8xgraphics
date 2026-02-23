import "./contact.css";
import gmailLogo from "./gmail.png";
import whatsappLogo from "./whatsapp.png";

function Contact() {
  return (
    <section className="contact-section" id="contact">
      <div className="contact-container">
        <h2 className="contact-heading">CONTACT ME:</h2>

        <div className="contact-actions">
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=dm8xgraphics@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn contact-white"
          >
            <img src={gmailLogo} alt="gmail" className="contact-icon" />
            GMAIL
          </a>

          <a
            href="https://wa.me/9216150413"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-btn contact-white"
          >
            <img src={whatsappLogo} alt="whatsapp" className="contact-icon" />
            WHATSAPP
          </a>
        </div>
      </div>
    </section>
  );
}

export default Contact;