import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from '../../config';
import useAuth from '../../hooks/useAuth';

const UserPings = function UserPings({}) {
    const { currentUser } = useAuth();
    const [pings, setPings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
  
    useEffect(() => {
      setLoading(true);
      fetch(`${config.API_URL}/api/pings/recieved`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${currentUser?.access_token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            setError(true);
            return null;
          }
          return response.json();
        })
        .then(setPings)
        .catch(() => setError(true))
        .finally(() => {
          setLoading(false);
          setError(false);
        });
    }, []);
  
    if (loading) {
      return (
        <section id="container">
          <div className="mainsection">
            <h2>Cargando...</h2>
          </div>
        </section>
      );
    }
    return (
        <div>
        {error ? (
            <h2>Error</h2>
          ) : (
              
              
              
              <div>
                  <h2>Pings recibidos:</h2>

                  <div>
                    {pings.map(ping => (
                        <div key={ping?.id}> 
                            <p>Enviador: <Link to={`/users/${ping.userId}`}>usuario {`${ping?.userId}`}</Link></p>
                            
                        </div>
                    ))}
                  </div>
              </div>
    )}</div>)
};

export default UserPings;