import React from "react";
import "../styles/Home.css";

function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero-content">
          <h1>
            Introducing <span className="highlight">Smartify</span>
          </h1>
          <p className="quote">“I had no idea an App could do this.”</p>
          <p className="author">- Literally everyone</p>
          <p className="description">
            Create and deliver personalized lessons that fit every student's
            needs.
          </p>
          <div className="buttons">
            <a href="/signup" className="btn primary-btn">
              Get Started
            </a>
            <a href="/learn-more" className="btn secondary-btn">
              Learn More
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
