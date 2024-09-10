import { englishToMorseMap, morseToEnglishMap } from './const';

export const morseEncode = (englishText: string) =>
  englishText.split('').reduce((morseText, char) => morseText + `${englishToMorseMap.get(char.toLowerCase())} `, '');

export const morseDecode = (morseText: string) =>
  morseText.split(' ').reduce((englishText, char) => englishText + morseToEnglishMap.get(char), '');

export const filterAllowedMorseChars = (text: string) => {
  const filteredTextArr = text.match(/[a-zA-Z0-9\s]+/);
  const filteredText = filteredTextArr?.join().trim() ?? null;

  return filteredText;
};

const morseCodeRegex =
  /^[.-]{1,5}(?:[ \t]+[.-]{1,5})*(?:[ \t]+[.-]{1,5}(?:[ \t]+[.-]{1,5})*)*(?:[ \t]*\/[ \t]*[.-]{1,5}(?:[ \t]+[.-]{1,5})*)*$/;
export const checkIfMorseCode = (text: string) => morseCodeRegex.test(text);
