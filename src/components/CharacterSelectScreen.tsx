import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Users, Volume2, Sparkles, Check } from 'lucide-react';
import { CHARACTERS } from '../data/characters';
import { CharacterToken } from './CharacterToken';
import { playCharacterSound } from '../utils/sound';
import type { CharacterId, AnimationState } from '../types/game';

interface SelectedCharacterEntry {
  characterId: CharacterId;
  customName: string;
}

interface CharacterSelectScreenProps {
  onStartGame: (selected: { characterId: CharacterId; name: string }[]) => void;
}

export const CharacterSelectScreen: React.FC<CharacterSelectScreenProps> = ({
  onStartGame,
}) => {
  const [selected, setSelected] = useState<SelectedCharacterEntry[]>([
    { characterId: 'korstnapuhkija', customName: 'Korstnapühkija' },
    { characterId: 'kloun', customName: 'Kloun' },
    { characterId: 'the_nadim', customName: 'The Nadim' },
    { characterId: 'siil', customName: 'Siil' },
  ]);

  const [previewStates, setPreviewStates] = useState<
    Record<string, AnimationState>
  >({});

  const toggleCharacter = (charId: CharacterId, defaultName: string) => {
    playCharacterSound(charId, 'move');
    setSelected((prev) => {
      const exists = prev.some((item) => item.characterId === charId);
      if (exists) {
        return prev.filter((item) => item.characterId !== charId);
      }
      return [...prev, { characterId: charId, customName: defaultName }];
    });
  };

  const triggerPreview = (
    e: React.MouseEvent,
    charId: CharacterId,
    action: 'move' | 'mishap' | 'ladderUp' | 'ladderDown'
  ) => {
    e.stopPropagation();
    playCharacterSound(charId, action);
    setPreviewStates((prev) => ({ ...prev, [charId]: action }));
    setTimeout(() => {
      setPreviewStates((prev) => ({ ...prev, [charId]: 'idle' }));
    }, 1100);
  };

  const selectAllTwelve = () => {
    const all = CHARACTERS.map((c) => ({
      characterId: c.id,
      customName: c.name,
    }));
    setSelected(all);
    playCharacterSound('kloun', 'ladderUp');
  };

  const clearSelection = () => {
    setSelected([]);
  };

  const handleStart = () => {
    if (selected.length < 1) return;
    onStartGame(
      selected.map((s) => ({
        characterId: s.characterId,
        name: s.customName.trim() || s.characterId,
      }))
    );
  };

  return (
    <div className="relative z-10 min-h-screen flex flex-col items-center justify-between px-4 py-6 max-w-7xl mx-auto">
      {/* Circus Header */}
      <div className="text-center mb-5">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-gradient-to-r from-red-600/80 via-amber-500/80 to-purple-600/80 border border-amber-300/60 shadow-lg mb-2"
        >
          <Sparkles className="w-5 h-5 text-yellow-200" />
          <span className="text-sm font-black uppercase tracking-widest text-white">
            Tsirkuse Joomismäng • 60 Ruutu • 150 Ülesannet
          </span>
          <Sparkles className="w-5 h-5 text-yellow-200" />
        </motion.div>

        <h1 className="text-4xl md:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-rose-400 to-purple-300 drop-shadow-[0_4px_20px_rgba(245,158,11,0.4)]">
          VALI OMA KARAKTERID
        </h1>
        <p className="text-slate-300 text-base md:text-lg mt-1 font-medium">
          Vali mängijad (kuni 12 karakterit). Kliki tegelasel, et lisada ta mängu!
        </p>
      </div>

      {/* Quick Action Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-5">
        <button
          onClick={selectAllTwelve}
          className="px-4 py-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/35 border border-amber-400/50 text-amber-200 font-bold text-sm transition cursor-pointer flex items-center gap-2"
        >
          <Users className="w-4 h-4" />
          <span>Vali kõik 12 karakterit</span>
        </button>
        {selected.length > 0 && (
          <button
            onClick={clearSelection}
            className="px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-700 border border-slate-600 text-slate-300 font-bold text-sm transition cursor-pointer"
          >
            Tühjenda valik ({selected.length}/12)
          </button>
        )}
      </div>

      {/* 12 Character Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 w-full mb-6">
        {CHARACTERS.map((char) => {
          const orderIndex = selected.findIndex(
            (s) => s.characterId === char.id
          );
          const isSelected = orderIndex !== -1;
          const animState = previewStates[char.id] || 'idle';

          return (
            <motion.div
              key={char.id}
              whileHover={{ y: -4 }}
              onClick={() => toggleCharacter(char.id, char.name)}
              className={`group relative rounded-2xl overflow-hidden border-2 transition-all cursor-pointer flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-b from-purple-900/90 to-slate-900/95 border-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.35)]'
                  : 'bg-slate-900/75 hover:bg-slate-900/90 border-white/15 opacity-80 hover:opacity-100'
              }`}
            >
              {/* Selection Order Badge */}
              {isSelected && (
                <div className="absolute top-2.5 left-2.5 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 font-black text-xs shadow-md">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                  <span>#{orderIndex + 1}</span>
                </div>
              )}

              {/* Sound & Mishap Test Button */}
              <button
                type="button"
                title="Proovi häält ja äparduse animatsiooni"
                onClick={(e) => triggerPreview(e, char.id, 'mishap')}
                className="absolute top-2.5 right-2.5 z-20 p-1.5 rounded-full bg-black/60 hover:bg-amber-400 hover:text-slate-950 text-amber-300 border border-white/20 transition cursor-pointer"
              >
                <Volume2 className="w-4 h-4" />
              </button>

              {/* Full Photo Backdrop + Big Face Token Preview */}
              <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                <img
                  src={char.fullImage}
                  alt={char.name}
                  className="w-full h-full object-cover object-top opacity-55 group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />

                {/* Token Preview with Big Face */}
                <div className="absolute bottom-2 inset-x-0 flex justify-center">
                  <CharacterToken
                    character={char}
                    animationState={animState}
                    isActive={isSelected}
                    size="md"
                  />
                </div>
              </div>

              {/* Character Name & Custom Player Name */}
              <div className="p-3 text-center">
                <div
                  className="font-black text-base tracking-wide truncate"
                  style={{ color: isSelected ? '#fde047' : '#ffffff' }}
                >
                  {char.name}
                </div>

                {isSelected ? (
                  <input
                    type="text"
                    value={selected[orderIndex]?.customName || ''}
                    onClick={(e) => e.stopPropagation()}
                    onChange={(e) => {
                      const val = e.target.value;
                      setSelected((prev) =>
                        prev.map((item) =>
                          item.characterId === char.id
                            ? { ...item, customName: val }
                            : item
                        )
                      );
                    }}
                    placeholder="Mängija nimi..."
                    className="mt-1.5 w-full rounded-lg bg-black/50 border border-amber-400/50 px-2 py-1 text-xs text-center text-white font-semibold focus:outline-none focus:border-amber-300"
                  />
                ) : (
                  <div className="mt-1.5 text-xs text-slate-400 font-medium">
                    Kliki valimiseks
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Start Game Footer Button */}
      <div className="w-full max-w-md">
        <button
          disabled={selected.length === 0}
          onClick={handleStart}
          className="w-full py-4 px-8 rounded-2xl bg-gradient-to-r from-amber-400 via-orange-500 to-rose-500 hover:from-amber-300 hover:to-rose-400 disabled:opacity-40 disabled:pointer-events-none text-slate-950 font-black text-2xl tracking-wide shadow-[0_0_35px_rgba(245,158,11,0.5)] transition-all flex items-center justify-center gap-3 cursor-pointer"
        >
          <Play className="w-7 h-7 fill-slate-950" />
          <span>ALUSTA MÄNGU ({selected.length} mängijat)</span>
        </button>
      </div>
    </div>
  );
};
