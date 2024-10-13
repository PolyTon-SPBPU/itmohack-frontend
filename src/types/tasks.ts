export type TaskT = {
  id: number;
  title: string;
  text: string;
  branch: BRANCH;
  price_tokens: number;
  price_branch: number;
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
    icon: 'div'
  },
  [BRANCH.ART]: {
    title: 'Исскуство и культура',
    icon: 'div'
  },
  [BRANCH.GAME]: {
    title: 'Киберспорт',
    icon: 'div'
  },
  [BRANCH.SPORT]: {
    title: 'Спорт',
    icon: 'div'
  },
  [BRANCH.SCIENCE]: {
    title: 'Точные науки',
    icon: 'div'
  },
}