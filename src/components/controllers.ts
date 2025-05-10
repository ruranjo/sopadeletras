import { useState, useEffect } from 'react';

export interface LetterGridProps {
  words: string[];
  gridSize?: number;
}

const useLetterGridController = ({ words, gridSize = 15 }: LetterGridProps) => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [inputWords, setInputWords] = useState<string[]>(words);
  const [newWord, setNewWord] = useState<string>('');

  // Inicializar la cuadrícula vacía solo cuando cambia gridSize
  useEffect(() => {
    const newGrid: string[][] = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    setGrid(newGrid);
  }, [gridSize]);

  // Generar la cuadrícula cuando cambian las palabras o el tamaño
  useEffect(() => {
    const newGrid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    
    if (inputWords.length > 0) {
      inputWords.forEach(word => {
        placeWord(newGrid, word.toUpperCase());
      });
      fillEmptySpaces(newGrid);
    }
    
    setGrid(newGrid);
  }, [inputWords, gridSize]);

  const initializeGrid = () => {
    const newGrid: string[][] = [];
    for (let i = 0; i < gridSize; i++) {
      newGrid.push(Array(gridSize).fill(''));
    }
    setGrid(newGrid);
  };

  const placeWord = (grid: string[][], word: string) => {
    const maxAttempts = 100;
    let placed = false;
    
    for (let attempts = 0; attempts < maxAttempts && !placed; attempts++) {
      const direction = Math.floor(Math.random() * 4);
      const row = Math.floor(Math.random() * (gridSize - word.length + 1));
      const col = Math.floor(Math.random() * (gridSize - word.length + 1));
      
      placed = tryPlaceWord(grid, word, row, col, direction);
    }
    
    if (!placed) {
      console.warn(`No se pudo colocar la palabra: ${word}`);
    }
  };

  const tryPlaceWord = (grid: string[][], word: string, row: number, col: number, direction: number): boolean => {
    const length = word.length;
    
    // Verificar bordes
    switch (direction) {
      case 0: if (col + length > gridSize) return false; break;
      case 1: if (row + length > gridSize) return false; break;
      case 2: if (row + length > gridSize || col + length > gridSize) return false; break;
      case 3: if (row + length > gridSize || col - length + 1 < 0) return false; break;
      default: return false;
    }
    
    // Verificar conflicto con letras existentes
    for (let i = 0; i < length; i++) {
      const r = row + (direction === 1 || direction >= 2 ? i : 0);
      const c = col + (direction === 0 ? i : (direction === 2 ? i : (direction === 3 ? -i : 0)));
      
      if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
        return false;
      }
    }
    
    // Colocar la palabra
    for (let i = 0; i < length; i++) {
      const r = row + (direction === 1 || direction >= 2 ? i : 0);
      const c = col + (direction === 0 ? i : (direction === 2 ? i : (direction === 3 ? -i : 0)));
      grid[r][c] = word[i];
    }
    
    return true;
  };

  const fillEmptySpaces = (grid: string[][]) => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        if (grid[i][j] === '') {
          grid[i][j] = letters[Math.floor(Math.random() * letters.length)];
        }
      }
    }
  };

  const handleAddWord = () => {
    if (newWord.trim() && inputWords.length < 10) {
      setInputWords([...inputWords, newWord.trim()]);
      setNewWord('');
    }
  };

  const handleRemoveWord = (index: number) => {
    const updatedWords = [...inputWords];
    updatedWords.splice(index, 1);
    setInputWords(updatedWords);
  };

  const handleReset = () => {
    setInputWords([]);
    initializeGrid();
  };

  const [selectedCells, setSelectedCells] = useState<{[key: string]: boolean}>({});

  // Función para manejar el clic en una celda
  const handleCellClick = (rowIndex: number, cellIndex: number) => {
    const cellKey = `${rowIndex}-${cellIndex}`;
    setSelectedCells(prev => ({
      ...prev,
      [cellKey]: !prev[cellKey] // Alternar selección
    }));
  };

  return {
    selectedCells,
    setSelectedCells,
    handleCellClick,
    grid,
    inputWords,
    newWord,
    setNewWord,
    handleAddWord,
    handleRemoveWord,
    handleReset
  };
};

export default useLetterGridController;