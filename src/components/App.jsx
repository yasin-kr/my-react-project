// src/components/App.jsx

import { Routes, Route, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import Home from './React-5/Home';
import About from './React-5/About';
import AboutMission from './React-5/AboutMission';
import AboutTeam from './React-5/AboutTeam';
import AboutVision from './React-5/AboutVision';
import Products from './React-5/Products';
import ProductDetails from './React-5/ProductDetails';
import NotFound from './React-5/NotFound';
import css from './App.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

export const App = () => {
  return (
    <div>
      <nav className={css.nav}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/about" className={buildLinkClass}>
          About
        </NavLink>
        <NavLink to="/products" className={buildLinkClass}>
          Products
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}>
          <Route path="mission" element={<AboutMission />} />
          <Route path="vision" element={<AboutVision />} />
          <Route path="team" element={<AboutTeam />} />
        </Route>
        <Route path="/products" element={<Products />} />
        <Route path="/products/:productId" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
