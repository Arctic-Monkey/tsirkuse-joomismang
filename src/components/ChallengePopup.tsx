import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Flame, ArrowUpCircle, ArrowDownCircle, Dices, Sparkles } from 'lucide-react';
import type { Challenge, CharacterConfig } from '../types/game';

interface ChallengePopupProps {
  isOpen: boolean;
  playerName: string;
  character: CharacterConfig;
  squareNumber: number;
  challenge: Challenge | null;
  sameRollDrinkCount: number | null;
  ladderEvent: { type: 'up' | 'down'; from: number; to: number } | null;
  wasRevisitedSquare: boolean;
  onComplete: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  never_have_i_ever: 'from-pink-600 to-rose-600 border-pink-400',
  who_in_group: 'from-purple-600 to-indigo-600 border-purple-400',
  duel: 'from-orange-600 to-red-600 border-orange-400',
  everyone_who: 'from-emerald-600 to-teal-600 border-emerald-400',
  do_or_drink: 'from-amber-500 to-orange-600 border-amber-300',
  special_rule: 'from-fuchsia-600 to-purple-700 border-fuchsia-400',
};

export const ChallengePopup: React.FC<ChallengePopupProps> = ({
  isOpen,
  playerName,
  character,
  squareNumber,
  challenge,
  sameRollDrinkCount,
  ladderEvent,
  wasRevisitedSquare,
  onComplete,
}) => {
  return (
    <AnimatePresence>
      {isOpen && challenge && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-slate-900 via-purple-950 to-slate-950 border-2 border-amber-400/60 shadow-[0_0_60px_rgba(245,158,11,0.3)] p-6 md:p-8 text-center overflow-hidden"
            initial={{ scale: 0.8, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 20, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          >
            {/* Player Header */}
            <div className="flex flex-col items-center gap-2 mb-5">
              <div
                className="relative w-20 h-20 rounded-full overflow-hidden border-4 shadow-xl"
                style={{ borderColor: character.color }}
              >
                <img
                  src={character.faceImage}
                  alt={playerName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-xl font-black tracking-wide text-white">
                {playerName}{' '}
                <span className="text-amber-400 font-bold">• Ruut #{squareNumber}</span>
              </div>
            </div>

            {/* Extra Consequence Alerts (Same Dice Roll & Ladder Consequences) */}
            {(sameRollDrinkCount || ladderEvent) && (
              <div className="flex flex-col gap-2.5 mb-5">
                {sameRollDrinkCount && (
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ repeat: Infinity, duration: 1.6 }}
                    className="flex items-center justify-center gap-2 rounded-2xl bg-red-600/90 border border-red-300 px-4 py-2.5 text-white font-extrabold shadow-lg"
                  >
                    <Dices className="w-5 h-5 shrink-0 text-yellow-300" />
                    <span>
                      Sama vise mis eelmisel mängijal ({sameRollDrinkCount})! Joo {sameRollDrinkCount} lonksu!
                    </span>
                  </motion.div>
                )}

                {ladderEvent?.type === 'up' && (
                  <div className="flex items-center justify-center gap-2 rounded-2xl bg-emerald-600/90 border border-emerald-300 px-4 py-2.5 text-white font-extrabold shadow-lg">
                    <ArrowUpCircle className="w-5 h-5 shrink-0 text-yellow-200" />
                    <span>
                      Redel üles ({ladderEvent.from} → {ladderEvent.to})! Anna 1 lonks kellelegi!
                    </span>
                  </div>
                )}

                {ladderEvent?.type === 'down' && (
                  <div className="flex items-center justify-center gap-2 rounded-2xl bg-rose-700/95 border border-rose-300 px-4 py-2.5 text-white font-extrabold shadow-lg">
                    <ArrowDownCircle className="w-5 h-5 shrink-0 text-yellow-200" />
                    <span>
                      Redel alla ({ladderEvent.from} → {ladderEvent.to})! Võta 1 lonks!
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Challenge Card */}
            <div
              className={`rounded-2xl bg-gradient-to-br ${
                CATEGORY_COLORS[challenge.category] || 'from-purple-700 to-indigo-800 border-purple-400'
              } border-2 p-6 shadow-inner mb-6`}
            >
              <div className="flex items-center justify-center gap-1.5 text-xs uppercase tracking-widest font-black text-white/90 mb-1">
                <Flame className="w-4 h-4 text-yellow-300" />
                <span>{challenge.categoryTitle}</span>
              </div>

              <div className="text-sm font-semibold text-yellow-200 mb-4">
                {challenge.categoryRule}
              </div>

              <p className="text-2xl md:text-3xl font-black text-white leading-snug drop-shadow">
                „{challenge.text}“
              </p>

              {wasRevisitedSquare && (
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1 text-xs font-bold text-amber-200">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>See ruut oli juba tehtud — arvuti valis uue suvalise ülesande!</span>
                </div>
              )}
            </div>

            {/* Done Button */}
            <button
              onClick={onComplete}
              className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 active:scale-98 text-slate-950 font-black text-xl tracking-wide shadow-[0_0_25px_rgba(251,191,36,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Check className="w-6 h-6 stroke-[3]" />
              <span>Tehtud</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
