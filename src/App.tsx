import './App.css'
import LetterGridGenerator from './components/LetterGridGenerator';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <LetterGridGenerator 
        words={['BALANCE', 'AUDITORIA', 'ACTIVOS', 'PASIVOS', 'PATRIMONIO', 'LIQUIDEZ', 'FACTURAS', 'DEPRECIAR', 'INVENTARIO', 'FINANZAS']} 
        gridSize={14} 
      />
    </div>
  );
};

export default App;