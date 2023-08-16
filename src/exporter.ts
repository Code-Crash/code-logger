import recorder from './recorder';

// Expose the doStart and doStop methods from the recorder instance
const doStart = () => recorder.doStart();
const doStop = () => recorder.doStop();

export default {
  doStart,
  doStop
};
