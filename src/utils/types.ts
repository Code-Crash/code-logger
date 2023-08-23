/**
 * This interface will be used as ConfigOptions for Config class
 * @interface ConfigOptions
 * @property {boolean} isRecordingEnabled
 * @property {boolean} isConsoleEnabled
 * @property {boolean} isOriginalConsoleEnabled
 * @property {boolean} isNetworkEnabled
 * @property {boolean} isWebSocketEnabled
 * @property {boolean} isGlobalErrorEnabled
 * @property {boolean} isLoggerEnabled
 */
export interface ConfigOptions {
  recorder?: {
    isRecordingEnabled?: boolean;
    isConsoleEnabled?: boolean;
    isOriginalConsoleEnabled?: boolean;
    isNetworkEnabled?: boolean;
    isWebSocketEnabled?: boolean;
    isGlobalErrorEnabled?: boolean;
  };
  isLoggerEnabled?: boolean;
  isApiEnabled?: boolean;
}

export interface ConsolePayloadInterface {
  level: string;
  timestamp: string;
  message: string;
  trace: string;
}

/**
 * TODO: integrate network payload
 * Need to implement HAR types from http://www.softwareishard.com/blog/har-12-spec/
 */
export interface NetworkPayloadInterface {
  level: string;
  timestamp: string;
  message: string;
  request: object; // {url, path, method, headers, params, etc... }
  response: object; // {status, body, etc..}
}

export interface Payload {
  type: string;
  payload: ConsolePayloadInterface | NetworkPayloadInterface;
}

export enum TransportType {
  FILE = 'file',
  API = 'api',
}

interface BaseTransportInterface {
  readonly type: TransportType.FILE | TransportType.API;
  enabled: boolean;
  options?: string | object;
}

export interface FileTransportOptionsInterface {
  path: string;
  // TODO: As of now, we are only using path, need to fix this code below
  rotation?: {
    maxFiles: number; // Maximum number of rotated files to keep
    maxSize: number; // Maximum size (in bytes) before rotating
    dateFormat?: string; // Date format for rotated file names
  };
  compression?: boolean; // Example: Add a compression option
  encoding?: string; // Example: Add an encoding option
  maxFileSize?: number; // Example: Add a maximum file size option
}

export interface FileTransportInterface extends BaseTransportInterface {
  type: TransportType.FILE;
  options?: FileTransportOptionsInterface;
}

export interface ApiTransportOptionsInterface {
  url: string;
  headers?: Record<string, string>;
}

export interface ApiTransportInterface extends BaseTransportInterface {
  type: TransportType.API;
  options?: ApiTransportOptionsInterface;
}

export interface TransportInterface {
  file?: FileTransportInterface;
  api?: ApiTransportInterface;
}
