import type { Properties } from '@types';
import { createSchema } from '@db/helpers';

import { StatusesSchema } from './StatusSchema';

export const PropertiesSchema = createSchema<Properties>({
  autoBanTrigger: Number,
  modHelpMessage: String,
  statuses: Array(StatusesSchema),
  language: String,
});
