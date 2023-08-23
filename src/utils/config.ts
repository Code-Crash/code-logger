/**
 * @file config.ts - Purpose of this file will be to hold the configuration or customization.
 */

import { DEFAULT_CONFIG_OPTIONS } from './constants';
import { ConfigOptions, TransportInterface, TransportType } from './types';

const DEFAULT_TRANSPORT_OPTIONS: TransportInterface = {
  api: {
    type: TransportType.API,
    enabled: true,
    options: {
      url: '',
      headers: {}
    }
  },
  file: {
    type: TransportType.FILE,
    enabled: false,
    options: {
      path: ''
    }
  },
};

export default class Config {
  public static instance: Config = null; // Note: Assign "new Config()" here to avoid lazy initialization
  private options: ConfigOptions = DEFAULT_CONFIG_OPTIONS;
  private transports: TransportInterface = DEFAULT_TRANSPORT_OPTIONS;
  constructor(options?: ConfigOptions, transports?: TransportInterface) {
    // Check if the object is already created, if yes, return it
    if (Config.instance) {
      return Config.instance;
    }
    // Check options and assign the values to the options
    if (options) {
      Object.keys(DEFAULT_CONFIG_OPTIONS).forEach(key => {
        if (
          Object.prototype.hasOwnProperty.call(options, key) &&
          Object.prototype.hasOwnProperty.call(DEFAULT_CONFIG_OPTIONS, key)
        ) {
          this[key] = options[key] || DEFAULT_CONFIG_OPTIONS[key];
        }
      });
    }
    // Set Transports
    if (transports && Object.keys(transports).length) {
      if (Object.keys(transports?.api || {}).length && transports.api.options.url) {
        this.transports.api = { ...this.transports.api, ...transports.api };
        this.options.isApiEnabled = true;
      }
      if (Object.keys(transports?.file || {}).length) {
        this.transports.file = { ...this.transports.file, ...transports.file };
      }
    }
    // Assign the newly created instance
    Config.instance = this;
  }

  getApiOptions() {
    return this.transports?.api?.options;
  }

  setApi(url: string, headers?: Record<string, string>) {
    if (url && typeof url === 'string') {
      this.transports.api.options.url = url;
      this.options.isApiEnabled = true;
    }
    if (headers && Object.keys(headers).length) {
      this.transports.api.options.headers = { ...this.transports?.api?.options?.headers, ...headers };
    }
  }

  enabler() {
    this.options.recorder.isRecordingEnabled = true;
    this.options.recorder.isConsoleEnabled = true;
    this.options.recorder.isOriginalConsoleEnabled = true;
    this.options.recorder.isNetworkEnabled = false;
    this.options.recorder.isWebSocketEnabled = false;
    this.options.recorder.isGlobalErrorEnabled = false;
    this.options.isLoggerEnabled = true;
  }

  disabler() {
    this.options.recorder.isRecordingEnabled = false;
    this.options.recorder.isConsoleEnabled = false;
    this.options.recorder.isOriginalConsoleEnabled = false;
    this.options.recorder.isNetworkEnabled = false;
    this.options.recorder.isWebSocketEnabled = false;
    this.options.recorder.isGlobalErrorEnabled = false;
    this.options.isLoggerEnabled = false;
  }

  isApiEnabled() {
    return this.options.isApiEnabled;
  }

  isLoggerEnabled() {
    return this.options.isLoggerEnabled;
  }

  isRecordingEnabled() {
    return this.options.recorder.isRecordingEnabled;
  }

  isConsoleEnabled() {
    return this.options.recorder.isConsoleEnabled;
  }

  isOriginalConsoleEnabled() {
    return this.options.recorder.isOriginalConsoleEnabled;
  }

  public static getInstance(options?: ConfigOptions) {
    if (!Config.instance) {
      Config.instance = new Config(options);
    }
    return Config.instance;
  }
}
