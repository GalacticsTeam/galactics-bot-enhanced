import { format, type FormatOptions } from 'date-fns';

export const onFormatNumber = (language: Language) => (num: number, options?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat(language, options).format(num);

export const onFormateDate =
  () =>
  (date: Date | string | number, formatter: string, options: FormatOptions = {}) =>
    format(new Date(date), formatter, options);
