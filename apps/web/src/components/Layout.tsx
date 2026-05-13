import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Marquee } from './Marquee';
import { useAuthStore } from '../store';

export function Layout() {
  const { token, user, logout } = useAuthStore();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <NavLink to="/" className="brand">
            <div className="brand-word">GROOVEBOX</div>
            <div className="brand-tag">The beat of<br />your shelf</div>
          </NavLink>

          <nav className="nav">
            {token && (
              <>
                <NavLink to="/collection" className={({ isActive }) => isActive ? 'active' : ''}>
                  Collection
                </NavLink>
                <NavLink to="/wishlist" className={({ isActive }) => isActive ? 'active' : ''}>
                  Wishlist
                </NavLink>
                <NavLink to="/stats" className={({ isActive }) => isActive ? 'active' : ''}>
                  Stats
                </NavLink>
              </>
            )}
          </nav>

          <div className="topbar-meta">
            <div className="sub" style={{ gap: 12 }}>
              {token && user ? (
                <>
                  <span style={{ fontWeight: 600 }}>{user.username}</span>
                  <button
                    onClick={handleLogout}
                    style={{
                      background: 'rgba(255,255,255,0.2)', border: 'none', color: 'inherit',
                      fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 12,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '4px 10px', cursor: 'pointer',
                    }}
                  >
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <NavLink
                    to="/login"
                    style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600, fontSize: 13, letterSpacing: '0.1em', textTransform: 'uppercase' }}
                  >
                    Log in
                  </NavLink>
                  <NavLink
                    to="/register"
                    style={{
                      background: 'rgba(255,255,255,0.2)', color: 'inherit', textDecoration: 'none',
                      fontFamily: 'Inter, sans-serif', fontWeight: 700, fontSize: 12,
                      letterSpacing: '0.1em', textTransform: 'uppercase',
                      padding: '6px 12px',
                    }}
                  >
                    Register
                  </NavLink>
                </>
              )}
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
