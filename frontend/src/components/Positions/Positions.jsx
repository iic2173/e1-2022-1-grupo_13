import React from 'react';
import SinglePosition from './SinglePosition';

const positions = [{
  positionId: 1,
  title: 'posicion 1',
  userId: 1
  },
  {
    positionId: 2,
    title: 'posicion 2',
    userId: 2
    
  },
  {
    positionId: 3,
    title: 'posicion 3',
    userId: 3
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