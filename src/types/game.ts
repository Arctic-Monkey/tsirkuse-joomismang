export type CharacterId =
  | 'korstnapuhkija'
  | 'valge'
  | 'zombie'
  | 'kloun'
  | 'kiilakas_kloun'
  | 'the_nadim'
  | 'siil'
  | 'kuldne_paks'
  | 'neoon_mees'
  | 'dr_luks'
  | 'sinine_habemik'
  | 'mongolian';

export type AnimationState = 'idle' | 'move' | 'mishap' | 'ladderUp' | 'ladderDown';

export type ChallengeCategory =
  | 'never_have_i_ever'
  | 'who_in_group'
  | 'duel'
  | 'everyone_who'
  | 'do_or_drink'
  | 'special_rule';

export interface Challenge {
  id: number;
  category: ChallengeCategory;
  categoryTitle: string;
  categoryRule: string;
  text: string;
}

export interface CharacterConfig {
  id: CharacterId;
  name: string;
  color: string;
  accentColor: string;
  fullImage: string;
  faceImage: string;
  mishapLabel: string;
}

export interface Player {
  id: string;
  characterId: CharacterId;
  name: string;
  position: number; // 1 to 60
  visitedSquares: number[];
}

export interface Ladder {
  from: number;
  to: number;
  type: 'up' | 'down';
}
