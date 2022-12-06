import React from "react";
import "../props/styles/faq_props.scss";

const FaqProps = ({ faq, index, toggleFAQ }) => {
  return (
    <div
      className={"faq " + (faq.open ? "open" : "")}
      key={index}
      onClick={() => toggleFAQ(index)}
    >
      <div className="faq-question">
         
        <p className="global-yellow"> {faq.question}</p> 
      </div>
      <div className="faq-answer">
         
        <p className="global-white"> {faq.answer} </p> 
      </div>
    </div>
  );
};

export default FaqProps;
