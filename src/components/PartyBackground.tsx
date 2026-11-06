import React from 'react';
import { motion } from 'framer-motion';
import partyBg from '../assets/party-bg.png';

export const PartyBackground: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-slate-950 select-none">
      {/* Generated Festive Circus & Party Background Image */}
      <img
        src={partyBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-55"
      />

      {/* Deep radial vignette so the game board in the center stays crisp and readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.35) 0%, rgba(9, 13, 28, 0.78) 75%, rgba(2, 6, 23, 0.92) 100%)',
        }}
      />

      {/* 1. JÄGERMEISTER - Top Left Edge */}
      <motion.div
        animate={{ y: [0, -12, 0], rotate: [-8, -3, -8] }}
        transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-4 top-20 w-20 md:w-24 opacity-85 drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]"
      >
        <svg viewBox="0 0 100 220" className="w-full h-auto">
          {/* Cap & Neck */}
          <rect x="38" y="6" width="24" height="20" rx="3" fill="#14532d" stroke="#d97706" strokeWidth="2" />
          <rect x="40" y="26" width="20" height="26" fill="#166534" />
          {/* Dark Green Rectangular Bottle Body */}
          <rect x="16" y="50" width="68" height="158" rx="10" fill="#052e16" stroke="#22c55e" strokeWidth="2.5" />
          <rect x="22" y="56" width="10" height="144" rx="4" fill="#15803d" opacity="0.35" />
          {/* Iconic Orange/Gold Jägermeister Label */}
          <rect x="23" y="76" width="54" height="96" rx="4" fill="#fffbeb" stroke="#ea580c" strokeWidth="5" />
          {/* Golden Stag Cross Emblem */}
          <circle cx="50" cy="104" r="14" fill="#ea580c" />
          <path d="M50 93 L50 103 M45 98 L55 98" stroke="#fef08a" strokeWidth="2.5" />
          <path d="M42 104 Q50 116 58 104" stroke="#fef08a" strokeWidth="2.5" fill="none" />
          {/* Label Banner */}
          <rect x="25" y="125" width="50" height="16" fill="#ea580c" />
          <text x="50" y="136" textAnchor="middle" fill="#ffffff" fontSize="7.2" fontWeight="900">
            JÄGERMEISTER
          </text>
          <text x="50" y="156" textAnchor="middle" fill="#14532d" fontSize="8" fontWeight="800">
            56 HERBS
          </text>
        </svg>
      </motion.div>

      {/* 2. LAUA VIIN - Bottom Left Edge */}
      <motion.div
        animate={{ y: [0, 14, 0], rotate: [7, 12, 7] }}
        transition={{ duration: 6.2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-5 bottom-16 w-20 md:w-24 opacity-85 drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]"
      >
        <svg viewBox="0 0 100 230" className="w-full h-auto">
          {/* Red Screw Cap */}
          <rect x="39" y="6" width="22" height="24" rx="2" fill="#dc2626" stroke="#ffffff" strokeWidth="1.5" />
          {/* Clear Glass Neck & Bottle */}
          <path
            d="M39 30 L39 55 Q20 72 20 95 L20 212 Q20 220 28 220 L72 220 Q80 220 80 212 L80 95 Q80 72 61 55 L61 30 Z"
            fill="rgba(226, 232, 240, 0.25)"
            stroke="#cbd5e1"
            strokeWidth="2.5"
          />
          {/* Estonian Classic Red & White Laua Viin Label */}
          <rect x="22" y="96" width="56" height="82" rx="3" fill="#ffffff" stroke="#dc2626" strokeWidth="3" />
          <rect x="25" y="102" width="50" height="24" fill="#dc2626" />
          <text x="50" y="118" textAnchor="middle" fill="#ffffff" fontSize="9.5" fontWeight="900">
            LAUA VIIN
          </text>
          <text x="50" y="144" textAnchor="middle" fill="#dc2626" fontSize="8.5" fontWeight="900">
            40% VOL
          </text>
          <text x="50" y="162" textAnchor="middle" fill="#334155" fontSize="6.5" fontWeight="700">
            EESTI KLASSIKA
          </text>
        </svg>
      </motion.div>

      {/* 3. ABSOLUT VODKA - Top Right Edge */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [8, 3, 8] }}
        transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-5 top-20 w-20 md:w-24 opacity-85 drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]"
      >
        <svg viewBox="0 0 100 220" className="w-full h-auto">
          {/* Silver Foil Cap */}
          <rect x="37" y="10" width="26" height="24" rx="3" fill="#94a3b8" stroke="#f8fafc" strokeWidth="2" />
          {/* Iconic Short-Neck Apothecary Clear Bottle */}
          <path
            d="M37 34 L37 48 Q16 58 16 82 L16 202 Q16 212 26 212 L74 212 Q84 212 84 202 L84 82 Q84 58 63 48 L63 34 Z"
            fill="rgba(241, 245, 249, 0.22)"
            stroke="#e2e8f0"
            strokeWidth="2.5"
          />
          {/* Blue Medallion Seal */}
          <circle cx="50" cy="68" r="11" fill="#1d4ed8" stroke="#cbd5e1" strokeWidth="2" />
          {/* Iconic Blue & Black Script Directly on Glass */}
          <text x="50" y="110" textAnchor="middle" fill="#2563eb" fontSize="11" fontWeight="900">
            ABSOLUT
          </text>
          <text x="50" y="126" textAnchor="middle" fill="#38bdf8" fontSize="10" fontWeight="900">
            VODKA
          </text>
          <text x="50" y="145" textAnchor="middle" fill="#f8fafc" fontSize="6.5" fontWeight="700">
            COUNTRY OF SWEDEN
          </text>
        </svg>
      </motion.div>

      {/* 4. ÕLUD (Golden Frothy Beer Mug) - Middle Left Edge */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [-5, 4, -5] }}
        transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-20 md:w-24 opacity-85 drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]"
      >
        <svg viewBox="0 0 120 150" className="w-full h-auto">
          {/* Mug Handle */}
          <path
            d="M82 52 H102 Q112 52 112 65 V98 Q112 110 102 110 H82"
            fill="none"
            stroke="#fbbf24"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* Golden Beer Body */}
          <rect x="18" y="36" width="66" height="96" rx="10" fill="#f59e0b" stroke="#fef3c7" strokeWidth="3" />
          {/* Beer Bubbles / Glass Ribs */}
          <line x1="34" y1="54" x2="34" y2="118" stroke="#fde68a" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
          <line x1="51" y1="54" x2="51" y2="118" stroke="#fde68a" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
          <line x1="68" y1="54" x2="68" y2="118" stroke="#fde68a" strokeWidth="4" strokeLinecap="round" opacity="0.6" />
          {/* Fluffy White Foam Head */}
          <circle cx="30" cy="34" r="15" fill="#ffffff" />
          <circle cx="50" cy="28" r="18" fill="#ffffff" />
          <circle cx="72" cy="34" r="15" fill="#ffffff" />
          {/* Label Badge */}
          <rect x="26" y="74" width="50" height="22" rx="5" fill="#78350f" stroke="#fde047" strokeWidth="2" />
          <text x="51" y="89" textAnchor="middle" fill="#fef08a" fontSize="11" fontWeight="900">
            ÕLU
          </text>
        </svg>
      </motion.div>

      {/* 5. GIN (Emerald Botanical Gin Bottle) - Middle Right Edge */}
      <motion.div
        animate={{ y: [0, 12, 0], rotate: [6, -4, 6] }}
        transition={{ duration: 5.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-20 md:w-24 opacity-85 drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]"
      >
        <svg viewBox="0 0 100 220" className="w-full h-auto">
          <rect x="38" y="8" width="24" height="22" rx="3" fill="#0f766e" stroke="#99f6e4" strokeWidth="2" />
          <path
            d="M38 30 L38 54 L18 76 L18 204 Q18 212 26 212 L74 212 Q82 212 82 204 L82 76 L62 54 L62 30 Z"
            fill="#0d9488"
            stroke="#5eead4"
            strokeWidth="2.5"
          />
          {/* Diamond Botanical Gin Label */}
          <polygon
            points="50,84 80,128 50,172 20,128"
            fill="#f0fdfa"
            stroke="#0f766e"
            strokeWidth="3"
          />
          <text x="50" y="126" textAnchor="middle" fill="#134e4a" fontSize="12" fontWeight="900">
            GIN
          </text>
          <text x="50" y="140" textAnchor="middle" fill="#0d9488" fontSize="6.5" fontWeight="800">
            LONDON DRY
          </text>
        </svg>
      </motion.div>

      {/* 6. WHISKEY & 7. RUM - Bottom Right Edge */}
      <motion.div
        animate={{ y: [0, -14, 0], rotate: [-7, -2, -7] }}
        transition={{ duration: 6.4, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute right-5 bottom-16 w-24 md:w-28 opacity-85 drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]"
      >
        <svg viewBox="0 0 140 220" className="w-full h-auto">
          {/* WHISKEY Square Bottle (Left) */}
          <g transform="translate(0, 10)">
            <rect x="26" y="8" width="20" height="22" rx="2" fill="#1c1917" stroke="#f59e0b" strokeWidth="1.5" />
            <rect x="10" y="50" width="52" height="145" rx="6" fill="#b45309" stroke="#fbbf24" strokeWidth="2" />
            <rect x="15" y="78" width="42" height="78" rx="3" fill="#1c1917" stroke="#f59e0b" strokeWidth="2" />
            <text x="36" y="112" textAnchor="middle" fill="#fef3c7" fontSize="7.5" fontWeight="900">
              WHISKEY
            </text>
            <text x="36" y="128" textAnchor="middle" fill="#f59e0b" fontSize="6.5" fontWeight="800">
              OLD NO. 7
            </text>
          </g>

          {/* RUM Spiced Caribbean Bottle (Right, slightly overlapping) */}
          <g transform="translate(64, 0)">
            <rect x="26" y="6" width="20" height="20" rx="3" fill="#7f1d1d" stroke="#fde047" strokeWidth="1.5" />
            <path
              d="M26 26 L26 48 Q8 64 10 92 L12 198 Q12 206 20 206 L52 206 Q60 206 60 198 L62 92 Q64 64 46 48 L46 26 Z"
              fill="#451a03"
              stroke="#f59e0b"
              strokeWidth="2"
            />
            <rect x="15" y="88" width="42" height="74" rx="4" fill="#fef3c7" stroke="#b91c1c" strokeWidth="2.5" />
            <text x="36" y="120" textAnchor="middle" fill="#7f1d1d" fontSize="10" fontWeight="900">
              RUM
            </text>
            <text x="36" y="136" textAnchor="middle" fill="#b45309" fontSize="6.5" fontWeight="800">
              SPICED GOLD
            </text>
          </g>
        </svg>
      </motion.div>
    </div>
  );
};

export default PartyBackground;
