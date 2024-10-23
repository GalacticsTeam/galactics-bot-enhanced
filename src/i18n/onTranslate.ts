import { getProperty } from '@utils/helpers';
import { getUserSchemaItem } from '@db/UserSchema';
import { onFormatNumber } from '@handlers/onFormat';

import en from './en';
import ar from './ar';
import type { I18nKey, TranslateOptions } from './types';

export const onTranslate = (language: Language) => {
  const formatNumber = onFormatNumber(language);

  return <Key extends I18nKey>(key: Key, options: TranslateOptions = {}) => {
    const translation = language === 'en' ? (en[key] as (typeof en)[Key]) : (ar[key] as (typeof ar)[Key]);

    return Object.entries(options).reduce(
      (acc, [key, value]) =>
        acc.replace(
          `{${key}}`,
          String(typeof value === 'number' ? formatNumber(value, { useGrouping: false }) : value)
        ) as typeof translation,
      translation
    );
  };
};

export const onServerTranslate = async (guildId: string) => {
  const language = await getProperty(guildId, 'language');

  return onTranslate(language);
};

export const onUserTranslate = async (guildId: string, userId: string) => {
  const language = await getUserSchemaItem(guildId, userId, 'language');

  return onTranslate(language);
};
