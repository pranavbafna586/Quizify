// components/GenerateQuizButton.jsx
import React, { useState } from 'react';
import './GenerateQuizButton.css';
const GenerateQuizButton = ({ onQuizGenerated }) => {
  const [showModal, setShowModal] = useState(false);
  const [topic, setTopic] = useState('');
  const [quizType, setQuizType] = useState('Scored Quiz / Trivia Quiz');

  const handleGenerateClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleBuildQuiz = async () => {
    if (!topic) {
      alert("Please enter a topic before building the quiz.");
      return;
    }

    // Mock API call to generate quiz
    try {
      const generatedQuiz = await mockGenerateQuiz(topic, quizType);
      onQuizGenerated(generatedQuiz);
      setShowModal(false);
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to generate quiz. Please try again.");
    }
  };

  // Mock function to simulate API call
  const mockGenerateQuiz = async (topic, type) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock quiz generation
    const questions = [
      {
        question: `What is the capital of ${topic}?`,
        options: ["City A", "City B", "City C", "City D"],
        correctAnswer: "City A"
      },
      {
        question: `Who is a famous person from ${topic}?`,
        options: ["Person A", "Person B", "Person C", "Person D"],
        correctAnswer: "Person B"
      },
      {
        question: `What is ${topic} known for?`,
        options: ["Thing A", "Thing B", "Thing C", "Thing D"],
        correctAnswer: "Thing C"
      }
    ];

    return {
      title: `Quiz about ${topic}`,
      type: type,
      questions: questions
    };
  };

  return (
    <>
      <button className="generate-button" onClick={handleGenerateClick}>
        Generate Quiz Automatically (AI)
      </button>
      
      {showModal && (
  <div className="modal">
    <div className="modal-content">
      <span className="close" onClick={handleCloseModal}>&times;</span>
      <textarea 
        placeholder="Enter your topic here and hit 'Build Quiz'"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
      ></textarea>
      <select 
        value={quizType}
        onChange={(e) => setQuizType(e.target.value)}
      >
        <option>Scored Quiz / Trivia Quiz</option>
        <option>Type Quiz / Personality Quiz</option>
        <option>Survey</option>
      </select>
      <button className="build-quiz-button" onClick={handleBuildQuiz}>Build Quiz</button>
    </div>
  </div>
)}
    </>
  );
};

export default GenerateQuizButton;