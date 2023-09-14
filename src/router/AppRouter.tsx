import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/index';
import Main from '../pages/main';
import Scanevent from '../pages/scan';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/scan/:id" element={<Scanevent />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;