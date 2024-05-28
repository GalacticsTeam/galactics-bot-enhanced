import { FeatureName } from '../types';
import { botConfig } from './botConfig';

export const isAllowedFeature = <T extends FeatureName>(commandName: T): boolean =>
  botConfig.allowedFeatures[commandName];
