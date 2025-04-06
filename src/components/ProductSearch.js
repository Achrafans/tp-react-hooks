import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../App';
import useDebounce from '../hooks/useDebounce';
import { useLanguage } from '../hooks/useLanguage';

const ProductSearch = ({searchTerm, onSearch}) => {
  const { isDarkTheme } = useContext(ThemeContext);
  const { language, translations } = useLanguage();

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm, onSearch]);


  
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        placeholder={translations[language]?.searchPlaceholder || "Rechercher un produit..."}
        className={`form-control ${isDarkTheme ? 'bg-dark text-light' : ''}`}
      />
    </div>
  );
};

export default ProductSearch;