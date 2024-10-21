import { getProperty } from '@utils/helpers';
import { getUserSchemaItem } from '@db/UserSchema';
import { onFormatNumber } from '@handlers/onFormat';

import en from './en';
import ar from './ar';
import type { I18nKey, TranslateOptions } from './types';

export const onTranslate =
  (language: Language) =>
  <Key extends I18nKey>(id: Key, options: TranslateOptions = {}) => {
    const formatNumber = onFormatNumber(language);

    const translation = language === 'en' ? (en[id] as (typeof en)[Key]) : (ar[id] as (typeof ar)[Key]);

    return Object.entries(options).reduce(
      (acc, [key, value]) =>
        acc.replace(`{${key}}`, String(typeof value === 'number' ? formatNumber(value) : value)) as typeof translation,
      translation
    );
  };

export const onServerTranslate = async (guildId: string) => {
  const language = await getProperty(guildId, 'language');

  return onTranslate(language);
};

export const onUserTranslate = async (guildId: string, userId: string) => {
  const language = await getUserSchemaItem(guildId, userId, 'language');

  return onTranslate(language);
};
