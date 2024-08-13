import React from "react";
import { useState } from "react";
import Round from "../../../assets/round.png";
import "../styles/Faq.scss";

const Faq = () => {
  const [openFaq, setOpenFaq] = useState(false)
  const [faqs, setFaqs] = useState([
    {
      question: "WHAT IS AFRIPLAY?",
      answer:
        "Afriplay is a video streaming entertainment service offering unlimited access to TV shows, movies, live TV channels, and more. Stream and watch on a wide range of devices, just the way you would like to.No commitments, no hassles, and an all- pass to enjoyable satisfying content. Enjoy unlimited access using any of the six(6) available plans: Afriplay Daily Live, Daily Cinema, Daily Max, 3-day Binge, Weekly Wonder, Monthly Magic.",
      open: true
    },
    {
      question: "WHERE CAN I WATCH?",
      answer: "To start watching, visit www.afriplay.com or go to the app store on your device, search ‘Afriplay’, select and download. Whichever plan you choose, you get to the option to choose which device you’d best enjoy your streaming on.Of course, you can choose to modify your plan at any time.The choice is completely yours.You can watch it on several devices, including smartphones, tablets, computers, smart TVs, and media boxes. It’s really your call.We aim to provide a great experience – whichever devices you choose.",
      open: false
    },
    {
      question: "WHAT CAN I WATCH?",
      answer: "Movies, Series, TV Shows, Live TV Channels, Live Concerts. To start watching, sign up at www.afriplay.com and follow the easy steps. Once you’re signed in, select one from the available plans.Once you’re a subscriber, you can watch from the available content under the plan you’re subscribed to.",
      open: false
    },
    {
      question: "CAN I WATCH WITHOUT DATA OR WIFI?",
      answer: "You will need reliable internet connectivity to enjoy AFRIPlay. You may use Wi-Fi and/or data. You can also manage how much data consumption you would like to have as you watch. Simply go to Settings -> Video Quality -> choose from any of the options outlined.",
      open: false
    },
    {
      question: "CAN I CATCH UP OR RECORD TV PROGRAMS?",
      answer: "Yes. For Catch up, simply click on the channel of choice -> scroll upwards to choose a previously ran program on the Electronic Programming Guide (EPG) -> click on the program of choice -> Click Yes button to the pop-up prompt -> Enjoy your program Catch Up. To Record, simply click on the channel of choice -> scroll downwards to choose a yet to run program on the Electronic Programming Guide (EPG) -> click on the program of choice -> Click Yes button to the pop-up prompt -> When the program is running, the recording will begin.",
      open: false
    },
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
            ))}

            <div
              className={openFaq ? "faq open" : "faq"}
              onClick={() => {
                setOpenFaq(!openFaq)
              }}
            >
              <div className="faq-question">
                <p className="global-yellow"> HOW MUCH DOES IT COST?</p>
              </div>
              <div className="faq-answer">
                <div>
                  <b>Daily Live</b>
                  <p>One-day access to enjoy selected live Channels</p>
                </div>
                <br />

                <div>
                  <b>Daily Cinema</b>
                  <p>One-day access to enjoy selected movies, TV shows and live Channels</p>
                </div>
                <br />

                <div>
                  <b>Daily Max</b>
                  <p>One (1)-day access to enjoy selected movies, TV shows and premium live Channels</p>
                </div>
                <br />

                <div>
                  <b>3-day Binge</b>
                  <p>Three (3)-day access to enjoy premium movies, TV shows and live Channels</p>
                </div>
                <br />

                <div>
                  <b>Weekly Wonder</b>
                  <p>Seven (7)-day access to enjoy premium movies, TV shows and live Channels</p>
                </div>
                <br />

                <div>
                  <b>Monthly Magic</b>
                  <p>Thirty (30)-day access to enjoy premium movies, TV shows and live Channels</p>
                </div>
                <br />

                <p>You will be presented with all the options upon successful sign-up.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
