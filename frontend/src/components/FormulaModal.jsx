export default function FormulaModal({ formula, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center">
      <div className="bg-white w-[90%] max-w-lg rounded-lg p-6 relative shadow-xl">
        <button onClick={onClose} className="absolute top-3 right-4 text-lg font-bold">×</button>
        <h2 className="text-2xl font-bold">{formula.name} ({formula.formula})</h2>
        <p className="mt-2 text-gray-700">Molar Mass: {formula.molarMass} g/mol</p>
        <p className="text-sm text-gray-500">Atoms: {formula.atoms.join(', ')}</p>
        <h3 className="mt-4 text-lg font-semibold">Explanation:</h3>
        <p className="text-sm italic">{formula.explanation}</p>
      </div>
    </div>
  );
}
