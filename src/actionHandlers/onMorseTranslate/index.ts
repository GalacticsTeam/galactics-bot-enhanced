import { filterAllowedMorseChars, morseEncode } from './helpers';

export const onMorseTranslate = (text: string) => {
  const filteredText = filterAllowedMorseChars(text);
  if (!filteredText) return null;
};
