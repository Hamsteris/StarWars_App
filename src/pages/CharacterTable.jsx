import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, 
        Box, Typography } from '@mui/material';

const CharacterTable = () => {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await axios.get(`https://swapi.py4e.com/api/people/?page=${page}`);
      setCharacters(response.data.results); };
    fetchCharacters(); }, [page]);

  const getCharacterId = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  return (
    <Box
      sx={{
        maxWidth: 800,
        mx: 'auto',
        mt: 5,
        p: 3,
        borderRadius: 2,
        backgroundColor: '#2E2E2E',
        boxShadow: 3,
      }}>
      <Typography variant="h4" align="center" gutterBottom sx={{ color: '#FBFBFB' }}>
        StarWars Characters
      </Typography>

      <TableContainer component={Paper} sx={{ backgroundColor: '#333333' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#872341' }}>
              <TableCell sx={{ color: '#FBFBFB', fontWeight: 'bold' }}>Name</TableCell>
              <TableCell sx={{ color: '#FBFBFB', fontWeight: 'bold' }}>Gender</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {characters.map((character) => {
              const characterId = getCharacterId(character.url);
              return (
                <TableRow
                  key={characterId}
                  onClick={() => navigate(`/character/${characterId}`)}
                  sx={{
                    cursor: 'pointer',
                    '&:hover': { backgroundColor: '#444444' },
                  }}>
                  <TableCell sx={{ color: '#FBFBFB' }}>{character.name}</TableCell>
                  <TableCell sx={{ color: '#FBFBFB' }}>{character.gender}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mt: 3,
        }}>
        <Button
          variant="outlined"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
          sx={{
            color: '#FBFBFB',
            borderColor: '#BE3144',
            '&:hover': {
              backgroundColor: '#872341',
              borderColor: '#700F1C',
            },
          }}>
          Previous
        </Button>
        <Button
          variant="outlined"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={characters.length < 10}
          sx={{
            color: '#FBFBFB',
            borderColor: '#BE3144',
            '&:hover': {
              backgroundColor: '#872341',
              borderColor: '#700F1C',
            },
          }}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default CharacterTable;
