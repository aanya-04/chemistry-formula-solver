import { useState } from "react";
import axios from "axios";

export default function AddFormulaForm({ onAdded }) {
  const [formData, setFormData] = useState({
    name: "", formula: "", molarMass: "", atoms: "", explanationTree: {}
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const atomsArr = formData.atoms.split(',').map(a => a.trim());
      await axios.post("http://localhost:5000/api/formulas", {
        ...formData,
        atoms: atomsArr,
        molarMass: parseFloat(formData.molarMass)
      });
      onAdded();
    } catch (err) {
      alert("Error adding formula");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-md">
      <h3 className="text-xl font-semibold mb-2">Add New Formula</h3>
      <input className="input" placeholder="Name" required
        onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
      <input className="input" placeholder="Formula (e.g. H2O)" required
        onChange={(e) => setFormData({ ...formData, formula: e.target.value })} />
      <input className="input" placeholder="Molar Mass (g/mol)" required type="number"
        onChange={(e) => setFormData({ ...formData, molarMass: e.target.value })} />
      <input className="input" placeholder="Atoms (comma-separated)" required
        onChange={(e) => setFormData({ ...formData, atoms: e.target.value })} />
      <button className="bg-green-600 text-white px-4 py-2 mt-2 rounded hover:bg-green-700">Add</button>
    </form>
  );
}
