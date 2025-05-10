import React, { useState, useEffect } from 'react';
import type { LetterGridProps } from './controllers';
import useLetterGridController from './controllers';

const LetterGridGenerator: React.FC<LetterGridProps> = ({ words, gridSize = 15 }) => {
  const {
    grid,
    inputWords,
    newWord,
    setNewWord,
    handleAddWord,
    handleRemoveWord,
    handleReset,
    handleCellClick,
    selectedCells,
    setSelectedCells
  } = useLetterGridController({ words, gridSize });

  const [foundWords, setFoundWords] = useState<Record<string, boolean>>(
    words.reduce((acc, word) => ({ ...acc, [word]: false }), {})
  );
  const [showWinMessage, setShowWinMessage] = useState(false);

  // Efecto para verificar si todas las palabras han sido encontradas
  useEffect(() => {
    const allWordsFound = Object.values(foundWords).every(found => found);
    if (allWordsFound) {
      setShowWinMessage(true);
    }
  }, [foundWords]);

  const toggleWordFound = (word: string) => {
    setFoundWords(prev => ({
      ...prev,
      [word]: !prev[word]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6 font-sans">
      <h1 className="text-xl md:text-2xl font-bold text-center mb-4 md:mb-6">Generador de Sopa de Letras</h1>
      <p className="text-center text-sm text-gray-500 mb-2">Hecho por GABRIEL MONSALVE</p>
      
      {/* Banner de palabras */}
      <div className="flex flex-wrap gap-2 mb-4 md:mb-6 p-3 md:p-4 bg-gray-100 rounded-lg justify-center">
        {words.map((word) => (
          <span
            key={word}
            className={`px-2 py-1 text-sm md:text-base md:px-3 rounded-full cursor-pointer ${
              foundWords[word] 
                ? 'bg-green-500 text-white' 
                : 'bg-gray-300 text-gray-800 hover:bg-gray-400'
            }`}
            onClick={() => toggleWordFound(word)}
          >
            {word}
          </span>
        ))}
      </div>
      
      {/* Mensaje de victoria */}
      {showWinMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">¡GANASTE ERES LO MAXIMO!</h2>
            <button 
              onClick={() => setShowWinMessage(false)}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      
      <div className="flex justify-center">
        <div className="overflow-x-auto">
          <div className="inline-block border-2 border-gray-800 mx-auto">
            {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                {row.map((cell, cellIndex) => {
                  const cellKey = `${rowIndex}-${cellIndex}`;
                  const isSelected = selectedCells[cellKey];
                  
                  return (
                    <div 
                      key={cellIndex} 
                      className={`w-6 h-6 md:w-8 md:h-8 flex items-center justify-center border border-gray-200 font-bold cursor-pointer text-sm md:text-base ${
                        isSelected ? 'bg-green-500' : ''
                      }`}
                      onClick={() => handleCellClick(rowIndex, cellIndex)}
                    >
                      {cell}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterGridGenerator;

/*
 <div className="flex flex-col md:flex-row gap-6 mb-8 hidden">
      
          <div className="flex-1">
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newWord}
                onChange={(e) => setNewWord(e.target.value)}
                placeholder="Ingresa una palabra"
                maxLength={gridSize}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button 
                onClick={handleAddWord} 
                disabled={inputWords.length >= 10}
                className={`px-4 py-2 rounded-md text-white ${inputWords.length >= 10 ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'}`}
              >
                Agregar ({10 - inputWords.length} restantes)
              </button>
              <button 
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Reiniciar
              </button>
            </div>
          </div>
          <div className="flex-1">
          <div className="border border-gray-200 p-4 rounded-lg bg-gray-50">
            <h3 className="font-semibold mb-2">Palabras ingresadas:</h3>
            <ul className="space-y-1">
              {inputWords.map((word, index) => (
                <li key={index} className="flex justify-between items-center">
                  <span>{word}</span>
                  <button 
                    onClick={() => handleRemoveWord(index)}
                    className="w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full hover:bg-red-600"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
*/