export type ShopItemT = {
  id: number;
  price: number;
  type: "border" | "hat" | 'medal';
  owned?: boolean;
}
