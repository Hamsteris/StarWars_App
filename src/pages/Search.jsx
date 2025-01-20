import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  List,
  ListItem,
  Paper,
  Typography,
  Box,
} from '@mui/material';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      if (query.trim() === '') {
        setResults([]);
        setShowDropdown(false);
        return;
      }

      try {
        const response = await axios.get(`https://swapi.py4e.com/api/people/?search=${query}`);
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

  const handleItemClick = (url) => {
    const parts = url.split('/');
    const characterId = parts[parts.length - 2];
    setShowDropdown(false);
    navigate(`/character/${characterId}`);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        mt: 5,
        maxWidth: 600,
        mx: 'auto',
      }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search for a character"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          backgroundColor: '#2E2E2E',
          input: { color: '#FBFBFB' },
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: '#BE3144',
            },
            '&:hover fieldset': {
              borderColor: '#872341',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#700F1C',
            },
          },
        }}
      />
      {showDropdown && results.length > 0 && (
        <Paper
        elevation={4}
        sx={{
          position: 'absolute',
          top: '100%',
          left: 0,
          width: '100%',
          zIndex: 1000,
          maxHeight: 200,
          overflowY: 'auto',
          backgroundColor: '#2E2E2E',
          border: '1px solid #BE3144',
          borderRadius: 1,
          '&::-webkit-scrollbar': {
            width: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#BE3144',
            borderRadius: '4px',
          },
          '&::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#872341',
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#2E2E2E',
          },
        }}
      >
        <List>
          {results.map((character) => (
            <ListItem
              key={character.name}
              onClick={() => handleItemClick(character.url)}
              sx={{
                cursor: 'pointer',
                color: '#FBFBFB',
                '&:hover': { backgroundColor: '#444444' },
              }}
            >
              <Typography>{character.name}</Typography>
            </ListItem>
          ))}
        </List>
      </Paper>
      
      )}
    </Box>
  );
};

export default Search;
