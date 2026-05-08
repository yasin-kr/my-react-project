import { NavLink, Outlet } from 'react-router-dom';
import clsx from 'clsx';
import css from '../App.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active);
};

const About = () => {
  return (
    <main>
      <h1>About</h1>
      <p>
        Bu sayfa nested route ornegidir. Asagidaki linkler About sayfasinin
        icinde farkli alt icerikleri gosterir.
      </p>

      <nav className={css.subNav}>
        <NavLink to="mission" className={buildLinkClass}>
          Misyon
        </NavLink>
        <NavLink to="vision" className={buildLinkClass}>
          Vizyon
        </NavLink>
        <NavLink to="team" className={buildLinkClass}>
          Ekip
        </NavLink>
      </nav>

      <Outlet />
    </main>
  );
};

export default About;
