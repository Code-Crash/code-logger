import { EventEmitter } from 'events';
import Config from './utils/config';
import { EVENT_TYPES, RECORDER_STATUS, STRINGS } from './constants';
import proxy from './proxies';

class Recorder extends EventEmitter {

  doStart() {
    if (!Config.instance.isRecordingEnabled) {
      Config.instance.isRecordingEnabled = true;
      this.emit(EVENT_TYPES.start, { message: STRINGS.start, status: RECORDER_STATUS.start });
    } else {
      this.emit(EVENT_TYPES.start, { message: STRINGS.started, status: RECORDER_STATUS.started });
    }
  }

  doStop() {
    if (Config.instance.isRecordingEnabled) {
      Config.instance.isRecordingEnabled = false;
      this.emit(EVENT_TYPES.stop, { message: STRINGS.stop, status: RECORDER_STATUS.stop });
    } else {
      this.emit(EVENT_TYPES.stop, { message: STRINGS.stopped, status: RECORDER_STATUS.stopped });
    }
  }
}

const recorder = new Recorder(); // Singleton object creation

/**
 * Note: We are using event emitter to handle this because of bigger picture of this small library, 
 *       we could simple avoid this, still I believe, it will help us to maintain and keep code clean.
 */

// Subscribe to the 'start' event
recorder.on(EVENT_TYPES.start, (message: string) => {
  if (message === STRINGS.started) return; // Return if already started
  proxy.doStartProxies() // Start our all the proxies
  Config.instance.enabler(); // Enable recordings
});

// Subscribe to the 'stop' event
recorder.on(EVENT_TYPES.stop, (message: string) => {
  if (message === STRINGS.stopped) return; // Return if already stopped
  proxy.doStopProxies() // Stop our all the proxies
  Config.instance.disabler(); // Disable recordings
});

export default recorder;
