import React, { useState } from 'react';

const SOCIALS = [
  {
    key: 'linkedin',
    label: 'LinkedIn',
    color: '#0A66C2',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
        <circle cx="4" cy="4" r="2"/>
      </svg>
    ),
  },
  {
    key: 'instagram',
    label: 'Instagram',
    color: '#E1306C',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
        <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"/>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
      </svg>
    ),
  },
  {
    key: 'github',
    label: 'GitHub',
    color: '#e0deff',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
      </svg>
    ),
  },
];

export default function SocialLinks({ profile, compact = false }) {
  const [hovered, setHovered] = useState(null);

  if (compact) {
    return (
      <div style={{ display: 'flex', gap: '10px' }}>
        {SOCIALS.map(({ key, label, icon, color }) =>
          profile[key] ? (
            <a
              key={key}
              href={profile[key]}
              target="_blank"
              rel="noopener noreferrer"
              title={label}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                borderRadius: '10px',
                background: hovered === key ? `${color}20` : 'rgba(255,255,255,0.05)',
                border: `1px solid ${hovered === key ? `${color}50` : 'rgba(255,255,255,0.08)'}`,
                color: hovered === key ? color : 'var(--text-muted)',
                transition: 'all 0.2s',
                transform: hovered === key ? 'translateY(-2px)' : 'none',
              }}
              onMouseEnter={() => setHovered(key)}
              onMouseLeave={() => setHovered(null)}
            >
              {icon}
            </a>
          ) : null
        )}
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {SOCIALS.map(({ key, label, icon, color }) =>
        profile[key] ? (
          <a
            key={key}
            href={profile[key]}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              padding: '12px 16px',
              borderRadius: '10px',
              background: hovered === key ? `${color}12` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${hovered === key ? `${color}35` : 'rgba(255,255,255,0.07)'}`,
              color: hovered === key ? color : 'var(--text-muted)',
              fontSize: '14px',
              fontWeight: 500,
              transition: 'all 0.2s',
              transform: hovered === key ? 'translateX(4px)' : 'none',
            }}
            onMouseEnter={() => setHovered(key)}
            onMouseLeave={() => setHovered(null)}
          >
            <span style={{ display: 'flex', flexShrink: 0 }}>{icon}</span>
            <span style={{ flex: 1 }}>{label}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.5 }}>
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </a>
        ) : null
      )}
    </div>
  );
}
