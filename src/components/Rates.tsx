export const BASE_RATE = 109;
export const SUMMER_RATE_INCREASE = 10;
export const CARD_RATE_INCREASE = 20;
export const MOVER_COST = 40;
export const PRICING: number[] = [
  BASE_RATE,
  BASE_RATE + MOVER_COST,
  BASE_RATE + MOVER_COST * 2,
  BASE_RATE + MOVER_COST * 3,
  BASE_RATE + MOVER_COST * 4,
];
export const SUMMER_PRICING: number[] = [
  PRICING[0] + SUMMER_RATE_INCREASE,
  PRICING[1] + SUMMER_RATE_INCREASE,
  PRICING[2] + SUMMER_RATE_INCREASE,
  PRICING[3] + SUMMER_RATE_INCREASE,
  PRICING[4] + SUMMER_RATE_INCREASE,
];
export const STAIR_CHARGE = 10;
export const OTHER_HEAVY_ITEM_CHARGE = 100;
export const PIANO_W_MOVE_CHARGE = 400;
export const PIANO_CHARGE = 600;
export const GUN_SAFE_ROLLABLE = 200;
export const GUN_SAFE = 500;
