import { getProperty } from '@utils/helpers';
import { getUserSchemaItem } from '@db/UserSchema';

import en from './en';
import ar from './ar';
import type { I18nKey, TranslateOptions } from './types';

export const onTranslate =
  (locale: Language) =>
  <Key extends I18nKey>(id: Key, options: TranslateOptions = {}) => {
    const translation = locale === 'en' ? (en[id] as (typeof en)[Key]) : (ar[id] as (typeof ar)[Key]);

    return Object.keys(options).reduce(
      (acc, [key, value]) => acc.replace(`{${key}}`, String(value)) as typeof translation,
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
