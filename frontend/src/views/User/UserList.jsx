import { Link } from 'react-router-dom';
import PaginatedItems from '../../components/Users/UsersPaginate';
import React, { useState, useEffect } from 'react';




const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
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

  if (loading) {
    return (
      <section className="container">
        <h2>Cargando...</h2>
      </section>
    );
  }

  return (
    <section className="container">
      <Link to="/">Inicio</Link>
      {error ? (
        <h2>Error</h2>
      ) : (
        <>
          <h2>Users</h2>
          {users.map(({ id, name }) => (
            <div key={id}>
              <Link to={`/users/${id}`}>{name}</Link>
            </div>
          ))}
          <PaginatedItems itemsPerPage={4} items={users} />

        </>
      )}

    </section>
  );
};


export default UserList;