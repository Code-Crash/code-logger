import events, { Events } from '../transports/events';
import { EVENT_TYPES } from './constants';
import { replacer } from './util';

/**
 * Note: This class is custom logging helpers
 * Log class to handle logging of info, warning, and error messages.
 * This class follows the Singleton design pattern.
 */
class Log {
  private static instance: Log;

  private constructor(private events?: Events) { }

  /**
   * Get the instance of the Log class.
   * If an instance already exists, return it; otherwise, create a new instance.
   * @returns The Log instance.
   */
  public static getInstance(): Log {
    if (!Log.instance) {
      Log.instance = new Log(events);
    }
    return Log.instance;
  }

  /**
   * Log a message with the provided log level.
   * @param level - The log level (e.g., INFO, WARN, ERROR).
   * @param args - The arguments to be concatenated into the log message.
   */
  private logMessage(level: string, ...args: unknown[]): void {
    try {
      // const payload = args.join(' ');
      const payload = `${JSON.stringify(args, replacer, null)}`;
      const timestamp = new Date().toISOString();
      if (this.events) {
        // TODO: Queueing integration is pending
        this.events.emit(EVENT_TYPES.api, { type: EVENT_TYPES.log, level, timestamp, payload });
      }
    } catch (error) {
      // TODO: Handle error
    }
  }

  /**
   * Log an informational message.
   * @param args - The arguments to be logged.
   */
  public info(...args: unknown[]): void {
    this.logMessage('INFO', ...args);
  }

  /**
   * Log a warning message.
   * @param args - The arguments to be logged.
   */
  public warn(...args: unknown[]): void {
    this.logMessage('WARN', ...args);
  }

  /**
   * Log an error message.
   * @param args - The arguments to be logged.
   */
  public error(...args: unknown[]): void {
    this.logMessage('ERROR', ...args);
  }
}

// Create or Get instance
const logger = Log.getInstance();

// Only export helpful methods, to let class methods private after transpilation from ts
const log = {
  info: logger.info.bind(logger),
  warn: logger.warn.bind(logger),
  error: logger.error.bind(logger),
};

export default log;