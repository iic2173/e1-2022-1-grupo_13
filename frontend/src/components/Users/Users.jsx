import React from 'react';
import { Link } from 'react-router-dom';

const Users = ({ users, loading }) => {
  if (loading) {
    return <h2>Cargando...</h2>;
  }

  return (
    <div >
      {users.map(user => (
        <div key={user.id} >
          <Link to={`/users/${user.id}`}>{user.nickname}</Link>
        </div>
      ))}
    </div>
    
  );
};

export default Users;