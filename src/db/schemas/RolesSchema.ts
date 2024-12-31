import configs from '@configs';
import { createSchema } from '@db/helpers';
import type { Roles } from '@types';

const roles = configs.roles.reduce(
  (acc, channel) => {
    acc[channel] = String;
    return acc;
  },
  {} as Record<Role, StringConstructor>
);

export const RolesSchema = createSchema<Roles>(roles);
