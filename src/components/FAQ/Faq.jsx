import React, { useState } from "react";
import Lottie from "lottie-react";
import FaqAnimation from "../../../public/FaqAnimation.json"

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "What is the start time for the MilesAhead Marathon?",
      answer:
        "The marathon starts at 6:00 AM sharp. We recommend arriving at least 30 minutes early for check-in.",
    },
    {
      question: "Where is the starting location?",
      answer:
        "The starting point is depends on which marathon you want to participate. Detailed directions will be provided via email.",
    },
    {
      question: "Will water stations be available along the route?",
      answer:
        "Yes, water stations will be available at every 3-kilometer mark to keep participants hydrated.",
    },
    {
      question: "Is there a time limit to complete the marathon?",
      answer:
        "Participants must complete the marathon within 6 hours for official timing and ranking.",
    },
    {
      question: "Can I bring my family to the event?",
      answer:
        "Absolutely! The event includes a family zone with fun activities, so everyone can join in the excitement.",
    },
  ];

  return (
    <section className="my-6 p-4 flex flex-col md:flex-row gap-5 items-center">
        {/* Faq -container */}
      <div className="w-full md:w-1/2 p-4">
        <h2 className="text-4xl font-bold mb-8 text-highlight">
          Feel Free To Do Queries
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`collapse collapse-arrow border border-base-300 bg-base-200 rounded-box ${
                activeIndex === index ? "collapse-open" : ""
              }`}
            >
              <input
                type="checkbox"
                className="peer"
                onChange={() => toggleFAQ(index)}
                checked={activeIndex === index}
                readOnly
              />
              <div className="collapse-title text-lg font-medium">
                {faq.question}
              </div>
              <div className="collapse-content">
                <p className="text-base text-gray-700">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Lottie animation container */}
      <div className="w-full md:w-1/2 p-4">
      <Lottie
          className="h-[500px]"
          animationData={FaqAnimation}
          loop={true}
        />
      </div>
    </section>
  );
};

export default Faq;