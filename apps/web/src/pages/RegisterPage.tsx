import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store';
import { api } from '../api/client';

interface AuthResponse {
  token: string;
  user: { id: string; email: string; username: string };
}

export function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post<AuthResponse>('/api/auth/register', { email, password, username });
      setAuth(res.token, res.user);
      navigate('/collection');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 1440, margin: '0 auto', padding: '80px 40px', display: 'grid', gridTemplateColumns: '1fr 480px', gap: 80, alignItems: 'start' }}>
      {/* Left — editorial copy */}
      <div>
        <h1 style={{ fontFamily: 'Archivo Black, system-ui', fontSize: 'clamp(40px, 5vw, 72px)', lineHeight: 0.85, letterSpacing: '-0.035em', textTransform: 'uppercase', margin: 0 }}>
          Start your<br /><em style={{ fontStyle: 'normal', color: 'var(--primary)' }}>collection.</em>
        </h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 17, lineHeight: 1.6, color: 'var(--ink-soft)', fontStyle: 'italic', maxWidth: 420, marginTop: 24 }}>
          Create an account to start cataloguing your vinyl records and tracking your collection.
        </p>
        <NavLink
          to="/login"
          style={{ display: 'inline-block', marginTop: 32, fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-soft)', textDecoration: 'underline' }}
        >
          Already have an account? Log in →
        </NavLink>
      </div>

      {/* Right — form */}
      <form onSubmit={handleSubmit} style={{ borderTop: '3px solid var(--ink)', paddingTop: 32, display: 'flex', flexDirection: 'column', gap: 0 }}>
        <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--ink-faint)', marginBottom: 24 }}>
          Create account
        </div>

        <Field label="Username" type="text" value={username} onChange={setUsername} placeholder="yourname" autoComplete="username" />
        <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" autoComplete="email" />
        <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" autoComplete="new-password" />

        {error && (
          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: 11, color: 'var(--primary)', letterSpacing: '0.06em', padding: '10px 0', borderTop: '1px solid var(--primary)' }}>
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary"
          style={{ marginTop: 24, width: '100%', padding: '18px', fontSize: 15, opacity: loading ? 0.7 : 1 }}
        >
          {loading ? '…' : 'Create account'}
        </button>
      </form>
    </div>
  );
}

function Field({ label, type, value, onChange, placeholder, autoComplete }: {
  label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string; autoComplete?: string;
}) {
  return (
    <div style={{ borderBottom: '1px solid var(--ink)', marginBottom: 0 }}>
      <label style={{ display: 'block', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ink-faint)', paddingTop: 16 }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        style={{ display: 'block', width: '100%', border: 0, outline: 0, background: 'transparent', fontFamily: 'Inter, sans-serif', fontWeight: 600, fontSize: 20, padding: '10px 0 16px', color: 'var(--ink)', letterSpacing: '-0.01em' }}
      />
    </div>
  );
}
