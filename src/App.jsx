import './App.css';
import React, { useState } from 'react';
import './components/QuizMaker.css';
import ThemesSection from './components/ThemesSection/ThemesSection';
import GenerateQuizButton from './components/GenerateQuizButton/GenerateQuizButton';

const QuizMaker = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [activeSection, setActiveSection] = useState('Quiz');

  return (
    <div className="quiz-maker">
      <header>
        <h1>Quizify</h1>
        <button className="menu-button">☰</button>
      </header>
      
      <main>
        <h2>Create an awesome quiz in minutes</h2>
        <p>Quizify is the easiest way to make quizzes FREE</p>
      
        <GenerateQuizButton />
        <div className="quiz-editor">
          <nav className="quizbutton">
            <button onClick={() => setActiveSection('Quiz')}>Quiz</button>
            <button onClick={() => setActiveSection('Themes')}>Themes</button>
            <button onClick={() => setActiveSection('Results')}>Results</button>
            <button onClick={() => setActiveSection('Leads')}>Leads</button>
            <button onClick={() => setActiveSection('Share')}>Share</button>
          </nav>
          
          {activeSection === 'Quiz' && (
            <>
              <input 
                type="text"
                placeholder="Type your Quiz Title"
                value={quizTitle}
                onChange={(e) => setQuizTitle(e.target.value)}
              />
              
              <div className="score-section">
                <select defaultValue="Show a Score & Grade">
                  <option>Show a Score</option>
                  <option>Show a Score & Grade</option>
                  <option>Show only a Grade</option>
                  <option>Recommend a Product/Service</option>
                  <option>Poll / Vote</option>
                  <option>Assign a Type / Personality</option>
                  <option>Assign multiple Types</option>
                  <option>Survey / Other</option>
                  <option>Copy a Template...</option>
                </select>
                <button className='AddGrades'>Set Scores</button>
              </div>
              
              <button className="add-question">+ ADD QUESTION</button>
            </>
          )}

          {activeSection === 'Themes' && <ThemesSection />}
          
          <div className="quiz-actions">
            <button>New Quiz</button>
            <button className='Preview'>Preview</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default QuizMaker;
