import React from 'react';
import PageButton from '../../../components/PageButton';
import { useTranslation } from 'react-i18next';

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, totalPages, onPageChange }) => {
  const { t } = useTranslation();

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
    <div className="flex items-center justify-between mt-3 gap-2">
      <PageButton
        onClick={() => onPageChange(Math.max(page - 1, 1))}
        disabled={page === 1}
        
      >
        {t('prev')}
      </PageButton>

      <div className="flex items-center justify-center gap-1 flex-grow overflow-auto">
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
      </div>

      <PageButton
        onClick={() => onPageChange(Math.min(page + 1, totalPages))}
        disabled={page === totalPages}
        
      >
        {t('next')}
      </PageButton>
    </div>
  );
};

export default Pagination;
