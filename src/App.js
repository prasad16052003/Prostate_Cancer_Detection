import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Replace Switch with Routes
import AOS from "aos";
import "aos/dist/aos.css";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import Features from "./components/Features";
import Services from "./components/Services";
import Doctors from "./components/Doctors";
import About from "./components/About";
import Footer from "./components/Footer";
import LoginModal from "./components/LoginModal";
import ResultsModal from "./components/ResultsModal";
import SignUp from "./components/SignUp"; // Import SignUp component

const App = () => {
  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  // Create refs for scrolling
  const servicesRef = useRef(null);

  // State for managing modals
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);

  // Function to scroll to the Services section
  const scrollToServices = () => {
    if (servicesRef.current) {
      servicesRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <Router>
      {/* Replace Switch with Routes */}
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <>
              <Navbar onLoginClick={() => setShowLoginModal(true)} />
              <HeroSection scrollToServices={scrollToServices} />
              <Features />
              <Services ref={servicesRef} />
              <Doctors />
              <About />
              <Footer />
              <LoginModal show={showLoginModal} onClose={() => setShowLoginModal(false)} />
              <ResultsModal show={showResultsModal} onClose={() => setShowResultsModal(false)} />
            </>
          }
        />
        
        {/* Sign-Up Route */}
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
