import './App.css'
import LetterGridGenerator from './components/LetterGridGenerator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <LetterGridGenerator 
        words={['ESTADISTICA', 'PORCENTAJE', 'FRECUENCIA', 'SERIE', 'DATOS', 'MEDIA', 'MODA', 'PROMEDIO', 'MEDIANA']} 
        gridSize={12} 
      />
    </div>
  );
};

export default App;