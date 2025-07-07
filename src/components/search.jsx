import { FiSearch } from 'react-icons/fi';
import { useState } from 'react';
import '../App.css';

function Search({ onSearch }) {
  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <div className="search-bar">
      <span className="search-icon"><FiSearch /></span>
      <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search through 300+ movies online"
      />
    </div>
  );
}

export default Search;
