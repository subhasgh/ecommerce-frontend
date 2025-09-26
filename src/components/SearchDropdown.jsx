// src/components/SearchDropdown.jsx
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchDropdown() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  // Debounced API call
  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTerm.trim()) {
        fetch(`/api/search?query=${encodeURIComponent(searchTerm)}`)
          .then(res => res.json())
          .then(data => setSearchResults(data));
      } else {
        setSearchResults([]);
      }
    }, 250);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  return (
    <div className="relative">
      <button
        onClick={() => setShowSearch(!showSearch)}
        className="focus:outline-none text-xl"
        title="Search"
      >
        🔍
      </button>

      {showSearch && (
        <div className="absolute right-0 mt-2 w-72 bg-white border rounded shadow-lg z-50">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search products, offers, pages..."
            className="w-full px-3 py-2 border-b outline-none"
            autoFocus
          />
          {searchResults.length > 0 && (
            <ul className="max-h-64 overflow-y-auto">
              {searchResults.map((item) => (
                <li
                  key={`${item.type}-${item.id || item.path}`}
                  onClick={() => {
                    navigate(item.path);
                    setShowSearch(false);
                    setSearchTerm("");
                  }}
                  className="px-3 py-2 hover:bg-gray-100 cursor-pointer flex justify-between text-sm"
                >
                  <span>{item.name}</span>
                  <span className="text-gray-400">{item.type}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};


