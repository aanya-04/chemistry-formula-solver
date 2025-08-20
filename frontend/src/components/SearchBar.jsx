import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

export default function SearchBar({ onSearch }) {
  const [term, setTerm] = useState("");

  return (
    <div className="flex items-center gap-2 max-w-md mx-auto">
      <input
        type="text"
        className="flex-1 p-3 border rounded-l shadow"
        placeholder="Search formula (e.g. water)"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSearch(term)}
      />
      <button
        className="bg-blue-600 p-3 text-white rounded-r hover:bg-blue-700"
        onClick={() => onSearch(term)}
      >
        <FaSearch />
      </button>
    </div>
  );
}
