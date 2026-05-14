import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './pages/NavBar';
import List from './pages/List';
import Create from './pages/Create';
import Edit from './pages/Edit';
import Details from './pages/Details';

const App: React.FC = () => {
  return (
    <Router basename="/student-information-system">
      <div className="app-wrapper bg-light min-vh-100">
        <NavBar />

        <main className="container py-4">
          <Routes>
            {/* Redirect root to the list registry */}
            <Route path="/" element={<Navigate to="/list" />} />
            
            <Route path="/list" element={<List />} />
            <Route path="/create" element={<Create />} />
            <Route path="/details/:id" element={<Details />} />
            <Route path="/edit/:id" element={<Edit />} />
            
            {/* Custom 404 message for invalid internal routes */}
            <Route path="*" element={
              <div className="text-center mt-5">
                <h3 className="fw-bold">404</h3>
                <p className="text-muted">The record or page you are looking for does not exist.</p>
              </div>
            } />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;