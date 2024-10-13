import { CompSVG } from './../ui/CompSVG';
import { ArtSVG } from '../ui/ArtSVG';
import { GameSVG } from '../ui/GameSVG';
import { BallSVG } from '../ui/BallSVG';
import { BookSVG } from '../ui/BookSVG';
export type TaskT = {
  id: number;
  title: string;
  text: string;
  branch: BRANCH;
  price_tokens: number;
  price_branch: number;
  is_completed?: boolean
  // qr?: File;
}

export enum BRANCH {
  IT = "it",
  ART = "art",
  GAME = "game",
  SPORT = "sport",
  SCIENCE = "science"
}

export const branchInfo = {
  [BRANCH.IT]: {
    title: 'Программирование',
    icon: CompSVG
  },
  [BRANCH.ART]: {
    title: 'Исскуство и культура',
    icon: ArtSVG
  },
  [BRANCH.GAME]: {
    title: 'Киберспорт',
    icon: GameSVG
  },
  [BRANCH.SPORT]: {
    title: 'Спорт',
    icon: BallSVG
  },
  [BRANCH.SCIENCE]: {
    title: 'Точные науки',
    icon: BookSVG
  },
}