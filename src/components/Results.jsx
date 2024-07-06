import React from 'react';
import './Results.css'; 

const Results = ({ score, grade, studyNotes }) => {
  return (
    <div className="results-container">
      <div className="score-section">
        <h2>Score</h2>
        <div className="score">{score}/1</div>
      </div>
      <div className="grade-section">
        <h2>Your Grade</h2>
        <div className="grade">{grade}</div>
        <button className="add-grade-button">+ Add Grade</button>
      </div>
      <div className="study-notes-section">
        <h2>AI Study Notes</h2>
        <div className="study-notes">{studyNotes}</div>
      </div>
    </div>
  );
};

export default Results;
