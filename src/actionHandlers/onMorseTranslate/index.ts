import { checkIfMorseCode, filterAllowedMorseChars, morseDecode, morseEncode } from './helpers';

export * from './helpers';

export const onMorseTranslate = (text: string) => {
  const spaceNormalizedText = text.replace(/\s+/g, ' ').trim();

  if (checkIfMorseCode(spaceNormalizedText)) return morseDecode(spaceNormalizedText);

  const filteredText = filterAllowedMorseChars(spaceNormalizedText);
  if (!filteredText) return null;

  return morseEncode(filteredText);
};
