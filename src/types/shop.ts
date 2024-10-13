export type ShopItemT = {
  id: number;
  price: number;
  name: string,
  type?: ItemCategoryT
}

export type ItemCategoryT = 'border' | 'merch'