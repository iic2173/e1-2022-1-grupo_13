import React from 'react';
import SinglePosition from './SinglePosition';

const positions = [{
  positionId: 1,
  title: 'My university',
  userId: 1,
  lat: -33.498532,
  long: -70.614023
  },
  {
    positionId: 2,
    title: 'Sanctum Sanctorum',
    userId: 2,   
    lat: 40.71598,
    long: -74.002881
  },
  {
    positionId: 3,
    title: 'Piramides de Giza',
    userId: 3,
    lat: 30.00944,
    long: 31.20861
  }];

function Positions() {  
  return (
    <div>
      <ul className="positions">
        {positions.map((position) => (
          <SinglePosition key={position.positionId} position={position} />
        ))}
      </ul>
    </div>
    
  );
}

export default Positions;