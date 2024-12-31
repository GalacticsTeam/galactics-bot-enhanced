import { createSchema } from '@db/helpers';
import type { Embeds } from '@types';

export const EmbedsSchema = createSchema<Embeds>({ color: String });
