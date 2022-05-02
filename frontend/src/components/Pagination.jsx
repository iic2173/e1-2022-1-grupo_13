import React from 'react';

const Pagination = ({ usersPerPage, totalUsers, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
            <a onClick={() => paginate(number)} key={number} className={currentPage===number ? 'active' : null}>
              {number}
            </a>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;