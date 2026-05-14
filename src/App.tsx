import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './pages/NavBar';
import List from './pages/List';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Details from './pages/Details';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app-wrapper bg-light min-vh-100">
        <NavBar />

        <main className="container py-4">
          <Routes>
            <Route path="/" element={<Navigate to="/list" />} />
            
            <Route path="/list" element={<List />} />
            <Route path="/create" element={<Create />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/edit/:id" element={<Edit />} />
            
            <Route path="*" element={<div className="text-center mt-5">404 - Page Not Found</div>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;