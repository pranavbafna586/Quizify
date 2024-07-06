import React from 'react';

const Header = () => {
  return (
    <header>
      <h1>Quizify</h1>
      <button className="menu-button" onClick={() => console.log('Menu clicked')}>☰</button>
    </header>
  );
};

export default Header;