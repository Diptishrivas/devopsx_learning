// ============================================================
// AuthBackground — faint education + AI doodle pattern behind the
// Login / Register forms (books, grad cap, bulb, neural net, chip, robot…)
// ============================================================

import { useTheme } from '../../context/ThemeContext';

export default function AuthBackground() {
  const { isDark } = useTheme();
  const ink = isDark ? '#a5b4fc' : '#4f46e5';

  return (
    <div
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}
    >
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: isDark ? 0.18 : 0.16 }}>
        <defs>
          <pattern id="edu-doodles" width="320" height="320" patternUnits="userSpaceOnUse" patternTransform="rotate(-8)">
            <g fill="none" stroke={ink} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              {/* Graduation cap */}
              <path d="M14 38 L46 24 L78 38 L46 52 Z" />
              <path d="M28 44 v14 c0 7 36 7 36 0 v-14" />
              <path d="M78 38 v16" />

              {/* Open book */}
              <path d="M130 30 c10-5 20-5 28 0 v34 c-8-5 -18-5 -28 0 z" />
              <path d="M158 30 c8-5 18-5 28 0 v34 c-10-5 -20-5 -28 0" />

              {/* Pencil */}
              <path d="M28 150 L72 106 L84 118 L40 162 L24 166 Z" />
              <path d="M66 112 L78 124" />

              {/* Light bulb */}
              <path d="M150 128 a20 20 0 1 1 24 0 c-4 4 -5 8 -5 12 h-14 c0 -4 -1 -8 -5 -12 z" />
              <path d="M156 148 h14 M158 154 h10" />

              {/* Atom */}
              <ellipse cx="120" cy="208" rx="24" ry="9" />
              <ellipse cx="120" cy="208" rx="24" ry="9" transform="rotate(60 120 208)" />
              <ellipse cx="120" cy="208" rx="24" ry="9" transform="rotate(-60 120 208)" />

              {/* Ruler */}
              <path d="M196 196 L226 166 L236 176 L206 206 Z" />
              <path d="M204 188 l4 4 M211 181 l4 4 M218 174 l4 4" />

              {/* Neural network */}
              <path d="M258 30 L290 18 M258 30 L290 50 M258 62 L290 18 M258 62 L290 50 M290 18 L312 34 M290 50 L312 34" />
              <circle cx="258" cy="30" r="5" /><circle cx="258" cy="62" r="5" />
              <circle cx="290" cy="18" r="5" /><circle cx="290" cy="50" r="5" />
              <circle cx="312" cy="34" r="5" />

              {/* Chip */}
              <rect x="252" y="118" width="40" height="40" rx="5" />
              <rect x="262" y="128" width="20" height="20" rx="2" />
              <path d="M262 112 v6 M272 112 v6 M282 112 v6 M262 158 v6 M272 158 v6 M282 158 v6 M246 128 h6 M246 138 h6 M246 148 h6 M292 128 h6 M292 138 h6 M292 148 h6" />

              {/* Robot head */}
              <rect x="40" y="262" width="44" height="34" rx="8" />
              <circle cx="54" cy="278" r="4" /><circle cx="70" cy="278" r="4" />
              <path d="M62 262 v-8 M56 289 h12 M40 279 h-5 M84 279 h5" />
              <circle cx="62" cy="251" r="3" />

              {/* Code brackets */}
              <path d="M268 250 l-12 12 l12 12 M300 250 l12 12 l-12 12 M290 246 l-12 32" />
            </g>
            <g fill={ink} fontFamily="Georgia, serif" fontStyle="italic">
              <text x="96" y="92" fontSize="22">π</text>
              <text x="200" y="110" fontSize="20">Σ</text>
              <text x="16" y="222" fontSize="16">a²+b²</text>
              <text x="190" y="236" fontSize="16" fontStyle="normal" fontWeight="700">A+</text>
            </g>
            <g fill={ink} fontFamily="var(--font-display), system-ui, sans-serif" fontWeight="800">
              <text x="204" y="300" fontSize="30">AI</text>
              <text x="108" y="150" fontSize="22">AI</text>
              <text x="136" y="296" fontSize="18">ML</text>
              <text x="250" y="210" fontSize="15">GenAI</text>
            </g>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#edu-doodles)" />
      </svg>

      {/* Soft glow + edge fade so the pattern stays subtle around the form */}
      <div
        style={{
          position: 'absolute', inset: 0,
          background: isDark
            ? 'radial-gradient(ellipse 60% 55% at 50% 45%, rgba(124,58,237,.10) 0%, transparent 70%), linear-gradient(180deg, transparent 80%, var(--bg-primary) 100%)'
            : 'radial-gradient(ellipse 60% 55% at 50% 45%, rgba(79,70,229,.06) 0%, transparent 70%), linear-gradient(180deg, transparent 80%, var(--bg-primary) 100%)',
        }}
      />
    </div>
  );
}
