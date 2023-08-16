import Config from "../utils/config";

// Define a function that will act as the proxy for console methods
const doConsoleProxy = () => {
  const oConsole = { ...console }; // Original Console Logger
  const pConsole = new Proxy(oConsole, {
    get(target: Console, prop: keyof Console) {
      const originalMethod = target[prop];
      if (typeof originalMethod === 'function') {
        // Intercept console methods and modify behavior if needed
        return (...args: any[]) => {
          const message = `${JSON.stringify(args)}`;
          const level = prop.toUpperCase();
          const timestamp = new Date().toISOString();
          const stackTrace = new Error().stack;
          const trace = stackTrace
            ? stackTrace.replace(/^Error\n\s*/, '').replace(/^\s*\n/, '')
            : '';
          const logObject = { level, timestamp, message, trace };
          // See if recording is enabled and console proxy is also enable before performing actual console logs
          if (Config.instance.isRecordingEnabled && Config.instance.isConsoleEnabled) {
            oConsole.log(JSON.stringify(logObject));
            // TODO: API integration to send data on server
          }

          // If recording is not enabled, we will not restrict the original console logs from host client
          if (Config.instance.isRecordingEnabled && Config.instance.isOriginalConsoleEnabled) {
            // Call the original console method
            originalMethod.apply(target, args);
          }
        };
      } else {
        // If it's not a function, return the original value
        return originalMethod;
      }
    },
  });

  if (typeof window !== 'undefined') {
    // Browser environment
    window.console = pConsole;
  } else if (typeof global !== 'undefined') {
    // Node.js environment
    global.console = pConsole;
  }

  // Return a closure function to revert the console proxy
  return () => {
    if (typeof window !== 'undefined') {
      window.console = oConsole;
    } else if (typeof global !== 'undefined') {
      global.console = oConsole;
    }
  };

};

export default doConsoleProxy;
