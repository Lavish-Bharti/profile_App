import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputField from '../components/InputField.jsx';
import Button from '../components/Button.jsx';
import { getProfile, updateProfile } from '../services/api.js';

const PHONE_ICON = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.18 19.79 19.79 0 01.12 4.5a2 2 0 012-2.18h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.91 9.9a16 16 0 006.18 6.18l1.46-1.46a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>;
const EMAIL_ICON = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const LOCATION_ICON = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>;
const LINK_ICON = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/></svg>;
const USER_ICON = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
const BRIEF_ICON = <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>;

const REQUIRED = ['name', 'title', 'description', 'phone', 'email', 'location'];

const validate = (form) => {
  const errs = {};
  REQUIRED.forEach((k) => {
    if (!form[k] || form[k].trim() === '') {
      errs[k] = 'This field is required.';
    }
  });
  if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errs.email = 'Enter a valid email address.';
  }
  ['linkedin', 'instagram', 'github'].forEach((k) => {
    if (form[k] && !/^https?:\/\/.+/.test(form[k])) {
      errs[k] = 'URL must start with http:// or https://';
    }
  });
  return errs;
};

export default function EditProfile() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '', title: '', description: '', phone: '', email: '',
    location: '', linkedin: '', instagram: '', github: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    getProfile()
      .then(setForm)
      .catch(() => showToast('Failed to load profile data.', 'error'))
      .finally(() => setLoading(false));
  }, []);

  const showToast = (msg, type = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async () => {
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      showToast('Please fix the errors below.', 'error');
      return;
    }
    setSaving(true);
    try {
      await updateProfile(form);
      showToast('Profile saved successfully!');
      setTimeout(() => navigate('/'), 1200);
    } catch (err) {
      const msg = err?.response?.data?.error || 'Failed to save profile.';
      showToast(msg, 'error');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="loader-wrap">
        <div className="spinner" />
        <p className="loader-text">Loading profile…</p>
      </div>
    );
  }

  const sectionLabel = (text) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '28px 0 16px' }}>
      <span style={{ fontSize: 11, fontWeight: 700, color: 'var(--accent2)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{text}</span>
      <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.07)' }} />
    </div>
  );

  return (
    <div className="page-enter" style={{ minHeight: '100vh', padding: '40px 20px' }}>
      {/* Toast */}
      {toast && (
        <div className="toast-container">
          <div className={`toast ${toast.type}`}>
            {toast.type === 'success'
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
            }
            {toast.msg}
          </div>
        </div>
      )}

      <div style={{ maxWidth: 580, margin: '0 auto' }}>
        {/* Nav */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, color: 'var(--text-muted)', fontSize: 14, transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--text)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-muted)'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            View Profile
          </Link>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 32, height: 32, background: 'linear-gradient(135deg, #7c6af7, #a78bfa)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
            </div>
            <span style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 15, color: 'var(--text)', letterSpacing: '-0.01em' }}>ProfileHub</span>
          </div>
        </div>

        {/* Card */}
        <div style={{
          background: 'rgba(19,19,26,0.8)',
          backdropFilter: 'blur(30px)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: 24,
          padding: '36px 36px 40px',
          boxShadow: '0 32px 80px rgba(0,0,0,0.4)',
        }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', marginBottom: 6 }}>Edit Profile</h2>
          <p style={{ fontSize: 13, color: 'var(--text-muted)', lineHeight: 1.5 }}>Update your public profile. Changes are reflected instantly.</p>

          {sectionLabel('Basic Info')}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <InputField label="Full Name" name="name" value={form.name} onChange={handleChange}
              placeholder="Alex Rivera" icon={USER_ICON} error={errors.name} required />
            <InputField label="Job Title" name="title" value={form.title} onChange={handleChange}
              placeholder="Full-Stack Developer" icon={BRIEF_ICON} error={errors.title} required />
            <InputField label="About" name="description" value={form.description} onChange={handleChange}
              placeholder="Short bio or description…" multiline rows={3} error={errors.description} required />
          </div>

          {sectionLabel('Contact')}

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <InputField label="Phone" name="phone" value={form.phone} onChange={handleChange}
              placeholder="+1 (555) 000-0000" type="tel" icon={PHONE_ICON} error={errors.phone} required />
            <InputField label="Email" name="email" value={form.email} onChange={handleChange}
              placeholder="you@example.com" type="email" icon={EMAIL_ICON} error={errors.email} required />
          </div>
          <div style={{ marginTop: 16 }}>
            <InputField label="Location" name="location" value={form.location} onChange={handleChange}
              placeholder="City, Country" icon={LOCATION_ICON} error={errors.location} required />
          </div>

          {sectionLabel('Social Links')}

          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <InputField label="LinkedIn URL" name="linkedin" value={form.linkedin} onChange={handleChange}
              placeholder="https://linkedin.com/in/yourhandle" icon={LINK_ICON} error={errors.linkedin} />
            <InputField label="Instagram URL" name="instagram" value={form.instagram} onChange={handleChange}
              placeholder="https://instagram.com/yourhandle" icon={LINK_ICON} error={errors.instagram} />
            <InputField label="GitHub URL" name="github" value={form.github} onChange={handleChange}
              placeholder="https://github.com/yourhandle" icon={LINK_ICON} error={errors.github} />
          </div>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, marginTop: 36 }}>
            <Button variant="primary" onClick={handleSubmit} disabled={saving} fullWidth size="lg"
              icon={saving
                ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 0.7s linear infinite' }}><line x1="12" y1="2" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="22"/><line x1="4.93" y1="4.93" x2="7.76" y2="7.76"/><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"/><line x1="2" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="22" y2="12"/><line x1="4.93" y1="19.07" x2="7.76" y2="16.24"/><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"/></svg>
                : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              }
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </Button>
            <Link to="/" style={{ flexShrink: 0 }}>
              <Button variant="secondary" size="lg">Cancel</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
