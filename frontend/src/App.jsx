import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import UserList from './views/User/UserList';
import UserDetail from './views/User/UserDetail';



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path='users' element={<UserList />} />
          <Route path='users/:id' element={<UserDetail />} />
        </Routes>
      </main>
    </BrowserRouter>

  );
}

export default App;
