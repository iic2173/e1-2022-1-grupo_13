import { Link, useParams } from 'react-router-dom';
import CreatePing from '../../components/Pings/CreatePing';
import UserPings from '../../components/Pings/UserPings';
import Locations from '../../components/Positions/Positions';
import useAuth from '../../hooks/useAuth';
import React, { useState, useEffect } from 'react';
import config from '../../config';
import { Deserializer } from 'jsonapi-serializer';
import PositionIndex from '../../components/Positions/PositionIndex';


const UserDetail = () => {
    const { id } = useParams();
    const { currentUser } = useAuth();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch(`${config.API_URL}/api/users/${id}`, {
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
          .then(
            (data) => new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(
              data,
              (_error, userData) => setUser(userData),
            ),
          )
          .catch(() => setError(true))
          .finally(() => setLoading(false));
      }, []);
    
      if (loading) {
        return (
          <section id="container">
            <div className="container">
              <h2>Cargando...</h2>
            </div>
          </section>
        );
      }
    return(
        <div>

            {error ? (
                <h2>Error</h2>
              ) : (
                  
                  <section className="container">
                      <Link to='/'>Inicio</Link>
                      <h2>{`Usuario ${user?.nickname}`}</h2>
                      <PositionIndex />
                      {(id===String(currentUser.id)) ? (
                      <UserPings />) : (
                      <CreatePing user_id={id} />
                      )} 
                      
          
          
                  </section>
                
        
        )}
        </div>)


};

export default UserDetail;