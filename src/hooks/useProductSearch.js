import { useState, useEffect } from 'react';
import useDebounce from './useDebounce';

// TODO: Exercice 3.1 - Créer le hook useDebounce
// TODO: Exercice 3.2 - Créer le hook useLocalStorage

const useProductSearch = (searchTerm) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;


  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const skip = (currentPage - 1) * itemsPerPage;
        const response = await fetch(`https://api.daaif.net/products?delay=1000&skip=${skip}&limit=${itemsPerPage}`);
        //const response = await fetch('https://api.daaif.net/products?delay=1000');
        if (!response.ok) throw new Error('Erreur réseau');
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products); // Initialiser avec tous les produits
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage]);

    // Filtrage des produits en fonction du terme de recherche
    useEffect(() => {
      if (debouncedSearchTerm === '' || debouncedSearchTerm == null) {
        setFilteredProducts(products); // Affiche tous les produits si la recherche est vide
      } else {
        const lowercasedSearchTerm = debouncedSearchTerm.toLowerCase();
        const filtered = products.filter(product =>
          product.title.toLowerCase().includes(lowercasedSearchTerm) ||
          product.description.toLowerCase().includes(lowercasedSearchTerm)
        );
        setFilteredProducts(filtered);
      }
    }, [debouncedSearchTerm, products]);



  const nextPage = () => setCurrentPage(prev => prev + 1);
  const previousPage = () => setCurrentPage(prev => Math.max(prev - 1, 1));
  const totalPages = Math.ceil(products.length / itemsPerPage);
  

  return { 
    products: filteredProducts, 
    loading, 
    error,
    currentPage,
    nextPage,
    previousPage,
    totalPages
  };
};

export default useProductSearch;