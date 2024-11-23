import React from "react";

const HeroSection = ({ scrollToServices }) => {
  return (
    <section id="home" className="pt-24 gradient-bg">
      <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 text-white" data-aos="fade-right">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Advanced Prostate Cancer Detection
          </h1>
          <p className="text-lg mb-8">
            Using cutting-edge AI technology for early detection and accurate
            diagnosis.
          </p>
          {/* Get Started Button */}
          <button
            onClick={scrollToServices} // Use scroll function
            className="bg-white text-green-600 px-8 py-3 rounded-full hover:bg-gray-100 transition"
          >
            Get Started
          </button>
        </div>
        <div className="md:w-1/2 mt-8 md:mt-0" data-aos="fade-left">
          <img
            src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=800"
            alt="Medical Technology"
            className="rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
