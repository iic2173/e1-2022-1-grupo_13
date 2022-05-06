import React from 'react';
import SinglePosition from './SinglePosition';


function Positions({positions}) {  
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