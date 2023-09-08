import React from 'react';
import { useMyContext } from '../context/MyContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Pagination = () => {
  const { apiData, pageSize, setPageSize } = useMyContext();
  const totalItems = apiData.users.length; 

  const generatePageNumbers = () => {
    const pageNumbers = [];
    let startPage = 1;
    let endPage = pageSize;

    while (endPage <= totalItems) {
      pageNumbers.push({ start: startPage, end: endPage });
      startPage += pageSize;
      endPage += pageSize;
    }

    if (startPage <= totalItems) {
      pageNumbers.push({ start: startPage, end: totalItems });
    }

    return pageNumbers;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <div className="pagination-container">
      <div className="pagination-buttons">
        <button
          onClick={() => setPageSize(pageSize - 1)}
          disabled={pageSize === 5}
        >
         <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        
      
        <div className="page-numbers">
          {pageNumbers.map((page, index) => (
            <div
              key={index}
              onClick={() => setPageSize(page.start)}
              className={pageSize >= page.start && pageSize <= page.end ? 'active' : ''}
            >
              {Array.from({ length: page.end - page.start + 1 }, (_, i) => (
                <button key={i}>{page.start + i}</button>
              ))}
            </div>
          ))}
        </div>
      <button onClick={() => setPageSize(pageSize + 1) }>
          <FontAwesomeIcon icon={faArrowRight} />
      </button>
      </div>
    </div>
  );
};

export default Pagination;
