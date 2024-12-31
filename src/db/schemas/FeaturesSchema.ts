import configs from '@configs';
import { createSchema } from '@db/helpers';
import type { Feature, Features } from '@types';

const allFeatures = [...configs.allowedFeatures, ...configs.notAllowedFeatures];
const features = allFeatures.reduce(
  (acc, feature) => {
    acc[feature] = Boolean;
    return acc;
  },
  {} as Record<Feature, BooleanConstructor>
);

export const FeaturesSchema = createSchema<Features>(features);
