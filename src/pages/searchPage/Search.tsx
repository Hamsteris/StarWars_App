import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import SearchBar from './Components/SearchBar';
import { Character } from '../../components/Character';

const Search: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<Character[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      if (query.trim() === '') {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      try {
        const response = await axios.get<{ results: Character[] }>(
          `https://swapi.py4e.com/api/people/?search=${query}`
        );
        setResults(response.data.results);
        setShowDropdown(true);
      } catch (error) {
        console.error('Error fetching data:', error);
        setResults([]);
      }
    };

    const debounceFetch = setTimeout(fetchCharacters, 300);
    return () => clearTimeout(debounceFetch);
  }, [query]);

  const handleItemClick = (url: string) => {
    const parts = url.split('/');
    const characterId = parts[parts.length - 2];
    setShowDropdown(false);
    navigate(`/character/${characterId}`);
  };

  return (
    <div className="relative mt-10 max-w-3xl mx-auto">
      <SearchBar
        query={query}
        setQuery={setQuery}
        results={results}
        showDropdown={showDropdown}
        onItemClick={handleItemClick}
      />
    </div>
  );
};

export default Search;
