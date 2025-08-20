import { useState, useEffect } from 'react';
import axios from 'axios';
import FormulaCard from './components/FormulaCard';
import FormulaModal from './components/FormulaModal';
import SearchBar from './components/SearchBar';
import AddFormulaForm from './components/AddFormulaForm';

function App() {
  const [formulas, setFormulas] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchAll = async () => {
    const res = await axios.get('http://localhost:5000/api/formulas');
    setFormulas(res.data);
  };

  const searchFormula = async (term) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/formulas/${term.toLowerCase()}`);
      setSelected(res.data);
    } catch {
      alert("Formula not found");
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-100 to-blue-300 min-h-screen p-6">
      <h1 className="text-4xl font-bold text-center mb-6 text-blue-800">🧪 Chemistry Formula Solver</h1>
      <SearchBar onSearch={searchFormula} />
      {selected && <FormulaModal formula={selected} onClose={() => setSelected(null)} />}

      <div className="grid md:grid-cols-3 gap-4 mt-8 max-w-6xl mx-auto">
        {formulas.map(f => <FormulaCard key={f._id} data={f} onClick={setSelected} />)}
      </div>

      <div className="max-w-lg mx-auto mt-12">
        <AddFormulaForm onAdded={fetchAll} />
      </div>
    </div>
  );
}

export default App;
