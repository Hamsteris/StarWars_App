import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, Container, Box, CircularProgress, Button } from '@mui/material';

const CharacterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); 
  const [character, setCharacter] = useState(null);
  const [homeworld, setHomeworld] = useState(null);
  const [films, setFilms] = useState([]);

  useEffect(() => {
    const fetchCharacter = async () => {
      const response = await axios.get(`https://swapi.py4e.com/api/people/${id}/`);
      setCharacter(response.data);

      const homeworldResponse = await axios.get(response.data.homeworld);
      setHomeworld(homeworldResponse.data);
      
      const filmRequests = response.data.films.map((filmUrl) => axios.get(filmUrl));
      const filmResponses = await Promise.all(filmRequests);
      setFilms(filmResponses.map((film) => film.data));
    };

    fetchCharacter();
  }, [id]);

  if (!character) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          backgroundColor: '#242424',
          color: 'white',
        }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      sx={{
        marginTop: '80px',
        color: 'white',
        backgroundColor: '#242424',
        padding: '2rem',
        maxWidth: '600px',
        marginLeft: 'auto',
        marginRight: 'auto',
      }}>
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          fontWeight: 'bold',
          textAlign: 'center',
          color: '#872341', 
        }}>
        {character.name}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '1rem', textAlign: 'center' }}>
        <strong>Height:</strong> {character.height}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '1rem', textAlign: 'center' }}>
        <strong>Mass:</strong> {character.mass}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '1rem', textAlign: 'center' }}>
        <strong>Gender:</strong> {character.gender}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '1rem', textAlign: 'center' }}>
        <strong>Year:</strong> {character.birth_year}
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: '1rem', textAlign: 'center' }}>
        <strong>Home Planet:</strong> {homeworld ? homeworld.name : 'Loading...'}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          marginTop: '2rem',
          fontWeight: 'bold',
          color: '#872341',
          textAlign: 'center',
        }}>
        Films
      </Typography>
      {films.length > 0 ? (
        films.map((film) => (
          <Typography
            key={film.url}
            variant="body2"
            sx={{
              textAlign: 'center',
              marginTop: '0.5rem',
              color: '#FBFBFB',
            }}>
            {film.title} (Released: {film.release_date})
          </Typography>
        ))
      ) : (
        <Typography variant="body2" sx={{ textAlign: 'center', marginTop: '0.5rem' }}>
          Loading films...
        </Typography>
      )}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '2rem', 
        }}>
        <Button
          variant="outlined"
          onClick={() => navigate(-1)}
          sx={{
            color: '#FBFBFB',
            borderColor: '#BE3144',
            '&:hover': {
              backgroundColor: '#872341',
              borderColor: '#700F1C',
            },
          }}>
          Back
        </Button>
      </Box>
    </Container>
  );
};

export default CharacterDetails;
