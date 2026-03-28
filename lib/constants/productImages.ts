/**
 * Pexels CDN URLs (verified HTTP 200). IDs map to photos that match each product name.
 */
export function pexelsPhoto(id: number, w = 900): string {
  return `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}

/** Fallback pool for legacy helpers (e.g. placeholders keyed by seed). */
export const PLACEHOLDER_PEXELS_IDS = [6784128, 4252132, 1640777, 7851798] as const;

const GALLERY_IDS: Record<number, readonly [number, number, number, number]> = {
  1: [7851798, 7421207, 7593253, 4187615],
  2: [4110250, 10071020, 6294374, 6287223],
  3: [6629604, 5948576, 3280907, 7140142],
  4: [1036622, 143133, 4187615, 4110250],
  5: [11726089, 6287223, 6294374, 31668252],
  6: [30055277, 33939170, 31668252, 11726089],
  7: [33939170, 30055277, 6294374, 6287223],
  8: [1640777, 1640774, 5217781, 416135],
  9: [5620413, 6271891, 6823331, 1590137],
  10: [18639886, 416135, 7317580, 1872903],
  11: [5217781, 1640774, 7317580, 416135],
  12: [12955634, 20121107, 12284682, 3066951],
  13: [6213751, 4910164, 5180380, 3066951],
  14: [4910164, 5180380, 20121107, 12955634],
  15: [6784128, 5945660, 5056853, 4252154],
  16: [4252132, 5590955, 12563533, 14593042],
  17: [4210878, 4202475, 4239008, 4239013],
  18: [5441094, 8107991, 8922289, 5223214],
  19: [5737579, 9960821, 8175352, 7236215],
  20: [9025074, 4910160, 10976389, 15879424],
  21: [9814625, 4910159, 13019216, 10048319],
  22: [31275833, 5737246, 17236203, 30816582],
  23: [29307533, 29526211, 12017671, 11162265],
  24: [6620824, 4239039, 3789888, 5256142],
};

export function imagesForProduct(productId: number): string[] {
  const ids = GALLERY_IDS[productId];
  if (!ids) {
    return PLACEHOLDER_PEXELS_IDS.map((id) => pexelsPhoto(id));
  }
  return ids.map((id) => pexelsPhoto(id));
}
