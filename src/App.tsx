import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dices,
  Volume2,
  VolumeX,
  RotateCcw,
  Users,
  Trophy,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';
import { PartyBackground } from './components/PartyBackground';
import { CharacterSelectScreen } from './components/CharacterSelectScreen';
import { CircusBoard } from './components/CircusBoard';
import { ChallengePopup } from './components/ChallengePopup';
import { CHARACTER_MAP } from './data/characters';
import {
  LADDERS,
  generateBoardChallenges,
  getRandomChallenge,
} from './data/challenges';
import {
  playCharacterSound,
  playDiceRollSound,
  playSameRollDrinkSound,
  playWinSound,
  isMuted,
  toggleMute,
} from './utils/sound';
import type {
  Player,
  CharacterId,
  AnimationState,
  Challenge,
} from './types/game';

const DICE_FACES = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function App() {
  const [screen, setScreen] = useState<'select' | 'game'>('select');
  const [muted, setMutedState] = useState<boolean>(isMuted());

  const [players, setPlayers] = useState<Player[]>([]);
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0);
  const [activeAnimationState, setActiveAnimationState] =
    useState<AnimationState>('idle');

  const [boardChallenges, setBoardChallenges] = useState<
    Record<number, Challenge>
  >(() => generateBoardChallenges());
  const [completedSquares, setCompletedSquares] = useState<number[]>([1]);
  const [usedChallengeIds, setUsedChallengeIds] = useState<number[]>([]);

  const [diceValue, setDiceValue] = useState<number | null>(null);
  const [previousDiceValue, setPreviousDiceValue] = useState<number | null>(
    null
  );
  const [previousRollerName, setPreviousRollerName] = useState<string | null>(
    null
  );
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [isMoving, setIsMoving] = useState<boolean>(false);
  const [mishapBanner, setMishapBanner] = useState<string | null>(null);
  const [sameRollAlert, setSameRollAlert] = useState<number | null>(null);

  // Popup state
  const [popupOpen, setPopupOpen] = useState<boolean>(false);
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(
    null
  );
  const [popupSameRollDrinks, setPopupSameRollDrinks] = useState<number | null>(
    null
  );
  const [popupLadderEvent, setPopupLadderEvent] = useState<{
    type: 'up' | 'down';
    from: number;
    to: number;
  } | null>(null);
  const [popupRevisited, setPopupRevisited] = useState<boolean>(false);
  const [winner, setWinner] = useState<Player | null>(null);

  const movingLockRef = useRef(false);

  const handleToggleMute = () => {
    const next = toggleMute();
    setMutedState(next);
  };

  const handleStartGame = (
    selected: { characterId: CharacterId; name: string }[]
  ) => {
    const initialPlayers: Player[] = selected.map((s, idx) => ({
      id: `player-${idx}-${s.characterId}`,
      characterId: s.characterId,
      name: s.name,
      position: 1,
      visitedSquares: [1],
    }));

    setPlayers(initialPlayers);
    setActivePlayerIndex(0);
    setBoardChallenges(generateBoardChallenges());
    setCompletedSquares([1]);
    setUsedChallengeIds([]);
    setDiceValue(null);
    setPreviousDiceValue(null);
    setPreviousRollerName(null);
    setSameRollAlert(null);
    setWinner(null);
    setPopupOpen(false);
    setScreen('game');
  };

  const handleResetGame = () => {
    setPlayers((prev) =>
      prev.map((p) => ({
        ...p,
        position: 1,
        visitedSquares: [1],
      }))
    );
    setActivePlayerIndex(0);
    setBoardChallenges(generateBoardChallenges());
    setCompletedSquares([1]);
    setUsedChallengeIds([]);
    setDiceValue(null);
    setPreviousDiceValue(null);
    setPreviousRollerName(null);
    setSameRollAlert(null);
    setWinner(null);
    setPopupOpen(false);
  };

  const handleRollDice = async () => {
    if (isRolling || isMoving || popupOpen || movingLockRef.current) return;
    const currentPlayer = players[activePlayerIndex];
    if (!currentPlayer) return;

    movingLockRef.current = true;
    setIsRolling(true);
    setSameRollAlert(null);
    setMishapBanner(null);

    playDiceRollSound();

    // Quick dice tumble animation
    for (let i = 0; i < 7; i++) {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      await sleep(65);
    }

    const rolled = Math.floor(Math.random() * 6) + 1;
    setDiceValue(rolled);
    setIsRolling(false);
    setIsMoving(true);

    // Check if rolled the exact same number as the previous player!
    const matchedPrevious =
      previousDiceValue !== null && rolled === previousDiceValue;
    if (matchedPrevious) {
      playSameRollDrinkSound();
      setSameRollAlert(rolled);
      await sleep(900);
    }

    const charConfig = CHARACTER_MAP[currentPlayer.characterId];
    const startPos = currentPlayer.position;
    let targetPos = Math.min(60, startPos + rolled);
    const totalSteps = targetPos - startPos;

    // 5% chance of a funny mishap mid-move; if it happens, player jumps back 1 square and stops there!
    const shouldDoMishap = totalSteps >= 1 && Math.random() < 0.05;
    const mishapAtStep = shouldDoMishap
      ? Math.max(1, Math.ceil(totalSteps / 2))
      : -1;

    let currentPos = startPos;
    for (let step = 1; step <= totalSteps; step++) {
      currentPos += 1;
      setActiveAnimationState('move');
      playCharacterSound(currentPlayer.characterId, 'move');

      const nextPosSnapshot = currentPos;
      setPlayers((prev) =>
        prev.map((p, idx) =>
          idx === activePlayerIndex ? { ...p, position: nextPosSnapshot } : p
        )
      );
      await sleep(360);

      // 5% Mishap: jumps 1 tile back and stays right there (does not continue moving forward)
      if (step === mishapAtStep && currentPos > 1) {
        setActiveAnimationState('mishap');
        playCharacterSound(currentPlayer.characterId, 'mishap');
        setMishapBanner(
          `${currentPlayer.name}: ${charConfig.mishapLabel}`
        );

        const stepBackPos = currentPos - 1;
        currentPos = stepBackPos;
        targetPos = stepBackPos;
        setPlayers((prev) =>
          prev.map((p, idx) =>
            idx === activePlayerIndex ? { ...p, position: stepBackPos } : p
          )
        );
        await sleep(750);
        setMishapBanner(null);
        break;
      }
    }

    // Check if landed on a ladder
    let finalPos = targetPos;
    let triggeredLadder: {
      type: 'up' | 'down';
      from: number;
      to: number;
    } | null = null;

    const ladder = LADDERS.find((l) => l.from === targetPos);
    if (ladder) {
      await sleep(250);
      const ladderAnim: AnimationState =
        ladder.type === 'up' ? 'ladderUp' : 'ladderDown';
      setActiveAnimationState(ladderAnim);
      playCharacterSound(currentPlayer.characterId, ladderAnim);

      finalPos = ladder.to;
      triggeredLadder = {
        type: ladder.type,
        from: ladder.from,
        to: ladder.to,
      };

      setPlayers((prev) =>
        prev.map((p, idx) =>
          idx === activePlayerIndex ? { ...p, position: finalPos } : p
        )
      );
      await sleep(850);
    }

    setActiveAnimationState('idle');

    // Check if ANY player has already completed this square earlier in the game,
    // or if this square's challenge has already been used in this game.
    const alreadyDoneOnBoard =
      completedSquares.includes(finalPos) ||
      currentPlayer.visitedSquares.includes(finalPos);
    const boardChallenge = boardChallenges[finalPos];
    const allBoardChallengeIds = Object.values(boardChallenges).map(
      (c) => c.id
    );
    const excludedIds = Array.from(
      new Set([...usedChallengeIds, ...allBoardChallengeIds])
    );

    const chosenChallenge =
      alreadyDoneOnBoard ||
      !boardChallenge ||
      usedChallengeIds.includes(boardChallenge.id)
        ? getRandomChallenge(excludedIds)
        : boardChallenge;

    // Update board challenge to the newly picked one, mark square as completed & challenge as used
    setBoardChallenges((prev) => ({
      ...prev,
      [finalPos]: chosenChallenge,
    }));
    setCompletedSquares((prev) =>
      prev.includes(finalPos) ? prev : [...prev, finalPos]
    );
    setUsedChallengeIds((prev) =>
      prev.includes(chosenChallenge.id) ? prev : [...prev, chosenChallenge.id]
    );

    // Record square as visited for this player
    setPlayers((prev) =>
      prev.map((p, idx) =>
        idx === activePlayerIndex
          ? {
              ...p,
              position: finalPos,
              visitedSquares: p.visitedSquares.includes(finalPos)
                ? p.visitedSquares
                : [...p.visitedSquares, finalPos],
            }
          : p
      )
    );

    // Save roll for next player's comparison
    setPreviousDiceValue(rolled);
    setPreviousRollerName(currentPlayer.name);

    // Open challenge popup
    setActiveChallenge(chosenChallenge);
    setPopupSameRollDrinks(matchedPrevious ? rolled : null);
    setPopupLadderEvent(triggeredLadder);
    setPopupRevisited(alreadyDoneOnBoard && finalPos !== 1);
    setPopupOpen(true);

    setIsMoving(false);
    movingLockRef.current = false;
  };

  const handleCompleteChallenge = () => {
    setPopupOpen(false);
    setSameRollAlert(null);

    const currentPlayer = players[activePlayerIndex];
    if (currentPlayer && currentPlayer.position >= 60) {
      playWinSound();
      setWinner(currentPlayer);
      return;
    }

    setActivePlayerIndex((prev) => (prev + 1) % players.length);
  };

  const activePlayer = players[activePlayerIndex];
  const activeCharacter = activePlayer
    ? CHARACTER_MAP[activePlayer.characterId]
    : null;

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden select-none">
      {/* Festive Alcohol & Circus Party Background */}
      <PartyBackground />

      {/* Top Floating Mute Toggle */}
      <div className="fixed top-3 right-4 z-50 flex items-center gap-2">
        {screen === 'game' && (
          <>
            <button
              onClick={() => setScreen('select')}
              className="px-3 py-2 rounded-xl bg-slate-900/85 hover:bg-slate-800 border border-white/20 text-xs font-bold text-slate-200 flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <Users className="w-4 h-4 text-amber-400" />
              <span>Karakterid</span>
            </button>
            <button
              onClick={handleResetGame}
              className="px-3 py-2 rounded-xl bg-slate-900/85 hover:bg-slate-800 border border-white/20 text-xs font-bold text-slate-200 flex items-center gap-1.5 shadow-lg cursor-pointer"
            >
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Uus mäng</span>
            </button>
          </>
        )}

        <button
          onClick={handleToggleMute}
          title={muted ? 'Lülita heli sisse' : 'Vaigista heli'}
          className="p-2.5 rounded-xl bg-slate-900/85 hover:bg-slate-800 border border-amber-400/50 text-amber-300 shadow-lg cursor-pointer"
        >
          {muted ? (
            <VolumeX className="w-5 h-5 text-rose-400" />
          ) : (
            <Volume2 className="w-5 h-5 text-amber-300" />
          )}
        </button>
      </div>

      {/* Screen 1: Character Selection */}
      {screen === 'select' && (
        <CharacterSelectScreen onStartGame={handleStartGame} />
      )}

      {/* Screen 2: Main Circus Game Board */}
      {screen === 'game' && activePlayer && activeCharacter && (
        <div className="relative z-10 h-screen w-full flex flex-col lg:flex-row items-center justify-between gap-3 px-3 py-3 max-w-[1650px] mx-auto">
          {/* Left / Top Control Sidebar: Active Player, Dice Roller & Turn Order */}
          <div className="w-full lg:w-72 shrink-0 flex flex-col gap-3 bg-slate-950/85 backdrop-blur-md border-2 border-amber-400/60 rounded-3xl p-4 shadow-2xl">
            {/* Title */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div>
                <h2 className="text-lg font-black tracking-wide text-amber-300 leading-tight">
                  🎪 TSIRKUSE PIDU
                </h2>
                <p className="text-[11px] text-slate-400 font-semibold">
                  Redel üles = anna lonks • Alla = joo lonks
                </p>
              </div>
            </div>

            {/* Active Player Spotlight */}
            <div className="flex items-center gap-3 bg-gradient-to-r from-purple-950/90 to-slate-900/90 p-3 rounded-2xl border border-amber-400/40">
              <img
                src={activeCharacter.faceImage}
                alt={activePlayer.name}
                className="w-16 h-16 rounded-full object-cover border-3 shadow-md shrink-0"
                style={{ borderColor: activeCharacter.color }}
              />
              <div className="min-w-0">
                <div className="text-xs uppercase font-bold tracking-wider text-amber-300">
                  Praegu veeretab:
                </div>
                <div className="text-lg font-black text-white truncate">
                  {activePlayer.name}
                </div>
                <div className="text-xs font-bold text-slate-300">
                  Ruut #{activePlayer.position} / 60
                </div>
              </div>
            </div>

            {/* Dice Box */}
            <div className="flex flex-col items-center bg-slate-900/90 rounded-2xl p-3 border border-white/10">
              <div className="flex items-center justify-between w-full text-xs text-slate-400 font-bold mb-2 px-1">
                <span>
                  Eelmine vise:{' '}
                  <strong className="text-amber-300">
                    {previousDiceValue ?? '–'}
                  </strong>
                  {previousRollerName ? ` (${previousRollerName})` : ''}
                </span>
                <span>Sama arv = jood!</span>
              </div>

              {/* Animated Dice Cube */}
              <motion.div
                key={diceValue ?? 'empty'}
                animate={
                  isRolling
                    ? { rotate: [0, 180, 360], scale: [1, 1.18, 0.95, 1] }
                    : { scale: [0.9, 1.08, 1] }
                }
                transition={{ duration: 0.25 }}
                className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white to-amber-100 text-slate-950 flex items-center justify-center text-6xl shadow-[0_0_25px_rgba(251,191,36,0.5)] border-4 border-amber-400 mb-3 select-none"
              >
                {diceValue ? DICE_FACES[diceValue - 1] : '🎲'}
              </motion.div>

              {/* Same Roll Immediate Alert */}
              <AnimatePresence>
                {sameRollAlert && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="w-full mb-2.5 rounded-xl bg-red-600 border border-yellow-300 px-3 py-1.5 text-center text-xs font-black text-white shadow-lg"
                  >
                    🍻 Sama arv mis eelmisel! Joo {sameRollAlert} lonksu!
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                disabled={isRolling || isMoving || popupOpen}
                onClick={handleRollDice}
                className="w-full py-3.5 px-5 rounded-xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 hover:from-amber-300 hover:to-rose-400 disabled:opacity-45 text-slate-950 font-black text-base tracking-wide shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Dices className="w-5 h-5" />
                <span>
                  {isRolling
                    ? 'Veereb...'
                    : isMoving
                    ? 'Liigub...'
                    : 'VEERETA TÄRINGUT'}
                </span>
              </button>
            </div>

            {/* Compact Player Standings List */}
            <div className="flex-1 min-h-0 flex flex-col">
              <div className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-1.5 px-1">
                Mängijad ({players.length})
              </div>
              <div className="space-y-1.5 overflow-y-auto max-h-48 lg:max-h-64 pr-1">
                {players.map((p, idx) => {
                  const c = CHARACTER_MAP[p.characterId];
                  const isTurn = idx === activePlayerIndex;
                  return (
                    <div
                      key={p.id}
                      className={`flex items-center justify-between px-2.5 py-1.5 rounded-xl border text-xs transition ${
                        isTurn
                          ? 'bg-amber-400/20 border-amber-400 text-white font-black'
                          : 'bg-slate-900/60 border-white/10 text-slate-300 font-semibold'
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <img
                          src={c.faceImage}
                          alt={p.name}
                          className="w-7 h-7 rounded-full object-cover border shrink-0"
                          style={{ borderColor: c.color }}
                        />
                        <span className="truncate">{p.name}</span>
                      </div>
                      <span className="px-2 py-0.5 rounded-full bg-black/40 text-amber-300 font-bold shrink-0">
                        #{p.position}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ladder Legend */}
            <div className="grid grid-cols-2 gap-1.5 text-[11px] font-bold pt-1 border-t border-white/10">
              <div className="flex items-center gap-1 text-emerald-300 bg-emerald-950/60 px-2 py-1 rounded-lg border border-emerald-500/30">
                <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                <span>Üles: Anna lonks</span>
              </div>
              <div className="flex items-center gap-1 text-rose-300 bg-rose-950/60 px-2 py-1 rounded-lg border border-rose-500/30">
                <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
                <span>Alla: Võta lonks</span>
              </div>
            </div>
          </div>

          {/* Right / Main Area: 60-Circle Circus Board */}
          <div className="flex-1 w-full h-full flex items-center justify-center min-w-0">
            <CircusBoard
              players={players}
              activePlayerIndex={activePlayerIndex}
              activeAnimationState={activeAnimationState}
              boardChallenges={boardChallenges}
              completedSquares={completedSquares}
              mishapBanner={mishapBanner}
            />
          </div>
        </div>
      )}

      {/* Square Challenge Popup Modal */}
      {activePlayer && activeCharacter && (
        <ChallengePopup
          isOpen={popupOpen}
          playerName={activePlayer.name}
          character={activeCharacter}
          squareNumber={activePlayer.position}
          challenge={activeChallenge}
          sameRollDrinkCount={popupSameRollDrinks}
          ladderEvent={popupLadderEvent}
          wasRevisitedSquare={popupRevisited}
          onComplete={handleCompleteChallenge}
        />
      )}

      {/* Winner Celebration Modal */}
      <AnimatePresence>
        {winner && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4"
          >
            <motion.div
              initial={{ scale: 0.8, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="max-w-md w-full rounded-3xl bg-gradient-to-b from-amber-500 via-rose-600 to-purple-950 p-8 text-center border-4 border-yellow-300 shadow-[0_0_70px_rgba(251,191,36,0.6)]"
            >
              <Trophy className="w-16 h-16 text-yellow-200 mx-auto mb-3 animate-bounce" />
              <h2 className="text-3xl font-black text-white mb-2">
                TSIRKUSE KUNINGAS!
              </h2>
              <img
                src={CHARACTER_MAP[winner.characterId].faceImage}
                alt={winner.name}
                className="w-28 h-28 rounded-full object-cover mx-auto my-4 border-4 border-yellow-300 shadow-2xl"
              />
              <p className="text-2xl font-black text-yellow-200 mb-6">
                {winner.name} jõudis ruudule #60!
              </p>
              <div className="flex gap-3">
                <button
                  onClick={handleResetGame}
                  className="flex-1 py-3.5 rounded-2xl bg-yellow-300 hover:bg-yellow-200 text-slate-950 font-black text-lg cursor-pointer"
                >
                  Uus mäng
                </button>
                <button
                  onClick={() => {
                    setWinner(null);
                    setScreen('select');
                  }}
                  className="flex-1 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-white font-bold text-lg border border-white/20 cursor-pointer"
                >
                  Vali karakterid
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
