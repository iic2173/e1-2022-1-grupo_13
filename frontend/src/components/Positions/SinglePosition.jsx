import React, { useState, useEffect } from 'react';
import config from '../../config'
import { Deserializer } from 'jsonapi-serializer';

function SinglePosition({ position }) {
  const [pos, setPos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const lat = position.geography[0]
  const long = position.geography[1];
  
  useEffect(() =>{
    setLoading(true);
    fetch(`${config.API_URL}/api/weather/${lat}/${long}`)
    .then((response) => {
      
      if(!response.ok) {
        setError(true);
        return [];
      }
      return response.json();
    })
    .then(
      (data) => new Deserializer({ keyForAttribute: 'camelCase' }).deserialize(
        data,
        (_error, posData) => setPos(posData),
      ),
    )
    .catch(() => setError(true))
    .finally(() => {
      setLoading(false);
    });
  }, [lat, long]);

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
            <li>
              <h4>{position.title}</h4>
              <p>Ubicación Geografica: ({lat}, {long})</p>
              <p>Comuna/Ciudad en la que se encuentra: {pos?.name}</p>
              <p>País en el que se encuentra: {pos?.sys?.country}</p>
              <p>Temperatura Actual de la posición: {pos?.main?.temp}°C</p>
            </li>
          </div>
  )}</div>
    
  );
}

export default SinglePosition;