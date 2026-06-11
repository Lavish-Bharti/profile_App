import React, { useState } from 'react';

export default function InputField({
  label,
  name,
  value,
  onChange,
  type = 'text',
  placeholder = '',
  error = '',
  multiline = false,
  rows = 4,
  icon,
  required = false,
}) {
  const [focused, setFocused] = useState(false);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  };

  const labelStyle = {
    fontSize: '12px',
    fontWeight: 600,
    color: focused ? 'var(--accent2)' : 'var(--text-muted)',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    transition: 'color 0.2s',
  };

  const inputWrapStyle = {
    position: 'relative',
    display: 'flex',
    alignItems: multiline ? 'flex-start' : 'center',
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${error ? 'rgba(248,113,113,0.5)' : focused ? 'rgba(124,106,247,0.6)' : 'rgba(255,255,255,0.08)'}`,
    borderRadius: '10px',
    padding: icon ? '12px 14px 12px 42px' : '12px 14px',
    fontSize: '14px',
    color: 'var(--text)',
    transition: 'border-color 0.2s, box-shadow 0.2s, background 0.2s',
    boxShadow: focused ? '0 0 0 3px rgba(124,106,247,0.15)' : 'none',
    resize: multiline ? 'vertical' : undefined,
    minHeight: multiline ? `${rows * 28}px` : undefined,
    fontFamily: 'var(--font-body)',
    lineHeight: '1.6',
  };

  const iconStyle = {
    position: 'absolute',
    left: '14px',
    top: multiline ? '14px' : '50%',
    transform: multiline ? 'none' : 'translateY(-50%)',
    color: focused ? 'var(--accent2)' : 'var(--text-dim)',
    transition: 'color 0.2s',
    pointerEvents: 'none',
    fontSize: '16px',
    lineHeight: 1,
  };

  const errorStyle = {
    fontSize: '12px',
    color: 'var(--error)',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  };

  return (
    <div style={containerStyle}>
      {label && (
        <label style={labelStyle}>
          {label}{required && <span style={{ color: 'var(--accent2)', marginLeft: 2 }}>*</span>}
        </label>
      )}
      <div style={inputWrapStyle}>
        {icon && <span style={iconStyle}>{icon}</span>}
        {multiline ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            rows={rows}
            style={inputStyle}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={inputStyle}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
          />
        )}
      </div>
      {error && (
        <span style={errorStyle}>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="5.5" stroke="currentColor"/>
            <path d="M6 3.5v3M6 8h.01" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          {error}
        </span>
      )}
    </div>
  );
}
