import { createSchema } from '@db/helpers';
import type { LanguageTranslations } from '@i18n/types';

type WarnReason = LanguageTranslations['warn.reason.add' | 'warn.reason.remove' | 'autoBan.autoBanReset'];

export interface Warns {
  number: number;
  reasons: WarnReason[];
}

export const WarnSchema = createSchema<Warns>({ number: Number, reasons: Array(String) });
