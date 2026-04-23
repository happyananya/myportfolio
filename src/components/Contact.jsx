import React from "react";

function Contact() {
  return (
    <section id="contact">
      <p className="section__text__p1">Get in Touch</p>
      <h1 className="title">Contact Me</h1>
      <div className="contact-info-upper-container">
        <div className="contact-info-container">
          <img src={import.meta.env.BASE_URL + "assets/email.png"} alt="Email icon" className="icon contact-icon email-icon" />
          <p>
            <a href="mailto:aa13549@nyu.edu">aa13549@nyu.edu</a>
          </p>
        </div>
        <div className="contact-info-container">
          <img src={import.meta.env.BASE_URL + "assets/linkedin.png"} alt="LinkedIn icon" className="icon contact-icon" />
          <p>
            <a href="https://www.linkedin.com/in/ananya-agarwal03/">LinkedIn</a>
          </p>
        </div>
        <div className="contact-info-container">
          <img src={import.meta.env.BASE_URL + "assets/github.png"} alt="GitHub icon" className="icon contact-icon" />
          <p>
            <a href="https://github.com/happyananya">GitHub</a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Contact;
