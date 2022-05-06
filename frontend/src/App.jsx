import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import UserList from './views/User/UserList';
import UserDetail from './views/User/UserDetail';
import Login from './views/Login';
import Register from './views/Register';
import AuthContextProvider from './contexts/AuthContext';
import ComparePositions from './views/Map/ComparePositions';
import UserPositionsList from './views/User/UserPositionsList';

function App() {
  return (
    <BrowserRouter>
    <AuthContextProvider>
      <Navbar />
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path='login' element={<Login/>}/>
          <Route path='register' element={<Register/>}/>
          <Route path='users' element={<UserList />} />
          <Route path='users/:id' element={<UserDetail />} />
          <Route path='map/compare' element={<ComparePositions />} />
          <Route path='map/user' element={<UserPositionsList />} />
        </Routes>
      </main>
      </AuthContextProvider>
    </BrowserRouter>

  );
}

export default App;
