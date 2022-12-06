import React from "react";
import { useState } from "react";

// ASSETS
import Round from "../../../assets/round.png";

// STYLES
import "../styles/Faq.scss";

// props
import FAQ from "../../props/FaqProps";

const Faq = () => {
  const [faqs, setFaqs] = useState([
    {
      question: "What is Afriplay ?",
      answer:
        "Afriplay is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices..",
      open: true
    },
    {
      question: "Where can I watch?",
      answer: "You! The viewer!",
      open: false
    },
    {
      question: "What can I watch on Afriplay?",
      answer: "This many!",
      open: false
    },
    {
      question: "Is Afriplay good for kids??",
      answer: "This many!",
      open: false
    }
  ]);

  const toggleFAQ = index => {
    setFaqs(
      faqs.map((faq, i) => {
        if (i === index) {
          faq.open = !faq.open;
        } else {
          faq.open = false;
        }

        return faq;
      })
    );
  };

  return (
    <div className="faq" id="faq">
      <div className="container">
        <div className="inside-faq">
          <h1>

            <img src={Round} alt="circle" /> Frequently asked questions
          </h1>
          <div className="faqs">
            {faqs.map((faq, index) => (
              <FAQ faq={faq} index={index} key={index} toggleFAQ={toggleFAQ} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
