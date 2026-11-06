import React from 'react';
import { motion } from 'framer-motion';
import type { TargetAndTransition } from 'framer-motion';
import type { AnimationState, CharacterConfig, CharacterId } from '../types/game';

export interface CharacterTokenProps {
  character: CharacterConfig;
  playerName?: string;
  animationState: AnimationState;
  isActive?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

function getCharacterAnimation(
  id: CharacterId,
  state: AnimationState
): TargetAndTransition {
  if (state === 'idle') {
    return {
      y: [0, -3, 0],
      rotate: [0, 1.5, -1.5, 0],
      scale: 1,
      transition: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
    };
  }

  if (state === 'ladderUp') {
    // Celebratory climb/shimmy upward per character
    switch (id) {
      case 'siil':
      case 'kloun':
        return {
          y: [0, -14, -6, -22, 0],
          rotate: [0, -12, 12, -360, 0],
          scale: [1, 1.18, 1.25, 1.15, 1],
          transition: { duration: 0.75, ease: 'easeInOut' },
        };
      case 'kuldne_paks':
        return {
          y: [0, -10, -4, -18, 0],
          scaleX: [1, 1.22, 0.9, 1.18, 1],
          scaleY: [1, 0.85, 1.2, 0.9, 1],
          transition: { duration: 0.75, ease: 'easeInOut' },
        };
      default:
        return {
          y: [0, -10, -5, -20, -12, -26, 0],
          x: [0, -5, 5, -5, 5, 0, 0],
          rotate: [0, -10, 10, -12, 12, 0, 0],
          scale: [1, 1.12, 1.15, 1.22, 1.15, 1.25, 1],
          transition: { duration: 0.75, ease: 'easeInOut' },
        };
    }
  }

  if (state === 'ladderDown') {
    // Dizzy spinning/tumbling slide downward
    switch (id) {
      case 'valge':
        return {
          y: [0, 12, 24, 0],
          x: [0, -14, 14, -8, 0],
          opacity: [1, 0.45, 0.85, 0.4, 1],
          rotate: [0, -25, 25, -15, 0],
          scale: [1, 0.85, 1.1, 0.8, 1],
          transition: { duration: 0.75, ease: 'easeInOut' },
        };
      default:
        return {
          y: [0, 8, 22, 10, 0],
          x: [0, 10, -10, 6, 0],
          rotate: [0, 120, 260, 360, 360],
          scale: [1, 0.9, 0.78, 0.92, 1],
          transition: { duration: 0.75, ease: 'easeInOut' },
        };
    }
  }

  if (state === 'mishap') {
    // Funny character-specific mishap (backflip, step backward then forward, belly bounce, moonwalk, etc.)
    switch (id) {
      case 'korstnapuhkija':
        // Steps back in soot, does a full backflip, then jumps forward
        return {
          x: [0, -24, -10, 14, 0],
          y: [0, -6, -28, -8, 0],
          rotate: [0, -25, -180, -360, 0],
          scale: [1, 0.95, 1.2, 1.1, 1],
          transition: { duration: 0.68, ease: 'easeInOut' },
        };
      case 'valge':
        // Spooky float backward + startled phase-out spin
        return {
          x: [0, -28, 18, -8, 0],
          y: [0, -22, -12, -4, 0],
          rotate: [0, -40, 40, -15, 0],
          scale: [1, 1.28, 0.75, 1.15, 1],
          transition: { duration: 0.68, ease: 'easeInOut' },
        };
      case 'zombie':
        // Trips forward on own feet, head spins 360, stumbles back & forward
        return {
          x: [0, -26, 20, -10, 0],
          y: [0, 10, -14, 6, 0],
          rotate: [0, 75, 220, 360, 0],
          transition: { duration: 0.68, ease: 'easeInOut' },
        };
      case 'kloun':
        // Circus double cartwheel + backward slip
        return {
          x: [0, -26, 22, 0],
          y: [0, -26, -12, 0],
          rotate: [0, -180, -360, 0],
          scale: [1, 1.22, 0.9, 1],
          transition: { duration: 0.68, ease: 'easeInOut' },
        };
      case 'kiilakas_kloun':
        // Banana-peel slip backward & upside-down bounce
        return {
          x: [0, -30, 16, 0],
          y: [0, -20, 8, -10, 0],
          rotate: [0, -140, -360, 0],
          transition: { duration: 0.68, ease: 'easeInOut' },
        };
      case 'the_nadim':
        // Smooth Michael Jackson moonwalk backward then 360 spin forward
        return {
          x: [0, -14, -28, 16, 0],
          y: [0, -2, -4, -18, 0],
          rotate: [0, -8, -12, 360, 0],
          scale: [1, 1.08, 1.12, 1.2, 1],
          transition: { duration: 0.68, ease: 'easeInOut' },
        };
      case 'siil':
        // High-speed Sonic spin-dash backward and turbo launch forward
        return {
          x: [0, -26, -26, 28, 0],
          y: [0, -4, -18, -6, 0],
          rotate: [0, -360, -720, -1080, 0],
          scale: [1, 0.82, 0.82, 1.22, 1],
          transition: { duration: 0.68, ease: 'easeInOut' },
        };
      case 'kuldne_paks':
        // Giant sumo belly-bounce backward and squash-stretch hop
        return {
          x: [0, -24, 20, -8, 0],
          y: [0, -22, 6, -12, 0],
          scaleX: [1, 1.38, 0.78, 1.22, 1],
          scaleY: [1, 0.72, 1.32, 0.85, 1],
          transition: { duration: 0.68, ease: 'easeInOut' },
        };
      case 'neoon_mees':
        // Rave glitch-teleport left/right + laser backflip
        return {
          x: [0, -28, 26, -18, 14, 0],
          y: [0, -16, -24, 6, -10, 0],
          rotate: [0, 90, -180, -360, 0],
          scale: [1, 1.25, 0.8, 1.2, 1],
          transition: { duration: 0.68, ease: 'easeInOut' },
        };
      case 'dr_luks':
        // Violent double hiccup pop upward + step back
        return {
          x: [0, -22, -10, 16, 0],
          y: [0, -28, 0, -32, 0],
          rotate: [0, -20, 15, -360, 0],
          scale: [1, 1.28, 0.88, 1.32, 1],
          transition: { duration: 0.68, ease: 'easeInOut' },
        };
      case 'sinine_habemik':
        // Trips over his own blue beard, rolls backward then leaps forward
        return {
          x: [0, -26, 18, 0],
          y: [0, 8, -22, 0],
          rotate: [0, -190, -360, 0],
          transition: { duration: 0.68, ease: 'easeInOut' },
        };
      case 'mongolian':
        // Wild steppe horse rear-up + backflip charge
        return {
          x: [0, -24, -12, 22, 0],
          y: [0, -26, -32, -8, 0],
          rotate: [0, -45, -200, -360, 0],
          scale: [1, 1.2, 1.25, 1.1, 1],
          transition: { duration: 0.68, ease: 'easeInOut' },
        };
    }
  }

  // state === 'move': signature per-character step animation
  switch (id) {
    case 'korstnapuhkija':
      // Jaunty chimney-sweep waddle hop
      return {
        y: [0, -16, 0],
        rotate: [0, -14, 14, 0],
        scale: [1, 1.12, 1],
        transition: { duration: 0.34, ease: 'easeOut' },
      };
    case 'valge':
      // Wavy ghost glide
      return {
        y: [0, -20, -4, 0],
        x: [0, -6, 6, 0],
        scale: [1, 1.14, 0.96, 1],
        transition: { duration: 0.34, ease: 'easeInOut' },
      };
    case 'zombie':
      // Heavy lopsided zombie lurk
      return {
        y: [0, -10, 3, 0],
        rotate: [0, -24, 18, 0],
        scale: [1, 1.08, 0.95, 1],
        transition: { duration: 0.34, ease: 'easeInOut' },
      };
    case 'kloun':
      // Bouncy circus spring hop
      return {
        y: [0, -22, 0],
        scaleY: [1, 1.2, 0.86, 1],
        rotate: [0, 16, -16, 0],
        transition: { duration: 0.34, ease: 'easeOut' },
      };
    case 'kiilakas_kloun':
      // Wiggly slapstick shoe-squeak hop
      return {
        y: [0, -15, 0],
        x: [0, 7, -7, 0],
        rotate: [0, 20, -20, 0],
        transition: { duration: 0.34, ease: 'easeInOut' },
      };
    case 'the_nadim':
      // Cool VIP swagger bounce
      return {
        y: [0, -14, 0],
        rotate: [0, -10, 6, 0],
        scale: [1, 1.15, 1],
        transition: { duration: 0.34, ease: 'easeOut' },
      };
    case 'siil':
      // Rapid hedgehog dash-hop
      return {
        y: [0, -18, 0],
        rotate: [0, 45, 0],
        scale: [1, 1.16, 0.92, 1],
        transition: { duration: 0.3, ease: 'easeOut' },
      };
    case 'kuldne_paks':
      // Heavy golden belly stomp
      return {
        y: [0, -18, 4, 0],
        scaleX: [1, 0.9, 1.24, 1],
        scaleY: [1, 1.15, 0.8, 1],
        transition: { duration: 0.35, ease: 'easeOut' },
      };
    case 'neoon_mees':
      // Electric rave pulse jump
      return {
        y: [0, -20, 0],
        scale: [1, 1.22, 0.9, 1],
        rotate: [0, -15, 15, 0],
        transition: { duration: 0.32, ease: 'easeOut' },
      };
    case 'dr_luks':
      // Sudden hiccup jolt step
      return {
        y: [0, -22, -4, -12, 0],
        scale: [1, 1.18, 0.94, 1.1, 1],
        transition: { duration: 0.34, ease: 'easeOut' },
      };
    case 'sinine_habemik':
      // Rolling sea-captain stomp
      return {
        y: [0, -15, 0],
        rotate: [0, -18, 18, 0],
        scale: [1, 1.12, 1],
        transition: { duration: 0.34, ease: 'easeInOut' },
      };
    case 'mongolian':
      // Rhythmic horse-gallop double hop
      return {
        y: [0, -18, -4, -14, 0],
        rotate: [0, -12, 8, -6, 0],
        transition: { duration: 0.34, ease: 'easeOut' },
      };
  }
}

function renderCharacterAccessory(id: CharacterId) {
  switch (id) {
    case 'korstnapuhkija':
      return (
        <>
          {/* Shrek-style green ears + top chimney cap */}
          <svg
            viewBox="0 0 100 100"
            className="absolute -inset-2.5 w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none z-20 overflow-visible"
          >
            {/* Left & Right ogre/chimney ears */}
            <path
              d="M 14 32 C 2 18, -2 26, 8 38 C 12 42, 16 40, 18 36 Z"
              fill="#65a30d"
              stroke="#1a2e05"
              strokeWidth="2.5"
            />
            <path
              d="M 86 32 C 98 18, 102 26, 92 38 C 88 42, 84 40, 82 36 Z"
              fill="#65a30d"
              stroke="#1a2e05"
              strokeWidth="2.5"
            />
            {/* Sooty top cap */}
            <path
              d="M 28 16 L 72 16 L 66 4 L 34 4 Z"
              fill="#1f2937"
              stroke="#84cc16"
              strokeWidth="2"
            />
          </svg>
        </>
      );

    case 'valge':
      return (
        <>
          {/* Spectral white glowing halo + spooky mask */}
          <div className="absolute -inset-2 rounded-full bg-white/30 blur-md animate-pulse pointer-events-none" />
          <svg
            viewBox="0 0 100 100"
            className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none z-20 overflow-visible"
          >
            <path
              d="M 20 88 Q 35 102 50 90 Q 65 102 80 88"
              fill="none"
              stroke="#ffffff"
              strokeWidth="5"
              strokeLinecap="round"
            />
          </svg>
        </>
      );

    case 'zombie':
      return (
        <svg
          viewBox="0 0 100 100"
          className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none z-20 overflow-visible"
        >
          {/* Toxic green slime drips + red scar stitch */}
          <path
            d="M 22 82 Q 25 98 29 85 M 48 86 Q 52 103 56 86 M 74 82 Q 77 96 81 82"
            fill="none"
            stroke="#4ade80"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
          <path
            d="M 28 12 L 48 18 M 33 9 L 31 19 M 41 11 L 39 21"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'kloun':
      return (
        <svg
          viewBox="0 0 100 100"
          className="absolute -inset-2.5 w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none z-20 overflow-visible"
        >
          {/* Fluffy orange clown hair puffs on sides + circus collar */}
          <circle cx="10" cy="38" r="10" fill="#f97316" stroke="#7c2d12" strokeWidth="2" />
          <circle cx="8" cy="52" r="9" fill="#fb923c" stroke="#7c2d12" strokeWidth="2" />
          <circle cx="90" cy="38" r="10" fill="#f97316" stroke="#7c2d12" strokeWidth="2" />
          <circle cx="92" cy="52" r="9" fill="#fb923c" stroke="#7c2d12" strokeWidth="2" />
          {/* Red clown nose badge at bottom */}
          <circle cx="50" cy="91" r="7" fill="#ef4444" stroke="#ffffff" strokeWidth="2" />
        </svg>
      );

    case 'kiilakas_kloun':
      return (
        <svg
          viewBox="0 0 100 100"
          className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none z-20 overflow-visible"
        >
          {/* Polka-dot big bow tie right under the chin */}
          <polygon
            points="24,84 50,91 24,99"
            fill="#ef4444"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <polygon
            points="76,84 50,91 76,99"
            fill="#ef4444"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <circle cx="33" cy="91" r="2.5" fill="#fde047" />
          <circle cx="67" cy="91" r="2.5" fill="#fde047" />
          <circle cx="50" cy="91" r="5" fill="#facc15" stroke="#ffffff" strokeWidth="1.5" />
        </svg>
      );

    case 'the_nadim':
      return (
        <svg
          viewBox="0 0 100 100"
          className="absolute -inset-2 w-[calc(100%+16px)] h-[calc(100%+16px)] pointer-events-none z-20 overflow-visible"
        >
          {/* Thick silver Cuban link chain under chin + VIP crown */}
          <path
            d="M 22 80 Q 50 102 78 80"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="6"
            strokeDasharray="6 3"
            strokeLinecap="round"
          />
          <polygon
            points="34,12 42,2 50,10 58,2 66,12"
            fill="#38bdf8"
            stroke="#ffffff"
            strokeWidth="2"
          />
        </svg>
      );

    case 'siil':
      return (
        <svg
          viewBox="0 0 100 100"
          className="absolute -inset-2.5 w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none z-20 overflow-visible"
        >
          {/* Golden spiky hedgehog quills crown */}
          <polygon
            points="16,30 6,14 28,20 26,4 44,14 50,0 56,14 74,4 72,20 94,14 84,30"
            fill="#eab308"
            stroke="#713f12"
            strokeWidth="2"
          />
        </svg>
      );

    case 'kuldne_paks':
      return (
        <svg
          viewBox="0 0 100 100"
          className="absolute -inset-2.5 w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none z-20 overflow-visible"
        >
          {/* Royal golden laurel/coin frame + gold crown */}
          <circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            stroke="#facc15"
            strokeWidth="4"
            strokeDasharray="8 4"
          />
          <polygon
            points="30,14 38,1 50,11 62,1 70,14"
            fill="#facc15"
            stroke="#854d0e"
            strokeWidth="2"
          />
        </svg>
      );

    case 'neoon_mees':
      return (
        <>
          {/* Glowing UV neon double rings */}
          <div className="absolute -inset-2 rounded-full border-2 border-cyan-400 shadow-[0_0_12px_#22d3ee] pointer-events-none" />
          <div className="absolute -inset-1 rounded-full border-2 border-fuchsia-500 pointer-events-none" />
        </>
      );

    case 'dr_luks':
      return (
        <svg
          viewBox="0 0 100 100"
          className="absolute -inset-2.5 w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none z-20 overflow-visible"
        >
          {/* Doctor head-mirror with red cross on top */}
          <circle cx="50" cy="10" r="10" fill="#f8fafc" stroke="#0ea5e9" strokeWidth="2.5" />
          <path d="M 50 5 L 50 15 M 45 10 L 55 10" stroke="#ef4444" strokeWidth="3" />
          {/* Hiccup bubble on the side */}
          <circle cx="88" cy="22" r="7" fill="#bae6fd" stroke="#0284c7" strokeWidth="1.8" />
        </svg>
      );

    case 'sinine_habemik':
      return (
        <svg
          viewBox="0 0 100 100"
          className="absolute -inset-2.5 w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none z-20 overflow-visible"
        >
          {/* Braided electric-blue beard frame under the face */}
          <path
            d="M 18 68 Q 30 98 50 98 Q 70 98 82 68 Q 68 88 50 88 Q 32 88 18 68 Z"
            fill="#2563eb"
            stroke="#93c5fd"
            strokeWidth="2"
          />
        </svg>
      );

    case 'mongolian':
      return (
        <svg
          viewBox="0 0 100 100"
          className="absolute -inset-2.5 w-[calc(100%+20px)] h-[calc(100%+20px)] pointer-events-none z-20 overflow-visible"
        >
          {/* Traditional steppe fur-trimmed warrior cap + golden spire */}
          <path
            d="M 16 26 Q 50 6 84 26 L 78 14 Q 50 2 22 14 Z"
            fill="#1e3a8a"
            stroke="#f59e0b"
            strokeWidth="2.2"
          />
          <polygon points="50,0 45,10 55,10" fill="#f59e0b" />
        </svg>
      );
  }
}

export const CharacterToken: React.FC<CharacterTokenProps> = ({
  character,
  playerName,
  animationState,
  isActive = false,
  size = 'md',
}) => {
  const sizeClasses = {
    sm: 'w-11 h-11',
    md: 'w-14 h-14',
    lg: 'w-20 h-20',
  }[size];

  const anim = getCharacterAnimation(character.id, animationState);

  return (
    <motion.div
      animate={anim}
      className={`relative select-none flex flex-col items-center justify-center ${
        isActive ? 'z-30' : 'z-10'
      }`}
    >
      {/* Funny Mishap Label Bubble when a mishap happens */}
      {animationState === 'mishap' && (
        <motion.div
          initial={{ opacity: 0, y: 6, scale: 0.7 }}
          animate={{ opacity: 1, y: -10, scale: 1 }}
          className="absolute -top-7 z-40 whitespace-nowrap rounded-full bg-amber-400 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wider text-slate-950 shadow-lg border-2 border-white"
        >
          {character.mishapLabel}
        </motion.div>
      )}

      {/* Active turn glowing ring */}
      {isActive && (
        <div
          className="absolute -inset-2 rounded-full animate-ping opacity-40 pointer-events-none"
          style={{ backgroundColor: character.color }}
        />
      )}

      {/* Main Big Face Medallion */}
      <div
        className={`relative ${sizeClasses} rounded-full p-0.5 shadow-[0_6px_16px_rgba(0,0,0,0.65)] transition-transform`}
        style={{
          background: `linear-gradient(135deg, ${character.color}, ${character.accentColor})`,
          boxShadow: isActive
            ? `0 0 18px ${character.color}, 0 4px 12px rgba(0,0,0,0.8)`
            : '0 5px 14px rgba(0,0,0,0.75)',
        }}
      >
        {/* Character-themed custom SVG costume accessory */}
        {renderCharacterAccessory(character.id)}

        {/* Enlarged circular face portrait so everyone clearly sees who is who */}
        <div className="w-full h-full rounded-full overflow-hidden bg-slate-900 border-2 border-white/90 relative z-10">
          <img
            src={character.faceImage}
            alt={character.name}
            className="w-full h-full object-cover object-center scale-115"
            draggable={false}
          />
        </div>
      </div>

      {/* Player name pill underneath */}
      {playerName && (
        <div
          className="mt-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold tracking-tight text-white shadow-md border border-white/30 whitespace-nowrap max-w-[96px] truncate z-30"
          style={{ backgroundColor: 'rgba(15, 23, 42, 0.9)' }}
        >
          {playerName}
        </div>
      )}
    </motion.div>
  );
};

export default CharacterToken;
