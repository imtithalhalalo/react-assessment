import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const MyContext = createContext();

export function useMyContext() {
  return useContext(MyContext);
}

export function MyContextProvider({ children }) {
  const [apiData, setApiData] = useState({ users: [], products: [] });
  const [loading, setLoading] = useState({ users: true, products: true });
  const [pageSize, setPageSize] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading((prevLoading) => ({ ...prevLoading, users: true, products: true }));

        const usersResponse = await axios.get(`https://dummyjson.com/users?limit=${pageSize}`);
        const usersData = usersResponse.data.users;

        const productsResponse = await axios.get(`https://dummyjson.com/products?limit=${pageSize}`);
        const productsData = productsResponse.data.products;

        setApiData((prevData) => ({ ...prevData, users: usersData, products: productsData }));

        setLoading((prevLoading) => ({ ...prevLoading, users: false, products: false }));
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading((prevLoading) => ({ ...prevLoading, users: false, products: false }));
      }
    };

    fetchData();
  }, [pageSize]);

  return (
    <MyContext.Provider value={{ apiData, loading, pageSize, setPageSize, currentPage, setCurrentPage, setApiData }}>
      {children}
    </MyContext.Provider>
  );
}
