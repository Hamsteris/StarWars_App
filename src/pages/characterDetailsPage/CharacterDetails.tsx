import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { Character } from '../../components/Character';

interface Homeworld {
  name: string;
}

interface Film {
  title: string;
  release_date: string;
  url: string;
}

const CharacterDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [character, setCharacter] = useState<Character | null>(null);
  const [homeworld, setHomeworld] = useState<Homeworld | null>(null);
  const [films, setFilms] = useState<Film[]>([]);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await axios.get<Character>(`https://swapi.py4e.com/api/people/${id}/`);

        setCharacter(response.data);

        if (response.data.homeworld) {
          const homeworldResponse = await axios.get<Homeworld>(response.data.homeworld);
          setHomeworld(homeworldResponse.data);
        }

        const filmRequests = response.data.films.map((filmUrl) => axios.get<Film>(filmUrl));
        const filmResponses = await Promise.all(filmRequests);
        setFilms(filmResponses.map((film) => film.data));
      } catch (error) {
        console.error('Error fetching character data:', error);
      }
    };

    fetchCharacter();
  }, [id]);

  if (!character) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-red-600"></div>
      </div>
    );
  }

  const translateUnknown = (value: string | null | undefined, type: string = 'genders') => {
    const lowercaseValue = value?.toLowerCase() || 'unknown';

    if (!value || lowercaseValue === 'unknown' || lowercaseValue === 'none') {
      return t(`characterDetails.${type}.${lowercaseValue}`, t('characterDetails.unknown'));
    }
    return value;
  };
  return (
    <div
      className="container mx-auto mt-20 p-8 rounded-lg max-w-xl"
      style={{ backgroundColor: '#242424', color: 'white' }}
    >
      <h1 className="text-3xl font-bold text-center text-red-600 mb-6">{character.name}</h1>

      <p className="text-center mb-4">
        <strong>{t('characterDetails.gender')}:</strong>{' '}
        {t(`characterDetails.genders.${character.gender}`, character.gender)}
      </p>
      <p className="text-center mb-4">
        <strong>{t('characterDetails.height')} cm:</strong> {translateUnknown(character.height)}
      </p>
      <p className="text-center mb-4">
        <strong>{t('characterDetails.mass')} kg:</strong> {translateUnknown(character.mass)}
      </p>
      <p className="text-center mb-4">
        <strong>{t('characterDetails.birthYear')}:</strong> {translateUnknown(character.birth_year)}
      </p>
      <p className="text-center mb-4">
        <strong>{t('characterDetails.homePlanet')}:</strong>{' '}
        {homeworld
          ? (homeworld.name === 'unknown' || homeworld.name === 'none'
            ? t('characterDetails.unknown')
            : homeworld.name)
          : t('characterDetails.loading')}
      </p>

      <h2 className="text-xl font-bold text-center text-red-600 mt-8 mb-4">
        {t('characterDetails.films')}
      </h2>
      {films.length > 0 ? (
        films.map((film) => (
          <p key={film.url} className="text-center mb-2">
            {film.title} ({t('characterDetails.release')}: {film.release_date})
          </p>
        ))
      ) : (
        <div className="flex justify-center mt-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-red-600"></div>
        </div>
      )}

      <div className="flex justify-center mt-8">
        <button
          className="px-4 py-2 bg-red-600 text-white font-bold rounded hover:bg-red-700"
          onClick={() => navigate(-1)}
        >
          {t('characterDetails.back')}
        </button>
      </div>
    </div>
  );
};

export default CharacterDetails;
