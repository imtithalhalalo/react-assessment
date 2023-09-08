import React, { useEffect, useState, useRef } from 'react';
import Pagination from '../components/Pagination';
import { useMyContext } from '../context/MyContext';
import DataTable from '../DataTable';
import axios from 'axios';

const UsersPage = () => {
  const { apiData, loading, pageSize, currentPage, setCurrentPage, setApiData } = useMyContext();
  const [activeFilter, setActiveFilter] = useState(''); 
  const [nameFilter, setNameFilter] = useState('');
  const [emailFilter, setEmailFilter] = useState('');
  const [ageFilter, setAgeFilter] = useState('');
  const [genderFilter, setGenderFilter] = useState('');

  const userHeaders = [ 
    { key: 'firstName', value: 'First Name', },
    { key: 'lastName', value: 'Last Name', },
    { key: 'maidenName', value: 'Maiden Name', },
    { key: 'age', value: 'Age', },
    { key: 'gender', value: 'Gender', },
    { key: 'email', value: 'Email', },
    { key: 'username', value: 'Username', },
    { key: 'bloodGroup', value: 'Blood Group', },
    { key: 'eyeColor', value: 'Eye Color', },
  ];
  const [totalPages, setTotalPages] = useState(0);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.example.com/users?page=${currentPage}`);
        setUserData(response.data.users);
        setTotalPages(response.data.totalPages);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setActiveFilter(name); 
    switch (name) {
      case 'name':
        setNameFilter(value);
        setEmailFilter('');
        setAgeFilter('');
        setGenderFilter('');
        break;
      case 'email':
        setNameFilter('');
        setEmailFilter(value);
        setAgeFilter('');
        setGenderFilter('');
        break;
      case 'age':
        setNameFilter('');
        setEmailFilter('');
        setAgeFilter(value);
        setGenderFilter('');
        break;
      case 'gender':
        setNameFilter('');
        setEmailFilter('');
        setAgeFilter('');
        setGenderFilter(value);
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

        const apiUrl = `https://dummyjson.com/users/filter?key=${activeFilter}&value=${encodeURIComponent(
          activeFilter === 'name'
            ? nameFilter
            : activeFilter === 'email'
            ? emailFilter
            : activeFilter === 'age'
            ? ageFilter
            : genderFilter
        )}`;

        const response = await axios.get(apiUrl);

        const filteredUsers = response.data.users;
        

        if (currentApiData === apiDataRef.current) {
          setApiData((prevData) => ({ ...prevData, users: filteredUsers }));
        }
      } catch (error) {
        console.error('Error fetching filtered data:', error);
      }
    };

    fetchData();
  }, [pageSize, activeFilter, nameFilter, emailFilter, ageFilter, genderFilter, setApiData]);

  const filters = () => (
        <div className='flex'>
          <input
            type="text"
            name="name"
            className='container'
            value={nameFilter}
            onChange={handleFilterChange}
            placeholder="Name"
          />
          <input
            type="text"
            className='container'
            name="email"
            value={emailFilter}
            onChange={handleFilterChange}
            placeholder="Email"
          />
          <input
            type="text"
            name="age"
            className='container'
            value={ageFilter}
            onChange={handleFilterChange}
            placeholder="Age"
          />
          <input
            type="text"
            name="gender"
            className='container'
            value={genderFilter}
            onChange={handleFilterChange}
            placeholder="Gender"
          />
        </div>
  )
  return (
    <div>
      {loading.users ? (
        <p>Loading...</p>
      ) : (
        <>
          <DataTable
            filters={filters}
            data={apiData.users}
            headers={userHeaders}
          />
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages} 
            onPageChange={handlePageChange} 
          />
        </>
      )}
    </div>
  );
};

export default UsersPage;



