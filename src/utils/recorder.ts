import Config from './config';
import proxy from '../proxies';

class Recorder {
  doStart() {
    if (!Config.instance.isRecordingEnabled()) {
      Config.instance.enabler(); // Enable recordings
      proxy.doStartProxies(); // Start our all the proxies
    }
  }

  doStop() {
    if (Config.instance.isRecordingEnabled()) {
      proxy.doStopProxies(); // Stop our all the proxies
      Config.instance.disabler(); // Disable recordings
    }
  }
}

const recorder = new Recorder(); // Singleton object creation

export default recorder;
