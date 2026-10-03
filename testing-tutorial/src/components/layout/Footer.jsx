// ============================================================
// Footer — DevOpsX Learning
// [ brand + socials ] [ Explore ] [ Company ] [ Support ]
// [ ─────────── newsletter card ─────────── ]
// ──────────────────────────────────────────────
// [ © copyright ]  [ legal links ]
// ============================================================

import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import BrandLogo from '../ui/BrandLogo';
import { SocialIcon } from '../ui/BrandMarks';
import { useTheme } from '../../context/ThemeContext';

const columns = [
  {
    title: 'Explore',
    links: [
      { label: 'Books',        to: '/textbooks' },
      { label: 'Courses',      to: '/courses' },
      { label: 'Categories',   to: '/categories' },
      { label: 'Plans',        to: '/subscription' },
      // Live Classes, Resources and Blog commented out — removed from the project.
      // { label: 'Live Classes', to: '/curriculum' },
      // { label: 'Resources',    to: '/resources' },
      // { label: 'Blog',         to: '/resources' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us',             to: '/about' },
      { label: 'Careers',              to: '/about' },
      { label: 'Become an Instructor', to: '/contact' },
      { label: 'Affiliate Program',    to: '/contact' },
    ],
  },
  {
    title: 'Support',
    links: [
      { label: 'Help Center', to: '/contact' },
      { label: 'FAQs',        to: '/contact' },
      { label: 'Contact Us',  to: '/contact' },
    ],
  },
];

const legalLinks = [
  { label: 'Privacy Policy',     to: '/about' },
  { label: 'Terms & Conditions', to: '/about' },
  { label: 'Refund Policy',      to: '/about' },
];

const socials = [
  { name: 'facebook',  href: 'https://facebook.com',  label: 'Facebook' },
  { name: 'twitter',   href: 'https://twitter.com',   label: 'Twitter' },
  { name: 'youtube',   href: 'https://youtube.com',   label: 'YouTube' },
  { name: 'instagram', href: 'https://instagram.com', label: 'Instagram' },
  { name: 'linkedin',  href: 'https://linkedin.com',  label: 'LinkedIn' },
];

export default function Footer() {
  const { isDark } = useTheme();
  const [email, setEmail] = useState('');

  const border = isDark ? 'rgba(255,255,255,.08)' : 'rgba(15,23,42,.08)';
  const accent = isDark ? '#818cf8' : '#4f46e5';
  const tile = isDark ? 'rgba(255,255,255,.06)' : '#f1f3f9';
  const linkColor = 'var(--text-muted)';

  // TODO: Replace with API call — subscribe email to the newsletter
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      toast.error('Please enter a valid email address');
      return;
    }
    toast.success('Thanks for subscribing!');
    setEmail('');
  };

  const hoverLink = {
    onMouseEnter: (e) => (e.currentTarget.style.color = 'var(--text-primary)'),
    onMouseLeave: (e) => (e.currentTarget.style.color = linkColor),
  };

  return (
    <footer
      style={{
        background: isDark ? 'var(--bg-secondary)' : '#ffffff',
        borderTop: `1px solid ${border}`,
        width: '100%',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          boxSizing: 'border-box',
          padding: 'clamp(40px, 6vw, 72px) clamp(16px, 4vw, 32px) clamp(24px, 3vw, 32px)',
        }}
      >
        {/* ── Top: brand + link columns ── */}
        <div className="footer-grid">
          <div style={{ minWidth: 0 }}>
            <Link to="/" style={{ display: 'inline-flex', textDecoration: 'none' }}>
              <BrandLogo size="md" />
            </Link>

            <p
              style={{
                color: linkColor,
                fontSize: '0.85rem',
                lineHeight: 1.7,
                margin: '16px 0 20px',
                maxWidth: '270px',
              }}
            >
              Empowering learners with quality AI education, expert-led courses
              and books — all in one place.
            </p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {socials.map(({ name, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    width: '32px', height: '32px', borderRadius: '7px',
                    background: tile,
                    color: 'var(--text-secondary)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    textDecoration: 'none', transition: 'all .15s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = accent;
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = tile;
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  <SocialIcon name={name} size={15} />
                </a>
              ))}
            </div>
          </div>

          {columns.map(({ title, links }) => (
            <div key={title} style={{ minWidth: 0 }}>
              <h4
                style={{
                  color: 'var(--text-primary)',
                  fontSize: '0.95rem',
                  fontWeight: 700,
                  margin: '6px 0 18px',
                }}
              >
                {title}
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: '6px',
                        color: linkColor,
                        fontSize: '0.85rem',
                        textDecoration: 'none',
                        transition: 'color .15s',
                      }}
                      {...hoverLink}
                    >
                      <ChevronRight size={13} color={accent} style={{ flexShrink: 0 }} />
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Newsletter card ── */}
        <div
          style={{
            marginTop: 'clamp(32px, 5vw, 48px)',
            padding: 'clamp(22px, 4vw, 32px) clamp(16px, 4vw, 32px)',
            borderRadius: '12px',
            background: isDark ? 'rgba(255,255,255,.04)' : '#f6f7fb',
            border: `1px solid ${border}`,
            textAlign: 'center',
          }}
        >
          <h3 style={{ color: 'var(--text-primary)', fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
            Stay Updated with DevOpsX Learning
          </h3>
          <p style={{ color: linkColor, fontSize: '0.85rem', margin: '10px 0 20px' }}>
            Get the latest courses, books and learning tips straight to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="footer-subscribe">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email address"
              aria-label="Email address"
              style={{
                flex: '1 1 auto', minWidth: 0, height: '40px', padding: '0 12px',
                borderRadius: '6px', fontSize: '0.85rem',
                background: isDark ? 'rgba(255,255,255,.05)' : '#ffffff',
                border: `1px solid ${isDark ? 'rgba(255,255,255,.12)' : '#d0d5dd'}`,
                color: 'var(--text-primary)', outline: 'none',
              }}
            />
            <button
              type="submit"
              style={{
                height: '40px', padding: '0 18px', borderRadius: '6px',
                background: accent, color: '#fff', border: 'none',
                fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer',
                whiteSpace: 'nowrap', transition: 'opacity .15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.9')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* ── Bottom bar: copyright + legal ── */}
        <div
          className="footer-bottom"
          style={{
            marginTop: 'clamp(28px, 4vw, 40px)',
            paddingTop: '24px',
            borderTop: `1px solid ${border}`,
          }}
        >
          <p style={{ color: linkColor, fontSize: '0.82rem', margin: 0 }}>
            © {new Date().getFullYear()} DevOpsX Learning. All rights reserved.
          </p>
          {legalLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              style={{ color: linkColor, fontSize: '0.82rem', textDecoration: 'none', transition: 'color .15s' }}
              {...hoverLink}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>

      <style>{`
        .footer-grid {
          display: grid;
          grid-template-columns: 1.3fr repeat(3, minmax(0, 1fr));
          gap: 32px;
          align-items: start;
        }
        .footer-subscribe {
          display: flex; gap: 12px;
          max-width: 410px; margin: 0 auto;
        }
        .footer-bottom {
          display: flex; flex-wrap: wrap; align-items: center;
          gap: 12px 24px;
        }
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 32px 24px; }
          .footer-grid > :first-child { grid-column: 1 / -1; }
        }
        @media (max-width: 560px) {
          .footer-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px 16px; }
          .footer-subscribe { flex-direction: column; }
          .footer-bottom { flex-direction: column; align-items: flex-start; gap: 10px; }
        }
      `}</style>
    </footer>
  );
}
