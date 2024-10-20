import type en from './en';
import type ar from './ar';

export type I18nKey = keyof typeof en & keyof typeof ar;

export type TranslateOptions = Record<string, string | number | boolean | undefined>;
