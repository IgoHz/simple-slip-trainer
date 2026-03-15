export function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}

export function calculateRateCoeficient(rate: number): number {
  return 60 / rate;
}
