import { botConfig } from './botConfig';
import { FeatureName } from 'src/types';

export const isAllowedFeature = <T extends FeatureName>(commandName: T): boolean =>
  botConfig.allowedFeatures[commandName];
