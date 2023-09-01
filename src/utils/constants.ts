/**
 * This file contains the constants which is required by the application
 */

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

/**
 * This types can be map anywhere instead of using static string based type
 */
export const LOG_TYPE = {
  log: 'LOG',
  info: 'INFO',
  warn: 'WARN',
  debug: 'DEBUG',
  error: 'ERROR'
};

export const RECORDER_STATUS = {
  start: 'start',
  stop: 'stop',
  started: 'started',
  stopped: 'stopped',
};

export const STRINGS = {
  start: 'Recording started.',
  started: 'Recording is already in progress.',
  stop: 'Recording stopped.',
  stopped: 'Recording is not in progress.',
};

export const EVENT_TYPES = {
  start: 'start',
  stop: 'stop',
  console: 'console',
  log: 'log',
  api: 'api',
  file: 'file',
  originalConsole: 'original-console',
};