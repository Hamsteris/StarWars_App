import React from 'react';
import { Box } from '@mui/material';
import PageButton from '../../../components/PageButton';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  const { t } = useTranslation()
  const generatePageNumbers = (): number[] => {

    const pageNumbers: number[] = [];
    const range = 3;
    const start = Math.max(2, page - Math.floor(range / 2));
    const end = Math.min(totalPages - 1, start + range - 1);

    if (totalPages > 1) {
      pageNumbers.push(1);
    }

    for (let i = start; i <= end; i++) {
      pageNumbers.push(i);
    }

    if (totalPages > 1 && !pageNumbers.includes(totalPages)) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        mt: 3,
        gap: 2,
        flexWrap: { xs: 'wrap', sm: 'nowrap' },
      }}
    >

      <PageButton
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}

      >
        {t('prev')}
      </PageButton>


      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexWrap: 'wrap',
          gap: 1,
          flexGrow: 1,
        }}
      >
        {generatePageNumbers().map((pageNum) => (
          <PageButton
            key={pageNum}
            isRound
            isActive={pageNum === page}
            disabled={pageNum === page}
            onClick={() => onPageChange(pageNum)}
            sx={{
              minWidth: '32px',
              padding: '0 8px',
              fontSize: '0.75rem',
            }}
          >
            {pageNum}
          </PageButton>
        ))}
      </Box>


      <PageButton
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
      >
        {t('next')}
      </PageButton>
    </Box>
  );
};

export default Pagination;
