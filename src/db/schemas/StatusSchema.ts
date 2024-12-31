import type { Status } from '@actionHandlers/onServerStatus/types';
import { createSchema } from '@db/helpers';

export const StatusesSchema = createSchema<Status>({
  id: String,
  title: String,
  type: String,
  value: String,
});
