export default function FormulaCard({ data, onClick }) {
  return (
    <div onClick={() => onClick(data)} className="bg-white rounded-lg shadow-md p-5 cursor-pointer hover:shadow-lg transition">
      <h3 className="text-lg font-bold text-blue-600">{data.name} ({data.formula})</h3>
      <p className="text-sm text-gray-600">Molar Mass: {data.molarMass} g/mol</p>
      <p className="text-xs text-gray-500 mt-1">Atoms: {data.atoms.join(', ')}</p>
    </div>
  );
}
