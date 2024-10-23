import en from './en';
import ar from './ar';

type IfEquals<T, U, Y = unknown, N = never> =
  (<G>() => G extends T ? 1 : 2) extends <G>() => G extends U ? 1 : 2 ? Y : N;

declare const isExactType: <T, U>(draft: T & IfEquals<T, U>, expected: U & IfEquals<T, U>) => IfEquals<T, U>;

type TranslateEn = keyof typeof en;
type TranslateAr = keyof typeof ar;

declare let enDiff: Exclude<TranslateEn, TranslateAr>;
declare let arDiff: Exclude<TranslateAr, TranslateEn>;

isExactType(enDiff, arDiff);
