import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Character } from '../../../components/Character';

interface Column {
  key: keyof Character;
  label: string;
}

interface TableProps<T> {
  columns: Column[];
  data: T[];
  onRowClick?: (row: T) => void;
}

const CustomTable = <T extends object>({ columns, data, onRowClick }: TableProps<T>) => {
  const { t } = useTranslation();

  return (
    <TableContainer component={Paper} sx={{ backgroundColor: '#333333' }}>
      <Table>
        <TableHead>
          <TableRow sx={{ backgroundColor: '#872341' }}>
            {columns.map((column) => (
              <TableCell
                key={column.key as string}
                sx={{ color: '#FBFBFB', fontWeight: 'bold' }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow
              key={rowIndex}
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              sx={{
                cursor: onRowClick ? 'pointer' : 'default',
                '&:hover': { backgroundColor: onRowClick ? '#444444' : undefined },
              }}
            >
              {columns.map((column) => (
                <TableCell key={column.key as string} sx={{ color: '#FBFBFB' }}>
                  {column.key === 'gender'
                    ? t(`characterDetails.genders.${(row as any)[column.key]}`)
                    : (row as any)[column.key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CustomTable;
