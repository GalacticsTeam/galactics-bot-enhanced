import { ALPHABETICAL_CHARS, DECIMAL_NUMBERS } from '../../utils/const';

export const morseChars =
  '.- -... -.-. -.. . ..-. --. .... .. .--- -.- .-.. -- -. --- .--. --.- .-. ... - ..- ...- .-- -..- -.-- --.. .---- ..--- ...-- ....- ..... -.... --... ---.. ----. ----- /';

export const englishCharsArr = (ALPHABETICAL_CHARS + DECIMAL_NUMBERS + ' ').split('');
export const morseCharsArr = morseChars.split(' ');

export const textToMorseMap = new Map(englishCharsArr.map((char, index) => [char, morseCharsArr[index]]));
