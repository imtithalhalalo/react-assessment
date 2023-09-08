import React, { useState } from 'react';

const SearchBar = ({ data, setData }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    const filteredData = data.filter((item) => {
      return Object.values(item).some((field) =>
        String(field).toLowerCase().includes(value.toLowerCase())
      );
    });

    setData(filteredData);
  };

  return (
    <div>
      <input
        type="text"
        className="search-input"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
