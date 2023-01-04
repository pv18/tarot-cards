export const getRandomNumber = (propsMin: number, propsMax: number) => {
  const min = propsMin;
  const max = propsMax;
  return Math.floor(Math.random() * (max - min + 1) + min);
};
