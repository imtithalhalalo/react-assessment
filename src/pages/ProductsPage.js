import React, { useEffect, useRef, useState } from 'react';
import Pagination from '../components/Pagination';
import { useMyContext } from '../context/MyContext';
import DataTable from '../DataTable';
import axios from 'axios';

const ProductsPage = () => {
  const { apiData, loading, pageSize, currentPage, setCurrentPage, setApiData } = useMyContext();
  const [activeFilter, setActiveFilter] = useState(''); 
  const [titleFilter, setTitleFilter] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');

  const productHeaders = [ 
    { key: 'title', value: 'Title', },
    { key: 'category', value: 'Category', },
    { key: 'brand', value: 'Brand', },
  ];

  const totalProductsPages = apiData.products.length;

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setActiveFilter(name); 
    switch (name) {
      case 'title':
        setTitleFilter(value);
        setBrandFilter('');
        setCategoryFilter('');
        break;
      case 'brand':
        setTitleFilter('');
        setBrandFilter(value);
        setCategoryFilter('');
        break;
      case 'category':
        setTitleFilter('');
        setBrandFilter('');
        setCategoryFilter(value);
        break;
      default:
        break;
    }
  };

  const apiDataRef = useRef(); 

  useEffect(() => {
    apiDataRef.current = apiData; 
  }, [apiData]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentApiData = apiDataRef.current; 

        const apiUrl = `https://dummyjson.com/products/filter?key=${activeFilter}&value=${encodeURIComponent(
          activeFilter === 'title'
            ? titleFilter
            : activeFilter === 'brand'
            ? brandFilter
            : categoryFilter
        )}`;

        const response = await axios.get(apiUrl);

        const filteredUsers = response.data.products;
        

        if (currentApiData === apiDataRef.current) {
          setApiData((prevData) => ({ ...prevData, products: filteredUsers }));
        }
      } catch (error) {
        console.error('Error fetching filtered data:', error);
      }
    };

    fetchData();
  }, [pageSize, activeFilter, titleFilter, categoryFilter, brandFilter]);

  const filters = () => (
    <div className='flex'>
      <input
        type="text"
        name="title"
        className='container'
        value={titleFilter}
        onChange={handleFilterChange}
        placeholder="Title"
      />
      <input
        type="text"
        className='container'
        name="brand"
        value={brandFilter}
        onChange={handleFilterChange}
        placeholder="Brand"
      />
      <input
        type="text"
        className='container'
        name="category"
        value={categoryFilter}
        onChange={handleFilterChange}
        placeholder="Category"
      />
    </div>
)
  return (
    <div>
      {loading.products ? (
        <p>Loading...</p>
      ) : (
        <>
          <DataTable
            filters={filters}
            data={apiData.products.slice((currentPage - 1) * pageSize, currentPage * pageSize)}
            headers={productHeaders}
          />
          <Pagination
            pageSize={pageSize}
            currentPage={currentPage}
            totalPages={totalProductsPages}
            onPageChange={handlePageChange}
          />
        </>
      )}
    </div>
  );
};

export default ProductsPage;
