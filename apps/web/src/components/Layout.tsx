import { NavLink, Outlet } from 'react-router-dom';
import { Marquee } from './Marquee';

export function Layout() {
  const today = new Date();
  const day = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' }).toUpperCase();
  const year = today.getFullYear();

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <NavLink to="/" className="brand">
            <div className="brand-word">GROOVEBOX</div>
            <div className="brand-tag">The beat of<br />your shelf</div>
          </NavLink>

          <nav className="nav">
            {[
              { to: '/', label: 'Home', end: true },
              { to: '/collection', label: 'Collection' },
              { to: '/wishlist', label: 'Wishlist' },
              { to: '/stats', label: 'Stats' },
            ].map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="topbar-meta">
            <div className="row">
              <span>{day}</span>
              <span className="sep" />
              <span>{year}</span>
            </div>
            <div className="sub">
              <span>33⅓ RPM</span>
              <span className="globe" aria-hidden="true" />
            </div>
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <Marquee />
    </>
  );
}
