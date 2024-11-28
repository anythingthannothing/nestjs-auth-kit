export const checkIsApp = (platform?: 'ios' | 'android' | 'web') => {
  if (!platform) {
    return false;
  }
  return platform !== 'web';
};
