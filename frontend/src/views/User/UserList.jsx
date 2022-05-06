import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import config from '../../config';
import Users from '../../components/Users/Users';
import Pagination from '../../components/Pagination';




const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(4);


  useEffect(() => {
    setLoading(true);
    fetch(`${config.API_URL}/api/users`)
      .then((response) => {
        if (!response.ok) {
          setError(true);
          return [];
        }
        return response.json();
      })
      .then(setUsers)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);


  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
     

  return (
    <section className="container">
      <Link to="/">Inicio</Link>
      {error ? (
        <h2>Error</h2>
      ) : (
        <>
         <Users users={currentUsers} loading={loading} />
         <Pagination
            usersPerPage={usersPerPage}
            totalUsers={users.length}
            paginate={paginate}
            currentPage={currentPage}
        />
        </>
      )}

    </section>
  );
};


export default UserList;