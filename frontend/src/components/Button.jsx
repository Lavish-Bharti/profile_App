import React from 'react';

const variantStyles = {
  primary: {
    background: 'linear-gradient(135deg, #7c6af7 0%, #a78bfa 100%)',
    color: '#fff',
    border: 'none',
    boxShadow: '0 4px 24px rgba(124,106,247,0.35)',
  },
  secondary: {
    background: 'rgba(255,255,255,0.05)',
    color: '#f0eeff',
    border: '1px solid rgba(255,255,255,0.1)',
    boxShadow: 'none',
  },
  ghost: {
    background: 'transparent',
    color: '#a78bfa',
    border: '1px solid rgba(124,106,247,0.35)',
    boxShadow: 'none',
  },
  danger: {
    background: 'rgba(248,113,113,0.12)',
    color: '#f87171',
    border: '1px solid rgba(248,113,113,0.25)',
    boxShadow: 'none',
  },
};

export default function Button({
  children,
  variant = 'primary',
  onClick,
  href,
  target,
  disabled = false,
  fullWidth = false,
  size = 'md',
  icon,
  style: extraStyle = {},
}) {
  const sizeStyles = {
    sm: { padding: '8px 16px', fontSize: '13px', borderRadius: '8px' },
    md: { padding: '12px 22px', fontSize: '14px', borderRadius: '10px' },
    lg: { padding: '14px 28px', fontSize: '15px', borderRadius: '12px' },
  };

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: 600,
    letterSpacing: '0.01em',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s cubic-bezier(0.4,0,0.2,1)',
    width: fullWidth ? '100%' : undefined,
    fontFamily: 'var(--font-body)',
    whiteSpace: 'nowrap',
    ...variantStyles[variant],
    ...sizeStyles[size],
    ...extraStyle,
  };

  const handleMouseEnter = (e) => {
    if (disabled) return;
    e.currentTarget.style.transform = 'translateY(-2px)';
    if (variant === 'primary') {
      e.currentTarget.style.boxShadow = '0 8px 32px rgba(124,106,247,0.5)';
    }
  };

  const handleMouseLeave = (e) => {
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = variantStyles[variant].boxShadow || 'none';
  };

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        style={base}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
        {children}
      </a>
    );
  }

  return (
    <button
      style={base}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
      {children}
    </button>
  );
}
