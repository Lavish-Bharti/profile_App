import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProfileCard from '../components/ProfileCard.jsx';
import Button from '../components/Button.jsx';
import { getProfile } from '../services/api.js';

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch {
        setError('Could not load profile. Make sure the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="loader-wrap">
        <div className="spinner" />
        <p className="loader-text">Loading profile…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="loader-wrap">
        <div style={{ fontSize: 48, marginBottom: 8 }}>⚠️</div>
        <p style={{ color: 'var(--error)', fontSize: 15, textAlign: 'center', maxWidth: 360 }}>{error}</p>
      </div>
    );
  }

  return (
    <div className="page-enter" style={{ minHeight: '100vh', padding: '40px 20px' }}>
      {/* Top nav */}
      <div style={{
        maxWidth: 520,
        margin: '0 auto 32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32,
            background: 'linear-gradient(135deg, #7c6af7, #a78bfa)',
            borderRadius: 8,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, letterSpacing: '-0.01em', color: 'var(--text)' }}>
            ProfileHub
          </span>
        </div>

        <Link to="/edit">
          <Button variant="secondary" size="sm" icon={
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
              <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
            </svg>
          }>
            Edit Profile
          </Button>
        </Link>
      </div>

      {/* Profile card */}
      <ProfileCard profile={profile} />

      {/* Footer */}
      <p style={{ textAlign: 'center', color: 'var(--text-dim)', fontSize: 12, marginTop: 40, letterSpacing: '0.04em' }}>
        Built with React &amp; Node.js · ProfileHub
      </p>
    </div>
  );
}
