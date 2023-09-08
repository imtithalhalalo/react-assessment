import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SearchBar from './components/SearchBar';
import SearchIcon from './components/SearchIcon';
import PageSizeDropdown from './components/PageSize';

const DataTable = ({ filters, data, headers }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);

  const updateFilteredData = (newData) => {
    setFilteredData(newData);
  };
  const toggleSearchBar = () => {
    setSearchBarVisible(!isSearchBarVisible);
  };

  const JSX = filters();

  return (
    <>
    <div style={{ margin: 30 }}>
      <div className="search-bar-container">
      <PageSizeDropdown />
      <div className='text'>Entries</div>
        {isSearchBarVisible ? (
          <SearchBar data={data} setData={updateFilteredData} />
        ) : (
            <SearchIcon onClick={toggleSearchBar} />
        )}
        {JSX}
      </div>
      
        <table className="custom-table">
        <thead>
          <tr>
            {headers.map((header) => (
              <th key={header} className="header-cell">
                {header.value.toUpperCase()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {
            filteredData.map((item, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header} className="data-cell">
                    {item[header.key]}
                  </td>
                ))}  
              </tr>
            ))
          }
        </tbody>
      </table>
      </div>
       
    </>
    
  );
};

DataTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default DataTable;
