import type { CharacterId } from '../types/game';

let audioCtx: AudioContext | null = null;
let muted: boolean = localStorage.getItem('joomismang_muted') === 'true';

function getCtx(): AudioContext | null {
  if (muted) return null;
  if (!audioCtx && typeof window !== 'undefined') {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume().catch(() => {});
  }
  return audioCtx;
}

export function isMuted(): boolean {
  return muted;
}

export function setMuted(value: boolean): void {
  muted = value;
  localStorage.setItem('joomismang_muted', String(muted));
}

export function toggleMute(): boolean {
  setMuted(!muted);
  return muted;
}

// Helper for noise burst (brush, splash, scratch, etc.)
function playNoiseBurst(
  ctx: AudioContext,
  startTime: number,
  duration: number,
  filterFreq: number,
  filterType: BiquadFilterType = 'bandpass',
  gainVal = 0.18
) {
  const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = filterType;
  filter.frequency.setValueAtTime(filterFreq, startTime);
  filter.Q.setValueAtTime(2.5, startTime);

  const gain = ctx.createGain();
  gain.gain.setValueAtTime(gainVal, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  noise.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  noise.start(startTime);
  noise.stop(startTime + duration);
}

// Helper for single synth tone with pitch sweep
function playTone(
  ctx: AudioContext,
  type: OscillatorType,
  startFreq: number,
  endFreq: number,
  startTime: number,
  duration: number,
  gainVal = 0.16
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(startFreq, startTime);
  if (endFreq !== startFreq) {
    osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq), startTime + duration);
  }
  gain.gain.setValueAtTime(gainVal, startTime);
  gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(startTime);
  osc.stop(startTime + duration);
}

export function playCharacterSound(
  characterId: CharacterId,
  action: 'move' | 'mishap' | 'ladderUp' | 'ladderDown'
): void {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;

  switch (characterId) {
    case 'korstnapuhkija': {
      if (action === 'move') {
        // Soot brush sweep + smoky low whistle
        playNoiseBurst(ctx, now, 0.11, 1400, 'bandpass', 0.2);
        playTone(ctx, 'sine', 320, 440, now + 0.03, 0.12, 0.14);
      } else if (action === 'mishap') {
        // Comical brush-boing flip
        playNoiseBurst(ctx, now, 0.15, 1800, 'bandpass', 0.22);
        playTone(ctx, 'triangle', 190, 580, now + 0.05, 0.22, 0.2);
        playTone(ctx, 'sine', 580, 260, now + 0.25, 0.18, 0.18);
      } else if (action === 'ladderUp') {
        // Chimney flute arpeggio
        [392, 493.88, 587.33, 783.99].forEach((f, i) => {
          playTone(ctx, 'triangle', f, f * 1.03, now + i * 0.09, 0.18, 0.16);
          playNoiseBurst(ctx, now + i * 0.09, 0.05, 2200, 'highpass', 0.06);
        });
      } else {
        // Soot-slide whoosh + cough/thud
        playNoiseBurst(ctx, now, 0.45, 700, 'lowpass', 0.25);
        playTone(ctx, 'sawtooth', 380, 95, now, 0.45, 0.14);
        playTone(ctx, 'triangle', 110, 55, now + 0.42, 0.18, 0.25);
      }
      break;
    }

    case 'valge': {
      if (action === 'move') {
        // Spooky ghost theremin vibrato sine wave
        const osc = ctx.createOscillator();
        const lfo = ctx.createOscillator();
        const lfoGain = ctx.createGain();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(590, now);
        osc.frequency.exponentialRampToValueAtTime(760, now + 0.18);
        lfo.frequency.setValueAtTime(14, now);
        lfoGain.gain.setValueAtTime(28, now);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        lfo.start(now);
        osc.start(now);
        lfo.stop(now + 0.2);
        osc.stop(now + 0.2);
      } else if (action === 'mishap') {
        // Startled high-pitched gasp-boing
        playTone(ctx, 'sine', 480, 1180, now, 0.18, 0.18);
        playTone(ctx, 'sine', 1180, 420, now + 0.18, 0.22, 0.16);
      } else if (action === 'ladderUp') {
        // Ethereal ascending choir shimmer
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
          playTone(ctx, 'sine', f, f * 1.05, now + i * 0.1, 0.28, 0.14);
          playTone(ctx, 'triangle', f * 1.5, f * 1.52, now + i * 0.1, 0.25, 0.07);
        });
      } else {
        // Ghostly wail descending
        playTone(ctx, 'sine', 980, 220, now, 0.55, 0.18);
        playTone(ctx, 'triangle', 995, 210, now + 0.03, 0.55, 0.1);
      }
      break;
    }

    case 'zombie': {
      if (action === 'move') {
        // Grunting low sawtooth growl
        playTone(ctx, 'sawtooth', 115, 82, now, 0.16, 0.16);
        playTone(ctx, 'square', 92, 68, now + 0.02, 0.14, 0.1);
      } else if (action === 'mishap') {
        // Wobbly brain-splat boing
        playTone(ctx, 'sawtooth', 95, 290, now, 0.18, 0.18);
        playNoiseBurst(ctx, now + 0.1, 0.16, 900, 'bandpass', 0.2);
        playTone(ctx, 'sawtooth', 260, 75, now + 0.18, 0.22, 0.16);
      } else if (action === 'ladderUp') {
        // Eerie undead organ chord ascending
        [146.83, 174.61, 220, 293.66].forEach((f, i) => {
          playTone(ctx, 'sawtooth', f, f, now + i * 0.1, 0.24, 0.12);
          playTone(ctx, 'square', f * 2, f * 2, now + i * 0.1, 0.24, 0.08);
        });
      } else {
        // Rattling bones slide down
        for (let i = 0; i < 6; i++) {
          playTone(ctx, 'square', 420 - i * 50, 260 - i * 35, now + i * 0.07, 0.06, 0.14);
        }
        playTone(ctx, 'sawtooth', 130, 55, now + 0.35, 0.22, 0.2);
      }
      break;
    }

    case 'kloun': {
      if (action === 'move') {
        // Classic circus honk-honk (dual nasal horn)
        playTone(ctx, 'square', 440, 466, now, 0.08, 0.14);
        playTone(ctx, 'sawtooth', 554, 587, now + 0.08, 0.09, 0.14);
      } else if (action === 'mishap') {
        // Juggling boing-boing-honk
        playTone(ctx, 'triangle', 260, 620, now, 0.13, 0.18);
        playTone(ctx, 'triangle', 300, 720, now + 0.13, 0.13, 0.18);
        playTone(ctx, 'square', 520, 490, now + 0.27, 0.16, 0.18);
      } else if (action === 'ladderUp') {
        // Calliope circus fanfare up
        [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => {
          playTone(ctx, 'square', f, f, now + i * 0.08, 0.14, 0.14);
        });
      } else {
        // Slide whistle down + honk
        playTone(ctx, 'sine', 1200, 260, now, 0.42, 0.18);
        playTone(ctx, 'square', 370, 350, now + 0.43, 0.15, 0.18);
      }
      break;
    }

    case 'kiilakas_kloun': {
      if (action === 'move') {
        // Squeaky clown shoe rubber squeak
        playTone(ctx, 'sine', 780, 1350, now, 0.07, 0.16);
        playTone(ctx, 'triangle', 1250, 680, now + 0.07, 0.07, 0.14);
      } else if (action === 'mishap') {
        // Slipper skid + spring bounce
        playTone(ctx, 'sine', 1400, 420, now, 0.14, 0.18);
        playTone(ctx, 'sawtooth', 180, 680, now + 0.14, 0.24, 0.16);
      } else if (action === 'ladderUp') {
        // Quirky polka trumpet up
        [349.23, 440, 523.25, 698.46].forEach((f, i) => {
          playTone(ctx, 'sawtooth', f, f * 1.04, now + i * 0.085, 0.13, 0.14);
        });
      } else {
        // Comical trombone "wah-wah-wah-waaaah" down
        const notes = [311.13, 293.66, 277.18, 261.63];
        notes.forEach((f, i) => {
          const dur = i === 3 ? 0.32 : 0.13;
          playTone(ctx, 'sawtooth', f, i === 3 ? f * 0.86 : f * 0.96, now + i * 0.14, dur, 0.16);
        });
      }
      break;
    }

    case 'the_nadim': {
      if (action === 'move') {
        // Smooth bass synth pluck + bling chain chime
        playTone(ctx, 'triangle', 130, 90, now, 0.13, 0.22);
        playTone(ctx, 'sine', 2400, 3200, now + 0.03, 0.09, 0.1);
      } else if (action === 'mishap') {
        // Disco funk slide
        playTone(ctx, 'sawtooth', 440, 160, now, 0.2, 0.16);
        playTone(ctx, 'sine', 2800, 3500, now + 0.2, 0.15, 0.14);
      } else if (action === 'ladderUp') {
        // VIP club synth riser + sparkle
        playTone(ctx, 'sawtooth', 220, 880, now, 0.38, 0.15);
        playTone(ctx, 'sine', 1760, 2637, now + 0.35, 0.2, 0.14);
      } else {
        // Record scratch + sub bass drop
        playNoiseBurst(ctx, now, 0.16, 1600, 'bandpass', 0.22);
        playTone(ctx, 'sine', 180, 45, now + 0.14, 0.4, 0.26);
      }
      break;
    }

    case 'siil': {
      if (action === 'move') {
        // Fast high-pitched hedgehog scurrying chiptune blip
        playTone(ctx, 'square', 660, 990, now, 0.06, 0.13);
        playTone(ctx, 'square', 880, 1320, now + 0.06, 0.06, 0.13);
      } else if (action === 'mishap') {
        // Turbo spin-dash whirr
        for (let i = 0; i < 5; i++) {
          playTone(ctx, 'square', 400 + i * 140, 650 + i * 160, now + i * 0.05, 0.05, 0.14);
        }
      } else if (action === 'ladderUp') {
        // Sonic-style ring chime ascending
        playTone(ctx, 'sine', 987.77, 987.77, now, 0.09, 0.18);
        playTone(ctx, 'sine', 1318.51, 1318.51, now + 0.09, 0.32, 0.2);
      } else {
        // Spiky roll down + spring
        playTone(ctx, 'square', 920, 210, now, 0.32, 0.15);
        playTone(ctx, 'triangle', 220, 540, now + 0.32, 0.18, 0.16);
      }
      break;
    }

    case 'kuldne_paks': {
      if (action === 'move') {
        // Heavy tuba/brass stomp + gold coin clink
        playTone(ctx, 'sawtooth', 98, 65, now, 0.16, 0.22);
        playTone(ctx, 'sine', 2093, 2637, now + 0.05, 0.1, 0.12);
      } else if (action === 'mishap') {
        // Giant bouncy belly boing
        playTone(ctx, 'sine', 85, 260, now, 0.18, 0.25);
        playTone(ctx, 'sine', 260, 95, now + 0.18, 0.22, 0.24);
      } else if (action === 'ladderUp') {
        // Royal golden brass fanfare + coin shower
        [261.63, 329.63, 392, 523.25].forEach((f, i) => {
          playTone(ctx, 'sawtooth', f, f, now + i * 0.09, 0.18, 0.15);
          playTone(ctx, 'sine', f * 4, f * 4, now + i * 0.09 + 0.03, 0.1, 0.08);
        });
      } else {
        // Heavy belly-flop slide + gong
        playTone(ctx, 'sawtooth', 220, 55, now, 0.42, 0.22);
        playNoiseBurst(ctx, now + 0.38, 0.3, 600, 'lowpass', 0.25);
      }
      break;
    }

    case 'neoon_mees': {
      if (action === 'move') {
        // Laser rave synth zap / EDM arpeggio
        playTone(ctx, 'sawtooth', 1100, 280, now, 0.12, 0.15);
      } else if (action === 'mishap') {
        // Dubstep wobble + neon zap
        playTone(ctx, 'sawtooth', 140, 620, now, 0.12, 0.18);
        playTone(ctx, 'square', 620, 120, now + 0.12, 0.14, 0.18);
        playTone(ctx, 'sawtooth', 1500, 320, now + 0.26, 0.12, 0.16);
      } else if (action === 'ladderUp') {
        // Euphoric rave synth riser
        [440, 554.37, 659.25, 880, 1108.73].forEach((f, i) => {
          playTone(ctx, 'sawtooth', f, f * 1.05, now + i * 0.07, 0.14, 0.14);
        });
      } else {
        // Laser power-down sweep
        playTone(ctx, 'sawtooth', 1600, 75, now, 0.48, 0.18);
      }
      break;
    }

    case 'dr_luks': {
      if (action === 'move') {
        // Hiccup ("hõk!") two-tone pitch jump
        playTone(ctx, 'triangle', 340, 780, now, 0.06, 0.18);
        playTone(ctx, 'sine', 820, 920, now + 0.06, 0.05, 0.15);
      } else if (action === 'mishap') {
        // Double hiccup bounce
        playTone(ctx, 'triangle', 320, 880, now, 0.08, 0.2);
        playTone(ctx, 'triangle', 380, 1050, now + 0.16, 0.1, 0.2);
      } else if (action === 'ladderUp') {
        // Heartbeat monitor speedup + victorious ding
        [0, 0.1, 0.18].forEach((t) => {
          playTone(ctx, 'sine', 880, 880, now + t, 0.05, 0.16);
        });
        playTone(ctx, 'sine', 1318.5, 1318.5, now + 0.28, 0.28, 0.2);
      } else {
        // Flatline slide + hiccup
        playTone(ctx, 'sine', 880, 260, now, 0.36, 0.16);
        playTone(ctx, 'triangle', 350, 790, now + 0.38, 0.09, 0.18);
      }
      break;
    }

    case 'sinine_habemik': {
      if (action === 'move') {
        // Pirate/viking deep horn + bubble pop
        playTone(ctx, 'sawtooth', 146.83, 164.81, now, 0.13, 0.16);
        playTone(ctx, 'sine', 420, 760, now + 0.07, 0.06, 0.14);
      } else if (action === 'mishap') {
        // Beard-tangle comical twang
        playTone(ctx, 'sawtooth', 190, 410, now, 0.14, 0.18);
        playTone(ctx, 'triangle', 410, 160, now + 0.14, 0.18, 0.18);
      } else if (action === 'ladderUp') {
        // Sea shanty accordion/horn chord up
        [196, 246.94, 293.66, 392].forEach((f, i) => {
          playTone(ctx, 'sawtooth', f, f, now + i * 0.09, 0.16, 0.14);
        });
      } else {
        // Anchor splash down
        playTone(ctx, 'triangle', 380, 90, now, 0.35, 0.18);
        playNoiseBurst(ctx, now + 0.28, 0.28, 950, 'bandpass', 0.24);
      }
      break;
    }

    case 'mongolian': {
      if (action === 'move') {
        // Throat-singing overtone drone + horse gallop rhythm
        playTone(ctx, 'sawtooth', 110, 110, now, 0.16, 0.16);
        playTone(ctx, 'sine', 660, 770, now + 0.02, 0.14, 0.1);
      } else if (action === 'mishap') {
        // Wild horse whinny + flip sound
        playTone(ctx, 'sawtooth', 520, 980, now, 0.12, 0.16);
        playTone(ctx, 'sawtooth', 920, 380, now + 0.12, 0.18, 0.16);
      } else if (action === 'ladderUp') {
        // Steppe horn call ascending
        [220, 293.66, 329.63, 440].forEach((f, i) => {
          playTone(ctx, 'sawtooth', f, f * 1.02, now + i * 0.1, 0.2, 0.15);
        });
      } else {
        // Dramatic eagle cry + gallop down
        playTone(ctx, 'sine', 1250, 580, now, 0.3, 0.16);
        playTone(ctx, 'sawtooth', 160, 80, now + 0.25, 0.25, 0.18);
      }
      break;
    }
  }
}

export function playDiceRollSound(): void {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  for (let i = 0; i < 6; i++) {
    const t = now + i * 0.055;
    playNoiseBurst(ctx, t, 0.03, 2200 + i * 200, 'highpass', 0.14);
    playTone(ctx, 'triangle', 320 + (i % 3) * 110, 480, t, 0.035, 0.12);
  }
}

export function playSameRollDrinkSound(): void {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  // Loud party siren / horn alert when two players roll the same number in a row!
  for (let i = 0; i < 3; i++) {
    const start = now + i * 0.22;
    playTone(ctx, 'sawtooth', 440, 880, start, 0.18, 0.22);
    playTone(ctx, 'square', 554.37, 1108.73, start, 0.18, 0.15);
  }
}

export function playWinSound(): void {
  const ctx = getCtx();
  if (!ctx) return;
  const now = ctx.currentTime;
  const notes = [523.25, 659.25, 783.99, 1046.5, 783.99, 1046.5];
  const times = [0, 0.12, 0.24, 0.36, 0.54, 0.68];
  const durations = [0.11, 0.11, 0.11, 0.16, 0.12, 0.45];

  notes.forEach((f, idx) => {
    playTone(ctx, 'sawtooth', f, f, now + times[idx], durations[idx], 0.18);
    playTone(ctx, 'triangle', f * 0.5, f * 0.5, now + times[idx], durations[idx], 0.14);
  });
}
