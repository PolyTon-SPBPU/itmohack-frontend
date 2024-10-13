export type LeaderboardUserT = {
  id: number;
  first_name: string;
  last_name: string;
  avatar: string;
  tokens: number;
}

export type UserT = {
  id: number,
  first_name: string,
  last_name: string,
  is_active: boolean,
  birthday?: string;
  is_superuser: boolean,
  is_verified?: boolean,
  it: number,
  game: number,
  sport: number,
  art: number,
  science: number,
  tokens: number
}
