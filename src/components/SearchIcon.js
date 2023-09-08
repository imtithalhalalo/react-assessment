import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchIcon = ({ onClick }) => {
  return (
    <div className="search-icon" onClick={onClick}>
      <FontAwesomeIcon icon={faSearch} />
    </div>
  );
};

export default SearchIcon;
