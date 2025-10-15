import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchBar = ({ onSearch, searchQuery, setSearchQuery }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const popularSearches = [
    'iPhone', 'Samsung Galaxy', 'Nike Air', 'Adidas', 'Laptop',
    'Auriculares', 'Camisetas', 'Zapatos deportivos', 'Smartwatch', 'Tablet'
  ];

  const recentSearches = [
    'iPhone 15', 'Zapatillas running', 'Laptop gaming', 'Auriculares bluetooth'
  ];

  useEffect(() => {
    // Get search query from URL params
    const urlParams = new URLSearchParams(location.search);
    const searchParam = urlParams?.get('search');
    if (searchParam && searchParam !== searchQuery) {
      setSearchQuery(searchParam);
      onSearch(searchParam);
    }
  }, [location?.search]);

  useEffect(() => {
    if (searchQuery?.length > 2) {
      setIsLoading(true);
      // Simulate API call for suggestions
      const timer = setTimeout(() => {
        const mockSuggestions = [
          `${searchQuery} pro`,
          `${searchQuery} max`,
          `${searchQuery} mini`,
          `${searchQuery} plus`,
          `${searchQuery} lite`
        ]?.slice(0, 5);
        setSuggestions(mockSuggestions);
        setIsLoading(false);
        setShowSuggestions(true);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]);

  const handleSearch = (query = searchQuery) => {
    if (query?.trim()) {
      // Update URL with search query
      const urlParams = new URLSearchParams(location.search);
      urlParams?.set('search', query?.trim());
      navigate(`${location?.pathname}?${urlParams?.toString()}`);
      
      onSearch(query?.trim());
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    setSearchQuery(e?.target?.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      e?.preventDefault();
      handleSearch();
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setShowSuggestions(false);
    // Remove search param from URL
    const urlParams = new URLSearchParams(location.search);
    urlParams?.delete('search');
    const newUrl = urlParams?.toString() ? `${location?.pathname}?${urlParams?.toString()}` : location?.pathname;
    navigate(newUrl);
    onSearch('');
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      <div className="relative">
        <Input
          type="search"
          placeholder="Buscar productos, marcas, categorías..."
          value={searchQuery}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          onFocus={() => searchQuery?.length > 2 && setShowSuggestions(true)}
          className="pl-12 pr-20 h-12 text-base"
        />
        
        <Icon 
          name="Search" 
          size={20} 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-secondary" 
        />
        
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="w-8 h-8"
            >
              <Icon name="X" size={16} />
            </Button>
          )}
          
          <Button
            variant="default"
            size="sm"
            onClick={() => handleSearch()}
            disabled={!searchQuery?.trim()}
            className="px-4"
          >
            Buscar
          </Button>
        </div>
      </div>
      {/* Search Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-popover border border-border rounded-lg shadow-soft-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center">
              <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto"></div>
              <p className="text-sm text-text-secondary mt-2">Buscando...</p>
            </div>
          ) : (
            <div className="py-2">
              {/* Search Suggestions */}
              {suggestions?.length > 0 && (
                <div className="px-4 py-2">
                  <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2">
                    Sugerencias
                  </h4>
                  {suggestions?.map((suggestion, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full text-left px-3 py-2 hover:bg-muted rounded-md transition-colors duration-200 flex items-center gap-3"
                    >
                      <Icon name="Search" size={16} className="text-text-secondary" />
                      <span className="text-sm text-popover-foreground">{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Recent Searches */}
              {searchQuery?.length === 0 && recentSearches?.length > 0 && (
                <div className="px-4 py-2 border-t border-border">
                  <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2">
                    Búsquedas recientes
                  </h4>
                  {recentSearches?.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(search)}
                      className="w-full text-left px-3 py-2 hover:bg-muted rounded-md transition-colors duration-200 flex items-center gap-3"
                    >
                      <Icon name="Clock" size={16} className="text-text-secondary" />
                      <span className="text-sm text-popover-foreground">{search}</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Popular Searches */}
              {searchQuery?.length === 0 && (
                <div className="px-4 py-2 border-t border-border">
                  <h4 className="text-xs font-medium text-text-secondary uppercase tracking-wide mb-2">
                    Búsquedas populares
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {popularSearches?.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSuggestionClick(search)}
                        className="px-3 py-1 bg-muted hover:bg-muted/80 rounded-full text-xs text-popover-foreground transition-colors duration-200"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {/* Overlay to close suggestions */}
      {showSuggestions && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowSuggestions(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;