import recorder from './utils/recorder';
import Config from './utils/config';
import events from './transports/events';
import log from './utils/log';

// Instantiate default Config
const config = new Config();
events.subscriptions(); // subscribe register events
// Note: export only helpers which is required outside the library, we can't make private as internally we have to use it.
const helpers = {
  setApi: config.setApi.bind(config),
  isConsoleEnabled: config.isConsoleEnabled.bind(config),
  isLoggerEnabled: config.isLoggerEnabled.bind(config),
  isOriginalConsoleEnabled: config.isOriginalConsoleEnabled.bind(config),
  isRecordingEnabled: config.isRecordingEnabled.bind(config),
  isApiEnabled: config.isApiEnabled.bind(config),
};

// Expose the doStart and doStop methods from the recorder instance
const doStart = () => recorder.doStart();
const doStop = () => recorder.doStop();

export default {
  helpers,
  log,
  doStart,
  doStop,
};
