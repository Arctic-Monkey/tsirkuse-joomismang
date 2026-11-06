import React from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { LADDERS } from '../data/challenges';
import { CHARACTER_MAP } from '../data/characters';
import { CharacterToken } from './CharacterToken';
import type {
  Player,
  Challenge,
  AnimationState,
} from '../types/game';

interface CircusBoardProps {
  players: Player[];
  activePlayerIndex: number;
  activeAnimationState: AnimationState;
  boardChallenges: Record<number, Challenge>;
  completedSquares: number[];
  mishapBanner: string | null;
}

export function getSquareCoords(square: number) {
  const clamped = Math.max(1, Math.min(60, square));
  const rowFromBottom = Math.floor((clamped - 1) / 10); // 0..5
  const visualRow = 5 - rowFromBottom; // 0 is top, 5 is bottom
  const idxInRow = (clamped - 1) % 10; // 0..9
  const col = rowFromBottom % 2 === 0 ? idxInRow : 9 - idxInRow;
  const xPct = (col + 0.5) * 10; // 5..95
  const yPct = (visualRow + 0.5) * (100 / 6); // 8.33..91.67
  return { row: visualRow, col, xPct, yPct };
}

export const CircusBoard: React.FC<CircusBoardProps> = ({
  players,
  activePlayerIndex,
  activeAnimationState,
  completedSquares,
  mishapBanner,
}) => {
  // Build visual grid of 6 rows x 10 cols (clean Tsirkus checkerboard layout)
  const gridCells: { sq: number; visualRow: number; col: number }[] = [];
  for (let visualRow = 0; visualRow < 6; visualRow++) {
    const rowFromBottom = 5 - visualRow;
    for (let col = 0; col < 10; col++) {
      const idxInRow = rowFromBottom % 2 === 0 ? col : 9 - col;
      const sq = rowFromBottom * 10 + idxInRow + 1;
      gridCells.push({ sq, visualRow, col });
    }
  }

  // Group players by square to compute offsets when multiple players share a square
  const playersBySquare: Record<number, Player[]> = {};
  players.forEach((p) => {
    if (!playersBySquare[p.position]) playersBySquare[p.position] = [];
    playersBySquare[p.position].push(p);
  });

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Neon Party Tsirkus Board Frame */}
      <div className="relative w-full aspect-[10/6] max-h-[calc(100vh-36px)] rounded-2xl bg-slate-950/90 backdrop-blur-md p-2.5 md:p-3.5 shadow-[0_0_50px_rgba(168,85,247,0.45)] border-2 border-fuchsia-500/70">
        {/* Mishap Floating Toast Banner */}
        {mishapBanner && (
          <motion.div
            initial={{ y: -30, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -20, opacity: 0 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-40 px-5 py-2 rounded-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-amber-400 text-slate-950 font-black text-sm md:text-base shadow-[0_0_30px_rgba(236,72,153,0.8)] border-2 border-white"
          >
            🎪 {mishapBanner}
          </motion.div>
        )}

        {/* Inner Board Area: 10x6 Neon Checkerboard + Clean Neon Ladders + Tokens */}
        <div className="relative w-full h-full border-2 border-cyan-400/50 overflow-hidden rounded-xl shadow-inner">
          {/* 10x6 Clean Neon Checkerboard Grid */}
          <div className="grid grid-cols-10 grid-rows-6 w-full h-full">
            {gridCells.map(({ sq, visualRow, col }) => {
              const isAlt = (visualRow + col) % 2 === 1;
              const isFinish = sq === 60;
              const isStart = sq === 1;
              const isCompleted = completedSquares.includes(sq) && sq > 1;
              const ladderStart = LADDERS.find((l) => l.from === sq);

              let cellStyle = isAlt
                ? 'bg-purple-950/75 border-fuchsia-500/25'
                : 'bg-slate-900/80 border-cyan-500/25';

              if (isFinish) {
                cellStyle =
                  'bg-gradient-to-br from-fuchsia-600/80 via-purple-800/90 to-amber-500/80 border-amber-300';
              } else if (isStart) {
                cellStyle =
                  'bg-gradient-to-br from-cyan-900/80 to-emerald-900/80 border-cyan-400/60';
              }

              return (
                <div
                  key={sq}
                  className={`relative border select-none p-1.5 flex flex-col justify-between ${cellStyle}`}
                >
                  {/* Top Row: Clean Corner Number & Minimal Badge */}
                  <div className="flex items-start justify-between w-full z-10">
                    {isFinish ? (
                      <div className="w-full flex flex-col items-center justify-center pt-1">
                        <div className="w-11 h-11 md:w-14 md:h-14 rounded-full bg-slate-950/90 border-2 border-amber-300 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.8)]">
                          <span className="text-sm md:text-base font-black text-amber-300 leading-none">
                            60
                          </span>
                          <Trophy className="w-3.5 h-3.5 text-fuchsia-400 mt-0.5" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <span
                          className={`text-sm md:text-base lg:text-lg font-black leading-none tracking-tight ${
                            isAlt
                              ? 'text-fuchsia-300 drop-shadow-[0_0_6px_rgba(232,121,249,0.5)]'
                              : 'text-cyan-300 drop-shadow-[0_0_6px_rgba(34,211,238,0.5)]'
                          }`}
                        >
                          {sq}
                        </span>

                        {isStart && (
                          <span className="px-1.5 py-0.5 rounded bg-cyan-400/20 border border-cyan-400 text-cyan-200 text-[9px] font-black uppercase tracking-wider shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                            START
                          </span>
                        )}

                        {!isStart && ladderStart?.type === 'up' && (
                          <span className="px-1.5 py-0.5 rounded bg-emerald-500/25 border border-emerald-400 text-emerald-300 text-[10px] font-black shadow-[0_0_10px_rgba(52,211,153,0.4)]">
                            ↑{ladderStart.to}
                          </span>
                        )}

                        {!isStart && ladderStart?.type === 'down' && (
                          <span className="px-1.5 py-0.5 rounded bg-rose-500/25 border border-rose-400 text-rose-300 text-[10px] font-black shadow-[0_0_10px_rgba(251,113,133,0.4)]">
                            ↓{ladderStart.to}
                          </span>
                        )}

                        {!isStart && !ladderStart && isCompleted && (
                          <span
                            title="Tehtud ruut – järgmine sattuja saab uue suvalise ülesande"
                            className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.9)]"
                          />
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Clean Neon Ladders Overlay (Cyan/Emerald Up Ladders, Neon Pink/Crimson Down Ladders) */}
          <svg
            viewBox="0 0 1000 600"
            preserveAspectRatio="none"
            className="absolute inset-0 w-full h-full pointer-events-none z-10"
          >
            <defs>
              <filter id="neonLadderGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="#000" floodOpacity="0.9" />
              </filter>
            </defs>

            {LADDERS.map((ladder) => {
              const start = getSquareCoords(ladder.from);
              const end = getSquareCoords(ladder.to);
              const x1 = start.xPct * 10;
              const y1 = start.yPct * 6;
              const x2 = end.xPct * 10;
              const y2 = end.yPct * 6;

              const dx = x2 - x1;
              const dy = y2 - y1;
              const len = Math.hypot(dx, dy);
              const ux = dx / len;
              const uy = dy / len;

              // Shorten slightly so ladder ends sit neatly inside the squares without covering corner numbers
              const pad = 16;
              const sx = x1 + ux * pad;
              const sy = y1 + uy * pad;
              const ex = x2 - ux * pad;
              const ey = y2 - uy * pad;

              const sdx = ex - sx;
              const sdy = ey - sy;
              const slen = Math.hypot(sdx, sdy);

              const railHalfWidth = 10;
              const nx = (-sdy / slen) * railHalfWidth;
              const ny = (sdx / slen) * railHalfWidth;

              const isUp = ladder.type === 'up';
              const railGlow = isUp ? '#10b981' : '#f43f5e';
              const railCore = isUp ? '#6ee7b7' : '#fda4af';
              const rungColor = isUp ? '#22d3ee' : '#ec4899';
              const numRungs = Math.max(5, Math.floor(slen / 18));

              return (
                <g key={`${ladder.type}-${ladder.from}-${ladder.to}`} filter="url(#neonLadderGlow)">
                  {/* Rungs */}
                  {Array.from({ length: numRungs - 1 }, (_, i) => {
                    const t = (i + 1) / numRungs;
                    const rx = sx + sdx * t;
                    const ry = sy + sdy * t;
                    return (
                      <g key={i}>
                        <line
                          x1={rx + nx}
                          y1={ry + ny}
                          x2={rx - nx}
                          y2={ry - ny}
                          stroke={railGlow}
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                        <line
                          x1={rx + nx}
                          y1={ry + ny}
                          x2={rx - nx}
                          y2={ry - ny}
                          stroke={rungColor}
                          strokeWidth="2.5"
                          strokeLinecap="round"
                        />
                      </g>
                    );
                  })}

                  {/* Left Rail */}
                  <line
                    x1={sx + nx}
                    y1={sy + ny}
                    x2={ex + nx}
                    y2={ey + ny}
                    stroke={railGlow}
                    strokeWidth="6.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1={sx + nx}
                    y1={sy + ny}
                    x2={ex + nx}
                    y2={ey + ny}
                    stroke={railCore}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />

                  {/* Right Rail */}
                  <line
                    x1={sx - nx}
                    y1={sy - ny}
                    x2={ex - nx}
                    y2={ey - ny}
                    stroke={railGlow}
                    strokeWidth="6.5"
                    strokeLinecap="round"
                  />
                  <line
                    x1={sx - nx}
                    y1={sy - ny}
                    x2={ex - nx}
                    y2={ey - ny}
                    stroke={railCore}
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                </g>
              );
            })}
          </svg>

          {/* Floating Animated Player Tokens Layer */}
          <div className="absolute inset-0 pointer-events-none z-20">
            {players.map((player, pIdx) => {
              const char = CHARACTER_MAP[player.characterId];
              if (!char) return null;

              const coords = getSquareCoords(player.position);
              const isActive = pIdx === activePlayerIndex;
              const squareGroup = playersBySquare[player.position] || [player];
              const idxInSquare = squareGroup.findIndex((p) => p.id === player.id);
              const totalOnSquare = squareGroup.length;

              // Spread multiple tokens neatly if sharing a square
              let offsetX = 0;
              let offsetY = 4;
              if (totalOnSquare > 1 && !isActive) {
                const angle = (idxInSquare / totalOnSquare) * Math.PI * 2;
                const radius = totalOnSquare > 4 ? 18 : 13;
                offsetX = Math.cos(angle) * radius;
                offsetY = 4 + Math.sin(angle) * radius;
              }

              const animState: AnimationState = isActive
                ? activeAnimationState
                : 'idle';

              return (
                <motion.div
                  key={player.id}
                  className="absolute -translate-x-1/2 -translate-y-1/2"
                  style={{
                    zIndex: isActive ? 35 : 20 + pIdx,
                  }}
                  animate={{
                    left: `calc(${coords.xPct}% + ${offsetX}px)`,
                    top: `calc(${coords.yPct}% + ${offsetY}px)`,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness:
                      animState === 'ladderUp' || animState === 'ladderDown'
                        ? 90
                        : 240,
                    damping:
                      animState === 'ladderUp' || animState === 'ladderDown'
                        ? 18
                        : 22,
                  }}
                >
                  <CharacterToken
                    character={char}
                    playerName={player.name}
                    animationState={animState}
                    isActive={isActive}
                    size={totalOnSquare > 3 && !isActive ? 'sm' : 'md'}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
