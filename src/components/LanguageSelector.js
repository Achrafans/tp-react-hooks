import { useLanguage } from "../hooks/useLanguage"

const LanguageSelector = () => {
    const { language, changeLanguage, translations  } = useLanguage(); 



    return (
        <div>
        <label htmlFor="language">{translations[language].languageSelector} </label>
        <select
            id="language"
            value={language}
            onChange={(e) => changeLanguage(e.target.value)}
        >
            <option value="en">Anglais</option>
            <option value="fr">Français</option>
            <option value="es">Espagnol</option>
        </select>
        </div>
    )
}

export default LanguageSelector;
