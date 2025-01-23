import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from './Components/Header';
import CustomTable from './Components/Table';
import Pagination from './Components/Pagination';
import CharacterDetailsModal from './Components/Modal';
import { useTranslation } from 'react-i18next';
import { Character } from '../../components/Character';

const CharacterTable: React.FC = () => {
  const { t } = useTranslation();
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get(`https://swapi.py4e.com/api/people/?page=${page}`);
        setCharacters(response.data.results);
        const count = response.data.count;
        setTotalPages(Math.ceil(count / 10));
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    fetchCharacters();
  }, [page]);

  const getCharacterId = (url: string): string => {
    const parts = url.split('/');
    return parts[parts.length - 2];
  };

  const handleRowClick = async (character: Character) => {
    try {
      const response = await axios.get(character.url);
      setSelectedCharacter(response.data);
    } catch (error) {
      console.error('Error fetching character details:', error);
    }
  };

  const handleCloseModal = () => {
    setSelectedCharacter(null);
  };

  const handleGoToCharacterPage = () => {
    if (selectedCharacter) {
      const characterId = getCharacterId(selectedCharacter.url);
      navigate(`/character/${characterId}`);
    }
  };

  return (
    <Box
      sx={{
        
        borderRadius: 2,
        backgroundColor: '#2E2E2E',
        boxShadow: 3,
      }}
      className="max-w-4xl mx-auto mt-10 p-6"
    >
      <Header title={t('starWarsCharacters')} />

      <CustomTable
        columns={[
          { key: 'name', label: t('characterDetails.name') },
          { key: 'gender', label: t('characterDetails.gender') },
        ]}
        data={characters}
        onRowClick={handleRowClick}
      />

      <Pagination
        page={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
      />

      <CharacterDetailsModal
        character={selectedCharacter}
        onClose={handleCloseModal}
        onNavigate={handleGoToCharacterPage}
      />
    </Box>
  );
};

export default CharacterTable;
