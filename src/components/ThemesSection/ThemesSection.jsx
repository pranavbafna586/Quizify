import React, { useState, useEffect } from 'react';
import './ThemesSection.css';

const ThemesSection = () => {
  const [activeThemeTab, setActiveThemeTab] = useState('Default Themes');
  const [themes, setThemes] = useState([]);

  useEffect(() => {
    fetchThemes();
  }, []);

  const fetchThemes = async () => {
    const themeNames = ['Serendipity', 'Time', 'Fresh', 'Gentle', 'Nature', 'Urban'];
    const fetchedThemes = await Promise.all(
      themeNames.map(async (name) => {
        const response = await fetch(
          `https://api.unsplash.com/photos/random?query=${name}&client_id=${process.env.REACT_APP_UNSPLASH_ACCESS_KEY}`
        );
        const data = await response.json();
        return { name, image: data.urls.small };
      })
    );
    setThemes(fetchedThemes);
  };

  return (
    <div className="themes-section">
      <div className="theme-tabs">
        <button 
          className={activeThemeTab === 'Default Themes' ? 'active' : ''}
          onClick={() => setActiveThemeTab('Default Themes')}
        >
          Default Themes
        </button>
        <button 
          className={activeThemeTab === 'Customize' ? 'active' : ''}
          onClick={() => setActiveThemeTab('Customize')}
        >
          Customize
        </button>
        <button 
          className={activeThemeTab === 'Your Themes' ? 'active' : ''}
          onClick={() => setActiveThemeTab('Your Themes')}
        >
          Your Themes
        </button>
      </div>

      {activeThemeTab === 'Default Themes' && (
        <div className="theme-grid">
          {themes.map((theme, index) => (
            <div key={index} className="theme-item">
              <img src={theme.image} alt={theme.name} />
              <div className="theme-info">
                <span>{theme.name}</span>
                <button className="edit-button">Edit</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeThemeTab === 'Customize' && (
        <div>Customization options will go here</div>
      )}

      {activeThemeTab === 'Your Themes' && (
        <div>Your personal themes will be displayed here</div>
      )}
    </div>
  );
};

export default ThemesSection;