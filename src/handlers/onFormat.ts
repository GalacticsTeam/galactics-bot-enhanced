export const onFormatNumber = (language: Language) => (num: number, options?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat(language, options).format(num);
