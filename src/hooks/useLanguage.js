import React, { createContext, useState, useContext } from 'react';

const LanguageContext = createContext();

// Traductions pour chaque langue
const translations = {
    en: {
      title: "Product Catalog",
      welcomeMessage: "Welcome to the Product Catalog",
      languageSelector: "Choose a language : ",
      searchPlaceholder: "Search for a product..."
    },
    fr: {
      title: "Catalogue de Produits",
      welcomeMessage: "Bienvenue dans le Catalogue de Produits",
      languageSelector: "Choisissez une langue : ",
      searchPlaceholder: "Rechercher un produit..."
    },
    es: {
      title: "Catálogo de Productos",
      welcomeMessage: "Bienvenido al Catálogo de Productos",
      languageSelector: "Elige un idioma : ",
      searchPlaceholder: "Buscar un producto..."
    }
  };

// Fournisseur de contexte
export const LanguageProvider = ({ children }) => {
  // Etat de la langue (par défaut en anglais)
  const [language, setLanguage] = useState('en');

  // Fonction pour changer la langue
  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, translations }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personnalisé pour utiliser la langue dans d'autres composants
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
  };
