export const throwIfInvalidUrl = (url: string) => {
  try {
    const parsedUrl = new URL(url);

    if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
      throw new Error();
    }

    if (!parsedUrl.hostname || parsedUrl.hostname === '') {
      throw new Error();
    }
  } catch (_) {
    throw new Error(`Invalid origin detected: ${url}`);
  }
};
