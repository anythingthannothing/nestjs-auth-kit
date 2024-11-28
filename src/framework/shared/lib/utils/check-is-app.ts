import { PlatformType } from '../../types';

const validPlatforms = new Set<PlatformType>(['web', 'ios', 'android']);

export const checkIsApp = (platform: PlatformType) => {
  if (!validPlatforms.has(platform)) {
    throw new Error('Invalid platform value');
  }
  return platform !== 'web';
};
