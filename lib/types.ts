export type Country = "RU" | "BY" | "KZ" | "TJ" | "AM" | "GE" | "AZ" | "UZ"

export interface Rates {
  RUB: number; KZT: number; TJS: number; UZS: number
  BYN: number; AMD: number; GEL: number; AZN: number
}

export const DEFAULT_RATES: Rates = {
  RUB: 13.2, KZT: 555, TJS: 1.08, UZS: 1645,
  BYN: 0.40, AMD: 55,  GEL: 0.40, AZN: 0.24,
}
