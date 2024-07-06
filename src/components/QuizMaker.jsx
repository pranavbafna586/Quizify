import React from 'react';
import Header from './Header';
import GenerateQuizButton from './GenerateQuizButton';
import QuizEditor from './QuizEditor';

const QuizMaker = () => {
  return (
    <div className="quiz-maker">
      <Header />
      <main>
        <h2>Create an awesome quiz in minutes</h2>
        <p>Quizify is the easiest way to make quizzes FREE</p>
        <GenerateQuizButton />
        <QuizEditor />
      </main>
    </div>
  );
};

export default QuizMaker;