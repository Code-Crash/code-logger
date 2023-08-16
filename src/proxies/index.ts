import doConsoleProxy from './console';

// We will use this proxies to manage start and stop of the capturing
// NOTE: Always keep this constant up to date  with our all proxies and never export any proxy directly out of this context 
const proxies = {
  doConsoleProxy,
};


// This will hold the proxies return values to disable the original proxies
const holder = {};

/**
 * This method will start our proxies
 */
const doStartProxies = () => {
  Object.keys(proxies).forEach((key) => {
    if (key && proxies[key] && typeof proxies[key] === 'function') {
      holder[key] = proxies[key](); // starter
    }
  });
}

/**
 * This method will stop our proxies
 */
const doStopProxies = () => {
  if (holder && Object.keys(holder).length) {
    Object.keys(holder).forEach((key) => {
      if (key && holder[key] && typeof holder[key] === 'function') {
        holder[key](); // stopper
      }
    });
  }
}

export default {
  doStartProxies,
  doStopProxies,
};