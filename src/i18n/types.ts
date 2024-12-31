import type en from './en';
import type ar from './ar';

export type EN = typeof en;
export type AR = typeof ar;

export type LanguageTranslations = EN | AR;
export type I18nKey = keyof EN & keyof AR;

export type TranslateOptions = Record<string, string | number | boolean | undefined>;
