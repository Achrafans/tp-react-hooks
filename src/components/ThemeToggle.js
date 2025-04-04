import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import useLocalStorage from '../hooks/useLocalStorage';

const ThemeToggle = () => {
  const { isDarkTheme, setIsDarkTheme } = useContext(ThemeContext);
  const [storedTheme, setStoredTheme] = useLocalStorage('theme', isDarkTheme);


  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    setStoredTheme(!isDarkTheme);
  }

  
  return (
    <button
      onClick={toggleTheme}
      className={`px-5 py-2 rounded ${
        isDarkTheme 
          ? 'bg-dark text-light border border-light' 
          : 'bg-light text-dark border border-dark'
      }`}
    >
      {isDarkTheme ? 'Mode Clair' : 'Mode Sombre'}
    </button>
  );
};

export default ThemeToggle;