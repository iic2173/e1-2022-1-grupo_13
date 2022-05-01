
   
import React from 'react';

function SinglePosition({ position }) {
  return (
    <li>
      <h3>{position.title}</h3>
      <p>{position.userId}</p>
    </li>
  );
}

export default SinglePosition;