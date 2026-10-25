// ============================================================
// NewFooter — DevOpsX Learning (minimal, airtap.ai-style)
// ------------------------------------------------------------
// The old Footer.jsx was far too heavy (4 link columns + socials +
// newsletter card + legal bar). Per the reference screenshot we now
// want a single slim row:
//
//   [ brand ]        [ Privacy  Terms  Contact ]        [ © 2026 ]
//
// Old Footer.jsx is still on disk and is commented out in
// layouts/MainLayout.jsx — swap the import back if it is ever needed.
// ============================================================

import { Link } from 'react-router-dom';
import BrandLogo from '../ui/BrandLogo';
import { useTheme } from '../../context/ThemeContext';

const links = [
  { label: 'Privacy',    to: '/about' },
  { label: 'Terms',      to: '/about' },
  { label: 'Contact Us', to: '/contact' },
];

export default function NewFooter() {
  const { isDark } = useTheme();

  const border = isDark ? 'rgba(99,102,241,.16)' : 'rgba(15,23,42,.08)';
  const linkColor = 'var(--text-muted)';

  const hoverLink = {
    onMouseEnter: (e) => (e.currentTarget.style.color = 'var(--text-primary)'),
    onMouseLeave: (e) => (e.currentTarget.style.color = linkColor),
  };

  return (
    <footer
      style={{
        background: isDark ? 'var(--bg-primary)' : '#ffffff',
        borderTop: `1px solid ${border}`,
        width: '100%',
        boxSizing: 'border-box',
        overflowX: 'hidden',
      }}
    >
      <div
        className="new-footer-row"
        style={{
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          boxSizing: 'border-box',
          padding: 'clamp(22px, 3vw, 34px) clamp(16px, 4vw, 32px)',
        }}
      >
        {/* Brand */}
        <Link to="/" style={{ display: 'inline-flex', textDecoration: 'none' }}>
          <BrandLogo size="sm" tagline={false} />
        </Link>

        {/* Centre links */}
        <nav className="new-footer-links">
          {links.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              style={{
                color: linkColor,
                fontSize: '0.95rem',
                textDecoration: 'none',
                transition: 'color .15s',
              }}
              {...hoverLink}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Copyright */}
        <p style={{ color: linkColor, fontSize: '0.95rem', margin: 0, whiteSpace: 'nowrap' }}>
          © {new Date().getFullYear()} DevOpsX Learning
        </p>
      </div>

      <style>{`
        .new-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px 32px;
          flex-wrap: wrap;
        }
        .new-footer-links {
          display: flex;
          align-items: center;
          gap: clamp(18px, 3vw, 34px);
          flex-wrap: wrap;
        }
        @media (max-width: 640px) {
          .new-footer-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }
        }
      `}</style>
    </footer>
  );
}
