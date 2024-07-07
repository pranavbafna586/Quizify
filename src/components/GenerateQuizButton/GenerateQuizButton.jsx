import React, { useState } from 'react';
import './GenerateQuizButton.css';

const GenerateQuizButton = ({ onQuizGenerated }) => {
  const [showModal, setShowModal] = useState(false);
  const [topic, setTopic] = useState('');
  const [quizType, setQuizType] = useState('Scored Quiz / Trivia Quiz');
  const [loading, setLoading] = useState(false);
  const [quiz, setQuiz] = useState(null);

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

    setLoading(true);

    const API_URL = `https://api.openai.com/v1/engines/davinci-codex/completions`;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer sk-proj-GTYp74EMEqPXYN2uVvaaT3BlbkFJcREddyltrdy4dhwLNjf9`
        },
        body: JSON.stringify({
          prompt: `Generate 5 quiz questions on the topic "${topic}":`,
          max_tokens: 150
        })
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch quiz questions.");
      }
      
      const data = await response.json();
      const questionsText = data.choices[0].text.trim().split('\n').filter(Boolean);
      
      const questions = questionsText.map((questionText, index) => ({
        question: questionText,
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],  // Placeholder options
        correctAnswer: "Option 1"  // Placeholder correct answer
      }));

      const generatedQuiz = {
        title: `Quiz about ${topic}`,
        type: quizType,
        questions: questions
      };

      setQuiz(generatedQuiz);
      onQuizGenerated(generatedQuiz);
      setShowModal(false);
    } catch (error) {
      console.error("Error generating quiz:", error);
      alert("Failed to generate quiz. Please try again.");
    } finally {
      setLoading(false);
    }
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
            <button 
              className={`build-quiz-button ${loading ? 'loading' : ''}`} 
              onClick={handleBuildQuiz} 
              disabled={loading}
            >
              {loading ? 'Building Quiz...' : 'Build Quiz'}
            </button>
          </div>
        </div>
      )}

      {quiz && (
        <div className="quiz-container">
          <h2>{quiz.title}</h2>
          {quiz.questions.map((question, index) => (
            <div key={index}>
              <div className="quiz-question">{question.question}</div>
              <ul className="quiz-options">
                {question.options.map((option, idx) => (
                  <li key={idx} className="quiz-option">
                    <input type="radio" id={`q${index}o${idx}`} name={`question${index}`} />
                    <label htmlFor={`q${index}o${idx}`}>{option}</label>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default GenerateQuizButton;
