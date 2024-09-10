import { englishToMorseMap, morseToEnglishMap } from './const';

export const morseEncode = (englishText: string) => {
  let morseText: string = '';

  for (let char of englishText) {
    morseText += `${englishToMorseMap.get(char.toLowerCase())} `;
  }

  return morseText;
};

export const morseDecode = (morseText: string) => {
  let englishText = '';

  for (let char of morseText.split(' ')) {
    englishText += morseToEnglishMap.get(char);
  }

  return englishText;
};

export const filterAllowedMorseChars = (text: string) => {
  const filteredTextArr = text.match(/[a-zA-Z0-9\s]+/);
  const filteredText = filteredTextArr?.join().trim() ?? null;

  return filteredText;
};

const morseCodeRegex =
  /^[.-]{1,5}(?:[ \t]+[.-]{1,5})*(?:[ \t]+[.-]{1,5}(?:[ \t]+[.-]{1,5})*)*(?:[ \t]*\/[ \t]*[.-]{1,5}(?:[ \t]+[.-]{1,5})*)*$/;
export const checkIfMorseCode = (text: string) => morseCodeRegex.test(text);
