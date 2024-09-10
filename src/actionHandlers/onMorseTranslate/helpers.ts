import { textToMorseMap } from './const';

export const morseEncode = (englishText: string) => {
  let morseText: string = '';

  for (let char of englishText) {
    morseText += `${textToMorseMap.get(char.toLowerCase())} `;
  }

  return morseText;
};

export const filterAllowedMorseChars = (text: string) => {
  const filteredTextArr = text.match(/[ a-zA-Z0-9]+/);
  const filteredText = filteredTextArr?.join().trim().replace(/\s+/g, ' ') ?? null;

  return filteredText;
};
