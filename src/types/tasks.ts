export type TaskT = {
  id: number;
  title: string;
  description: string;
  theme: ThemeT;
  reward: number;
  // qr?: File;
}

export type ThemeT = 'Спорт' | 'Программирование' | 'Исскуство и культура' | 'Точные науки' | 'Киберспорт'