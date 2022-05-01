import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import config from '../../config';




const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);


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
          {users.map(({ id, nickname }) => (
            <div key={id}>
              <Link to={`/users/${id}`}>{nickname}</Link>
            </div>
          ))}

        </>
      )}

    </section>
  );
};


export default UserList;