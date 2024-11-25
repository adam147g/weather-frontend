import React, { useState } from 'react';
import './themeToggle.css'; // Styl przełącznika w oddzielnym pliku

const ThemeToggle = ({ onToggle }) => {
  const [isLightMode, setIsLightMode] = useState(true);

  const handleToggle = () => {
    const newMode = !isLightMode;
    setIsLightMode(newMode);
    onToggle(newMode); // Informujemy nadrzędny komponent o zmianie trybu
  };

  return (
    <div className={`tdnn ${isLightMode ? 'day' : ''}`} onClick={handleToggle}>
      <div className={`moon ${isLightMode ? 'sun' : ''}`}></div>
    </div>
  );
};

export default ThemeToggle;
