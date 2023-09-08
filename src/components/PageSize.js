import React from 'react';
import { useMyContext } from '../context/MyContext';

const PageSizeDropdown = () => {
  const { pageSize, setPageSize } = useMyContext();

  const handlePageSizeChange = (event) => {
    const newSize = parseInt(event.target.value);
    setPageSize(newSize); 
  };

  return (
    <div>
      <select value={pageSize} onChange={handlePageSizeChange} className="container">
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
    </div>
  );
};

export default PageSizeDropdown;
