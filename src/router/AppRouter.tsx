import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/index';
import Main from '../pages/main';
import Eventdetail from '../pages/eventdetail';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/eventdetail/:id" element={<Eventdetail />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../pages/index';
import Main from '../pages/main';
import Eventdetail from '../pages/eventdetail';

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/main" element={<Main />} />
        <Route path="/eventdetail/:id" element={<Eventdetail />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;
