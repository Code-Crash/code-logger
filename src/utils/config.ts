/**
 * @file config.ts - Purpose of this file will be to hold the configuration or customization.
 */

/**
 * This interface will be used as ConfigOptions for Config class
 * @interface ConfigOptions
 * @property {boolean} isSilentExceptions When this is true, we will not throw Error/Exception, we will only do console log (if logs are enabled)
 * @property {boolean} isLoggerEnabled
 */
interface ConfigOptions {
  isRecordingEnabled?: boolean
  isConsoleEnabled?: boolean
  isOriginalConsoleEnabled?: boolean
  isNetworkEnabled?: boolean
  isWebSocketEnabled?: boolean
  isGlobalErrorEnabled?: boolean
  isLoggerEnabled?: boolean
}

const CONFIG_PROPERTIES = {
  isRecordingEnabled: 'boolean',
  isConsoleEnabled: 'boolean',
  isOriginalConsoleEnabled: 'boolean',
  isNetworkEnabled: 'boolean',
  isWebSocketEnabled: 'boolean',
  isGlobalErrorEnabled: 'boolean',
  isLoggerEnabled: 'boolean',
}

export default class Config implements ConfigOptions {
  public static instance: Config = null // Note: Assign "new Config()" here to avoid lazy initialization
  isRecordingEnabled: boolean = false;
  isConsoleEnabled: boolean = true;
  isOriginalConsoleEnabled: boolean = false;
  isNetworkEnabled: boolean = false;
  isWebSocketEnabled: boolean = false;
  isGlobalErrorEnabled: boolean = false;
  isLoggerEnabled: boolean = true;

  constructor(options?: ConfigOptions) {
    // Check if the object is already created, if yes, return it
    if (Config.instance) {
      return Config.instance;
    }
    // Check options and assign the values to the options
    if (options) {
      Object.keys(CONFIG_PROPERTIES).forEach(key => {
        if (options.hasOwnProperty(key) && typeof options[key] === CONFIG_PROPERTIES[key]) {
          this[key] = options[key];
        }
      })
    }

    // Assign the newly created instance
    Config.instance = this
  }

  enabler = () => {
    this.isRecordingEnabled = true;
    this.isConsoleEnabled = true;
    this.isOriginalConsoleEnabled = true;
    this.isNetworkEnabled = true;
    this.isWebSocketEnabled = true;
    this.isGlobalErrorEnabled = true;
    this.isLoggerEnabled = true;
  }

  disabler = () => {
    this.isRecordingEnabled = false;
    this.isConsoleEnabled = false;
    this.isOriginalConsoleEnabled = false;
    this.isNetworkEnabled = false;
    this.isWebSocketEnabled = false;
    this.isGlobalErrorEnabled = false;
    this.isLoggerEnabled = false;
  }

  getInstance(options: ConfigOptions) {
    if (!Config.instance) {
      Config.instance = new Config(options);
    }
    return Config.instance;
  }
}
