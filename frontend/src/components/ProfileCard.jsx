import React from 'react';
import Button from './Button.jsx';
import SocialLinks from './SocialLinks.jsx';

function getInitials(name = '') {
  return name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2);
}

function InfoRow({ icon, value, href, target }) {
  const inner = (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      padding: '10px 14px',
      borderRadius: '10px',
      background: 'rgba(255,255,255,0.04)',
      border: '1px solid rgba(255,255,255,0.07)',
      color: 'var(--text)',
      fontSize: '14px',
      transition: href ? 'background 0.2s' : undefined,
    }}>
      <span style={{ color: 'var(--text-muted)', display: 'flex', flexShrink: 0 }}>{icon}</span>
      <span style={{ wordBreak: 'break-word' }}>{value}</span>
    </div>
  );

  if (href) {
    return (
      <a href={href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        style={{ textDecoration: 'none' }}
        onMouseEnter={e => e.currentTarget.firstChild.style.background = 'rgba(124,106,247,0.1)'}
        onMouseLeave={e => e.currentTarget.firstChild.style.background = 'rgba(255,255,255,0.04)'}
      >
        {inner}
      </a>
    );
  }
  return inner;
}

export default function ProfileCard({ profile }) {
  const cardStyle = {
    background: 'rgba(19,19,26,0.8)',
    backdropFilter: 'blur(30px)',
    WebkitBackdropFilter: 'blur(30px)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '24px',
    overflow: 'hidden',
    maxWidth: 480,
    width: '100%',
    margin: '0 auto',
    boxShadow: '0 32px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.04) inset',
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, rgba(124,106,247,0.15) 0%, rgba(167,139,250,0.08) 100%)',
    borderBottom: '1px solid rgba(255,255,255,0.06)',
    padding: '36px 32px 28px',
    textAlign: 'center',
    position: 'relative',
  };

  const avatarStyle = {
    width: 96,
    height: 96,
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #7c6af7 0%, #a78bfa 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '32px',
    fontWeight: 700,
    fontFamily: 'var(--font-display)',
    color: '#fff',
    margin: '0 auto 16px',
    boxShadow: '0 0 0 4px rgba(124,106,247,0.2), 0 8px 32px rgba(124,106,247,0.3)',
    letterSpacing: '-0.02em',
  };

  const bodyStyle = {
    padding: '28px 32px 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  };

  const actionRowStyle = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  };

  return (
    <div style={cardStyle}>
      {/* Header */}
      <div style={headerStyle}>
        {/* Glow orb */}
        <div style={{
          position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
          width: 200, height: 200,
          background: 'radial-gradient(circle, rgba(124,106,247,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        <div style={avatarStyle}>
          {profile.avatar
            ? <img src={profile.avatar} alt={profile.name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
            : getInitials(profile.name)
          }
        </div>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '22px',
          fontWeight: 700,
          color: 'var(--text)',
          marginBottom: 6,
          letterSpacing: '-0.02em',
        }}>
          {profile.name}
        </h1>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          background: 'rgba(124,106,247,0.15)',
          border: '1px solid rgba(124,106,247,0.3)',
          borderRadius: 99,
          padding: '4px 14px',
          fontSize: '12px',
          fontWeight: 600,
          color: 'var(--accent2)',
          letterSpacing: '0.04em',
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent2)', display: 'inline-block' }}/>
          {profile.title}
        </div>
      </div>

      {/* Body */}
      <div style={bodyStyle}>
        {/* About */}
        {profile.description && (
          <div>
            <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 8 }}>About</p>
            <p style={{ fontSize: '14px', lineHeight: '1.7', color: 'rgba(240,238,255,0.75)' }}>
              {profile.description}
            </p>
          </div>
        )}

        {/* Contact info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Contact</p>
          {profile.phone && (
            <InfoRow
              href={`tel:${profile.phone}`}
              value={profile.phone}
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.18 19.79 19.79 0 01.12 4.5a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 9.9a16 16 0 006.18 6.18l1.46-1.46a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>}
            />
          )}
          {profile.email && (
            <InfoRow
              href={`mailto:${profile.email}`}
              value={profile.email}
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
            />
          )}
          {profile.location && (
            <InfoRow
              value={profile.location}
              icon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>}
            />
          )}
        </div>

        {/* Quick actions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 4 }}>Quick Actions</p>
          <div style={actionRowStyle}>
            <Button
              variant="primary"
              href={`tel:${profile.phone}`}
              icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.18 19.79 19.79 0 01.12 4.5a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 9.9a16 16 0 006.18 6.18l1.46-1.46a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>}
              fullWidth
            >
              Call
            </Button>
            <Button
              variant="secondary"
              href={`mailto:${profile.email}`}
              icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>}
              fullWidth
            >
              Email
            </Button>
          </div>
          {profile.github && (
            <Button
              variant="ghost"
              href={profile.github}
              target="_blank"
              icon={<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>}
              fullWidth
            >
              Open GitHub
            </Button>
          )}
        </div>

        {/* Social links */}
        <div>
          <p style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12 }}>Social Profiles</p>
          <SocialLinks profile={profile} />
        </div>
      </div>
    </div>
  );
}
