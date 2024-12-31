import { getProperty } from '@utils/helpers';
import { getUserProperty } from '@db/UserSchema';
import { onFormatNumber } from '@handlers/onFormat';

import en from './en';
import ar from './ar';
import type { I18nKey, LanguageTranslations, TranslateOptions } from './types';

const languages: Record<Language, LanguageTranslations> = { en, ar };

export const onTranslate = (language: Language) => {
  const formatNumber = onFormatNumber(language);

  return <Key extends I18nKey>(key: Key, options: TranslateOptions = {}) => {
    const translation = languages[language][key];

    return Object.entries(options).reduce(
      (acc, [key, value]) =>
        acc.replace(
          `{${key}}`,
          String(typeof value === 'number' ? formatNumber(value, { useGrouping: false }) : value)
        ) as LanguageTranslations[Key],
      translation
    );
  };
};

export const onServerTranslate = async (guildId: string) => {
  const language = await getProperty(guildId, 'language');

  return onTranslate(language);
};

export const onUserTranslate = async (guildId: string, userId: string) => {
  const language = await getUserProperty(guildId, userId, 'language');

  return onTranslate(language);
};

onTranslate.en = en;
onTranslate.ar = ar;
