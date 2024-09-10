export const filterAllowedMorseChars = (text: string) => {
  const filteredTextArr = text.match(/[ a-zA-Z0-9]+/);
  const filteredText = filteredTextArr?.join().trim().replace(/\s+/g, ' ') ?? null;

  return filteredText;
};
