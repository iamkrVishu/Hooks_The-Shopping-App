import React, { useState, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { Product } from '../types';
import { generateSampleProducts } from '../lib/sampleProducts';

export default function SearchBar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [allProducts] = useState(generateSampleProducts());

  useOnClickOutside(searchRef, () => {
    setIsActive(false);
    setSelectedIndex(-1);
  });

  useEffect(() => {
    if (query.trim().length >= 2) {
      const filtered = allProducts
        .filter(product =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 5);
      setSuggestions(filtered);
      setIsActive(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setIsActive(false);
      setSelectedIndex(-1);
    }
  }, [query, allProducts]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      if (selectedIndex >= 0 && suggestions[selectedIndex]) {
        handleSuggestionClick(suggestions[selectedIndex]);
      } else {
        navigate(`/search?q=${encodeURIComponent(query)}`);
        setIsActive(false);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isActive) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => prev > -1 ? prev - 1 : prev);
        break;
      case 'Escape':
        setIsActive(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
      case 'Enter':
        if (selectedIndex >= 0 && suggestions[selectedIndex]) {
          e.preventDefault();
          handleSuggestionClick(suggestions[selectedIndex]);
        }
        break;
    }
  };

  const handleSuggestionClick = (product: Product) => {
    navigate(`/product/${product.id}`);
    setQuery('');
    setIsActive(false);
    setSelectedIndex(-1);
  };

  const clearSearch = () => {
    setQuery('');
    setIsActive(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className="search-bar" ref={searchRef}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query.length >= 2 && setIsActive(true)}
            placeholder="Search products..."
            className="w-full px-4 py-2 pl-10 pr-12 rounded-xl bg-gray-800/50 border border-gray-700 text-gray-300 
                     focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300
                     placeholder-gray-500"
            aria-label="Search products"
            role="searchbox"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {isActive && suggestions.length > 0 && (
          <div 
            className="absolute w-full mt-2 bg-gray-800 rounded-xl shadow-xl border border-gray-700 overflow-hidden z-50"
            role="listbox"
          >
            {suggestions.map((product, index) => (
              <div
                key={product.id}
                role="option"
                aria-selected={index === selectedIndex}
                onClick={() => handleSuggestionClick(product)}
                className={`flex items-center gap-4 p-3 cursor-pointer transition-colors ${
                  index === selectedIndex ? 'bg-gray-700' : 'hover:bg-gray-700/50'
                }`}
              >
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="w-full h-full object-cover transform transition-transform duration-200 hover:scale-110"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-white font-medium truncate">{product.name}</h4>
                  <p className="text-gray-400 text-sm truncate">{product.description}</p>
                  <div className="text-pink-500 font-medium mt-1">
                    ${product.price.toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </form>
    </div>
  );
}