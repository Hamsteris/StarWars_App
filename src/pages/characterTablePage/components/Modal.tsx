import React, { useState, useEffect } from 'react';
import {
  Box,
  Modal,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableRow,
  IconButton,
  CircularProgress,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import PageButton from '../../../components/PageButton';
import { useTranslation } from 'react-i18next';

interface CharacterDetailsModalProps {
  character: any;
  onClose: () => void;
  onNavigate: () => void;
}

const CharacterDetailsModal: React.FC<CharacterDetailsModalProps> = ({
  character,
  onClose,
  onNavigate,
}) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (character) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [character]);

  const handleClose = () => {
    setLoading(true);
    onClose();
  };
  const translateUnknown = (value: string | null | undefined) => {
    const lowercaseValue = value?.toLowerCase() || 'unknown';

    if (!value || lowercaseValue === 'unknown' || lowercaseValue === 'none') {
      return t(`characterDetails.height.${lowercaseValue}`, t('characterDetails.unknown'));
    }
    return value;
  };

  return (
    <Modal
      open={!!character}
      onClose={handleClose}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <CircularProgress
            size={60}
            sx={{ color: '#BE3144' }}
          />
        </Box>
      ) : (
        <Paper
          sx={{
            width: 400,
            p: 3,
            color: '#FBFBFB',
            backgroundColor: '#2E2E2E',
            borderRadius: 2,
            position: 'relative',
          }}
        >
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              color: '#FBFBFB',
              '&:hover': {
                backgroundColor: '#872341',
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          <Typography variant="h5" gutterBottom sx={{ color: '#FBFBFB' }}>
            {character.name}
          </Typography>

          <Table>
            <TableBody>
              {[
                [t('characterDetails.gender'), t(`characterDetails.genders.${character.gender}`, { defaultValue: character.gender })],
                [t('characterDetails.height'), `${translateUnknown(character.height)} cm`],
                [t('characterDetails.mass'), `${translateUnknown(character.mass)} kg`],
              ].map(([label, value]) => (
                <TableRow key={label as string}>
                  <TableCell sx={{ color: '#FBFBFB', borderColor: '#FBFBFB' }}>
                    {label}
                  </TableCell>
                  <TableCell sx={{ color: '#FBFBFB', borderColor: '#FBFBFB' }}>
                    {value}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <PageButton onClick={onNavigate}>
              {t('goToCharacterPage')}
            </PageButton>
          </Box>
        </Paper>
      )}
    </Modal>
  );
};

export default CharacterDetailsModal;
