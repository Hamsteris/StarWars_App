import React, { FC } from 'react';
import { TextField, Paper, List, ListItem, Typography } from '@mui/material';
import '../../../utils/i18n';
import { useTranslation } from 'react-i18next';

interface SearchBarProps {
  query: string;
  setQuery: (query: string) => void;
  results: { name: string; url: string }[];
  showDropdown: boolean;
  onItemClick: (url: string) => void;
}

const SearchBar: FC<SearchBarProps> = ({ query, setQuery, results, showDropdown, onItemClick }) => {
  const { t } = useTranslation();
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <TextField
        fullWidth
        variant="outlined"
        placeholder={t('searchForChar')}
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
        className="mb-4"
      />
      {showDropdown && results.length > 0 && (
        <Paper
          elevation={4}
          sx={{
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
          className="mt-2"
        >
          <List className="p-2">
            {results.map((character) => (
              <ListItem
                key={character.name}
                onClick={() => onItemClick(character.url)}
                sx={{
                  cursor: 'pointer',
                  color: '#FBFBFB',
                  '&:hover': { backgroundColor: '#444444' },
                }}
                className="mb-1"
              >
                <Typography>{character.name}</Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default SearchBar;
