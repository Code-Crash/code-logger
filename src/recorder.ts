import Config from './utils/config';
import { EVENT_TYPES, RECORDER_STATUS, STRINGS } from './constants';
import proxy from './proxies';

class Recorder {

  doStart() {
    if (!Config.instance.isRecordingEnabled) {
      Config.instance.isRecordingEnabled = true;
      proxy.doStartProxies() // Start our all the proxies
      Config.instance.enabler(); // Enable recordings
    }
  }

  doStop() {
    if (Config.instance.isRecordingEnabled) {
      Config.instance.isRecordingEnabled = false;
      proxy.doStopProxies() // Stop our all the proxies
      Config.instance.disabler(); // Disable recordings
    }
  }
}

const recorder = new Recorder(); // Singleton object creation

export default recorder;
