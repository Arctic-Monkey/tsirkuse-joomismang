import type { CharacterConfig, CharacterId } from '../types/game';

import korstnapuhkijaFull from '../assets/characters/IMG_4158.jpg';
import valgeFull from '../assets/characters/IMG_3781.jpeg';
import zombieFull from '../assets/characters/IMG_4154.jpg';
import klounFull from '../assets/characters/IMG_4162.jpg';
import kiilakasKlounFull from '../assets/characters/IMG_4155.jpg';
import theNadimFull from '../assets/characters/IMG_4159.jpg';
import siilFull from '../assets/characters/IMG_4156.jpg';
import kuldnePaksFull from '../assets/characters/IMG_4157.jpg';
import neoonMeesFull from '../assets/characters/IMG_4163.jpg';
import drLuksFull from '../assets/characters/IMG_4164.jpg';
import sinineHabemikFull from '../assets/characters/IMG_3748.jpeg';
import mongolianFull from '../assets/characters/IMG_3747.jpeg';

import korstnapuhkijaFace from '../assets/characters/faces/korstnapuhkija.jpg';
import valgeFace from '../assets/characters/faces/valge.jpg';
import zombieFace from '../assets/characters/faces/zombie.jpg';
import klounFace from '../assets/characters/faces/kloun.jpg';
import kiilakasKlounFace from '../assets/characters/faces/kiilakas_kloun.jpg';
import theNadimFace from '../assets/characters/faces/the_nadim.jpg';
import siilFace from '../assets/characters/faces/siil.jpg';
import kuldnePaksFace from '../assets/characters/faces/kuldne_paks.jpg';
import neoonMeesFace from '../assets/characters/faces/neoon_mees.jpg';
import drLuksFace from '../assets/characters/faces/dr_luks.jpg';
import sinineHabemikFace from '../assets/characters/faces/sinine_habemik.jpg';
import mongolianFace from '../assets/characters/faces/mongolian.jpg';

export const CHARACTERS: CharacterConfig[] = [
  {
    id: 'korstnapuhkija',
    name: 'Korstnapühkija',
    fullImage: korstnapuhkijaFull,
    faceImage: korstnapuhkijaFace,
    color: '#84cc16',
    accentColor: '#1e293b',
    mishapLabel: 'Koperdas korstnas ja tegi salto!',
  },
  {
    id: 'valge',
    name: 'Valge',
    fullImage: valgeFull,
    faceImage: valgeFace,
    color: '#f8fafc',
    accentColor: '#94a3b8',
    mishapLabel: 'Ehmus oma varjust ja astus sammu tagasi!',
  },
  {
    id: 'zombie',
    name: 'Zombie',
    fullImage: zombieFull,
    faceImage: zombieFace,
    color: '#22c55e',
    accentColor: '#991b1b',
    mishapLabel: 'Kaotas korraks pea ja tuikus tagurpidi!',
  },
  {
    id: 'kloun',
    name: 'Kloun',
    fullImage: klounFull,
    faceImage: klounFace,
    color: '#f97316',
    accentColor: '#7e22ce',
    mishapLabel: 'Komistas suurte kingade otsa ja tegi backflipi!',
  },
  {
    id: 'kiilakas_kloun',
    name: 'Kiilakas kloun',
    fullImage: kiilakasKlounFull,
    faceImage: kiilakasKlounFace,
    color: '#ef4444',
    accentColor: '#eab308',
    mishapLabel: 'Libises sussidega tagasi ja hüppas edasi!',
  },
  {
    id: 'the_nadim',
    name: 'The Nadim',
    fullImage: theNadimFull,
    faceImage: theNadimFace,
    color: '#a855f7',
    accentColor: '#e2e8f0',
    mishapLabel: 'Jäi ketti imetlema ja tegi moonwalki!',
  },
  {
    id: 'siil',
    name: 'Siil',
    fullImage: siilFull,
    faceImage: siilFace,
    color: '#f59e0b',
    accentColor: '#78350f',
    mishapLabel: 'Keris end kerra ja veeres kukerpalliga!',
  },
  {
    id: 'kuldne_paks',
    name: 'Kuldne Paks',
    fullImage: kuldnePaksFull,
    faceImage: kuldnePaksFace,
    color: '#eab308',
    accentColor: '#ca8a04',
    mishapLabel: 'Põrkas kõhuga sammu tagasi ja tegi salto!',
  },
  {
    id: 'neoon_mees',
    name: 'Neoon Mees',
    fullImage: neoonMeesFull,
    faceImage: neoonMeesFace,
    color: '#06b6d4',
    accentColor: '#ec4899',
    mishapLabel: 'Tegi reivisammuga 360° pöörde ja astus tagasi!',
  },
  {
    id: 'dr_luks',
    name: 'Dr Luks',
    fullImage: drLuksFull,
    faceImage: drLuksFace,
    color: '#3b82f6',
    accentColor: '#60a5fa',
    mishapLabel: 'Sai luksuhoo ja hüppas sammu tagasi!',
  },
  {
    id: 'sinine_habemik',
    name: 'Sinine Habemik',
    fullImage: sinineHabemikFull,
    faceImage: sinineHabemikFace,
    color: '#2563eb',
    accentColor: '#1d4ed8',
    mishapLabel: 'Takoriidius habemesse ja tegi backflipi!',
  },
  {
    id: 'mongolian',
    name: 'Mongolian',
    fullImage: mongolianFull,
    faceImage: mongolianFace,
    color: '#38bdf8',
    accentColor: '#f43f5e',
    mishapLabel: 'Kihutas stepihobusega ringi ja hüppas edasi!',
  },
];

export const CHARACTER_MAP: Record<CharacterId, CharacterConfig> = CHARACTERS.reduce(
  (acc, char) => {
    acc[char.id] = char;
    return acc;
  },
  {} as Record<CharacterId, CharacterConfig>
);
