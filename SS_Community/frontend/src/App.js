import React, { useState, useRef } from "react";
import { HashRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./App.css"; // Import the external CSS file

const Navbar = () => (
  <div className="navbar">
    <h1 className="title">Safety Awareness Game</h1>
  </div>
);

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container">
      <Navbar />
      <h2 className="heading">Empowering Safety & Legal Awareness</h2>
      <p className="description">
        SafeSphere is revolutionizing safety and legal awareness through its interactive Safety Game, an engaging simulation-based learning platform. By immersing users in real-life scenarios, the game equips them with the knowledge and confidence to respond effectively to uncomfortable and dangerous situations. Each scenario is backed by legal references, ensuring that users not only learn how to act but also understand their rights and protections under the law. With features like video-driven learning, instant feedback, and legal explanations, SafeSphere empowers individuals—especially women and children—to recognize, report, and react to threats, fostering a safer and more informed society.</p>
      <h2 className="text-2xl font-bold text-center text-blue-600 mt-6 animate-pulse">
  Step into real-life situations and test your instincts—what will you do next?
</h2>
      <button onClick={() => navigate('/safety-game')} className="start-button">Start Simulation</button>
    </div>
  );
};

const SafetyGame = () => {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showQuestion, setShowQuestion] = useState(false);
  const videoRef = useRef(null);

  const scenarios = [
    {
      video: "https://res.cloudinary.com/dkdbsa1ju/video/upload/v1741270772/bus-harass_dk7htv.mp4",
      question: "What will you do if someone touches you inappropriately on a bus?",
      options: [
        { text: "Stay Silent and Ignore it", correct: false, explanation: "Ignoring harassment allows it to continue.\nThe Sexual Harassment of Women at Workplace Act, 2013,\nalso applies to public transport under workplace extension." },
        { text: "Seek help from fellow passengers or the bus conductor.", correct: true, explanation: "Reporting the incident increases safety.\nUnder CrPC Section 166A, failure by public officials\n(including conductors or police) to take action is punishable." },
        { text: "Move away without saying anything.", correct: false, explanation: "Ignoring harassment allows it to continue.\nThe Sexual Harassment of Women at Workplace Act, 2013,\nalso applies to public transport under workplace extension." },
        { text: "Call Out the Person Loudly", correct: true, explanation: "Reporting the incident increases safety.\nUnder CrPC Section 166A, failure by public officials\n(including conductors or police) to take action is punishable." }
      ]
    },
    {
      video: "https://res.cloudinary.com/dkdbsa1ju/video/upload/v1741270883/street-_stalk_f4ergl.mp4",
      question: "What should you do if you are being followed on the street?",
      options: [
        { text: "Go to a crowded place and call for help", correct: true, explanation: "Informing someone ensures you have backup support,\nand authorities can intervene if necessary.\nDial 100 (Police) or 1091 (Women’s Helpline) for assistance." },
        { text: "Call a friend or the police while staying aware of your surroundings", correct: true, explanation: "Informing someone ensures you have backup support,\nand authorities can intervene if necessary.\nDial 100 (Police) or 1091 (Women’s Helpline) for assistance." },
        { text: "Walk faster and try to lose them in an isolated area", correct: false, explanation: "Moving into a secluded area makes you vulnerable.\nIt’s safer to stay in well-lit, public places.\nIPC Section 503 applies if someone follows you threateningly." },
        { text: "Confront the person directly", correct: false, explanation: "Moving into a secluded area makes you vulnerable.\nIt’s safer to stay in well-lit, public places.\nIPC Section 503 applies if someone follows you threateningly." }
      ]
    },
    {
      video: "https://res.cloudinary.com/dkdbsa1ju/video/upload/v1741270924/online_-_harrass_thhpco.mp4",
      question: "How should you respond if someone is harassing you online?",
      options: [
        { text: "Ignore it and hope it stops", correct: false, explanation: "Ignoring harassment may allow it to escalate.\nCyberbullying and online threats can have serious consequences.\nIPC Section 503 applies if threats are exchanged." },
        { text: "Report the user and block them", correct: true, explanation: "Documenting harassment ensures you have evidence\nif legal action is needed. Cyber Crime Cells and Women’s Helpline (1091)\nassist with cases under the IT Act and IPC." },
        { text: "Engage with the harasser and argue back", correct: false, explanation: "Responding aggressively can escalate the situation\nand may lead to legal complications.\nIPC Section 503 applies if threats are exchanged." },
        { text: "Take screenshots and report to authorities", correct: true, explanation: "Documenting harassment ensures you have evidence\nif legal action is needed. Cyber Crime Cells and Women’s Helpline (1091)\nassist with cases under the IT Act and IPC." }
      ]
    },
    {
      video: "https://res.cloudinary.com/dkdbsa1ju/video/upload/v1741271010/drink_-_spike_mk04n1.mp4",
      question: "What should you do if someone tries to spike your drink at a party?",
      options: [
        { text: "Drink it anyway", correct: false, explanation: "Consuming a spiked drink can lead to unconsciousness,\nmemory loss, or worse. IPC Section 328 punishes\ntampering with someone's drink." },
        { text: "Alert security or a trusted friend", correct: true, explanation: "Reporting ensures immediate action, protecting you and others.\nThe NDPS Act, 1985, criminalizes drugging someone without consent." },
        { text: "Throw the drink away and ignore it", correct: false, explanation: "Ignoring the situation allows the perpetrator to target others.\nTimely reporting prevents further incidents under IPC Section 354." },
        { text: "Call the police and report the incident", correct: true, explanation: "Law enforcement can investigate and take action.\nIPC Section 328 provides strict punishment for attempts to drug others." }
      ]
    },
    {
      video: "https://res.cloudinary.com/dkdbsa1ju/video/upload/v1741271073/personal_details_auqnaf.mp4",
      question: "What is the best action to take if a stranger asks for your personal details online?",
      options: [
        { text: "Ask why they need the information before sharing", correct: false, explanation: "Scammers use social engineering to extract data.\nEven minimal details can be risky. Protect your information." },
        { text: "Share only your name and social media account", correct: false, explanation: "Even sharing minimal details is risky.\nData can be used for phishing or fraud.\nIT Act, 2000 (Section 72) protects against data misuse." },
        { text: "Block the person and avoid further interaction", correct: true, explanation: "Prevents cyberstalking and threats.\nIPC Section 354D criminalizes online stalking." },
        { text: "Do not share personal details and report suspicious activity", correct: true, explanation: "Avoid sharing any details and report suspicious requests.\nIT Act, 2000 (Section 66C) penalizes identity fraud." }
      ]
    }
  ];
  

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    setQuestionIndex((prev) => (prev + 1) % scenarios.length);
    setSelectedOption(null);
    setShowQuestion(false);
  };
  

  return (
    <div className="container">
      <h1 className="title">Simulating Safety & Spreading Awareness</h1>
      <video 
  ref={videoRef} 
  src={scenarios[questionIndex].video}
  autoPlay 
  muted 
  controls 
  className="w-full mb-4"
  onEnded={() => setShowQuestion(true)}
  onLoadedData={() => videoRef.current?.play()}  // Ensures the video plays only after it loads
/>

      
      {showQuestion && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }}
          className="question-overlay"
        >
          <h2 className="question">{scenarios[questionIndex].question}</h2>
          <div className="options-container">
            {scenarios[questionIndex].options.map((option, index) => (
              <button 
                key={index} 
                onClick={() => handleOptionSelect(option)}
                className={`option-button ${selectedOption ? (option.correct ? 'correct' : 'incorrect') : ''}`}
              >
                {option.text}
              </button>
            ))}
          </div>
          {selectedOption && <p className="explanation">{selectedOption.explanation}</p>}
          {selectedOption && <button onClick={handleNext} className="next-button">Next</button>}
        </motion.div>
      )}
    </div>
  );
};

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/safety-game" element={<SafetyGame />} />
    </Routes>
  </Router>
);

export default App;