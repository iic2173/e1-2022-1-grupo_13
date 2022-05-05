import React, { useState } from 'react';
import config from '../../config';
import useAuth from '../../hooks/useAuth';


const CreatePing = ({user_id}) => {
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = async function handleSubmit(event) {
        setLoading(true);
        event.preventDefault();
        const requestOptions = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${currentUser?.access_token}`,
          },
          
        };
        fetch(`${config.API_URL}/api/pings/send/${user_id}`, requestOptions)
          .then((response) => {
            if (!response.ok) {
              setError(true);
              return response.text().then((message) => Promise.reject(new Error(message)));
            }
            return response.json();
          })
          .catch(() => {
            setError(true);
          })
          .finally(() => {
            setLoading(false);
            setError(false);
            setSuccess(true);
          });
      };
    
      return (
        <div id="form">
          <div className="center-div">
    
            <form onSubmit={handleSubmit}>
                <button type="submit">Pingear usuario</button>
    
              {loading && <p>Cargando...</p>}
              {error && <p>Ups! Ocurrió un error, intenta de nuevo.</p>}
              {success && <p>Usuario pingeado exitosamente :D</p>}
    
            </form>
          </div>
        </div>
      );


};

export default CreatePing;