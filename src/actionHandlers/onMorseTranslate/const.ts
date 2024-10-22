import { ALPHABETICAL_CHARS, DECIMAL_NUMBERS, PUNCTUATION_MARKS } from '@utils/const';

export const morseChars =
  '.- -... -.-. -.. . ..-. --. .... .. .--- -.- .-.. -- -. --- .--. --.- .-. ... - ..- ...- .-- -..- -.-- --.. .---- ..--- ...-- ....- ..... -.... --... ---.. ----. -----' as const;
export const morsePunctMarks =
  '.-... .----. .--.-. -.--.- -.--. ---... --..-- -...- -.-.-- .-.-.- -....- -..- .-.-. .-..-. ..--.. -..-.' as const;

// Added the space character as equivalent to "/" in morse chars.
export const englishCharsArr = (ALPHABETICAL_CHARS + DECIMAL_NUMBERS + PUNCTUATION_MARKS + ' ').split('');
export const morseCharsArr = (morseChars + ' ' + morsePunctMarks + ' /').split(' ');

export const englishToMorseMap = new Map(englishCharsArr.map((char, index) => [char, morseCharsArr[index]]));
export const morseToEnglishMap = new Map(morseCharsArr.map((char, index) => [char, englishCharsArr[index]]));
