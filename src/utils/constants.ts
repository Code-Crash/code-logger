import { ConfigOptions } from './types';

/**
 * property static type constants
 */
export const DEFAULT_CONFIG_OPTIONS: ConfigOptions = {
  recorder: {
    isRecordingEnabled: false,
    isConsoleEnabled: true,
    isOriginalConsoleEnabled: false,
    isNetworkEnabled: false,
    isWebSocketEnabled: false,
    isGlobalErrorEnabled: false,
  },
  isLoggerEnabled: true,
  isApiEnabled: false,
};
