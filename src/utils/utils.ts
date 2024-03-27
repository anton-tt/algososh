export const pause = (interval: number) => {
  return new Promise(resolve => setTimeout(resolve, interval));
}