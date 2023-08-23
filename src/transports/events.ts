import { EventEmitter } from 'events';
import Config from '../utils/config';
import { EVENT_TYPES } from '../constants';
import { doRequest } from './api';
import { doFile } from './file';

class Events extends EventEmitter {
  public static instance: Events;

  constructor() {
    super();
    if (Events.instance) {
      return;
    }
    Events.instance = this;
  }

  // Write custom method to handle any specific requirement
  subscriptions = () => {
    Events.instance?.on(EVENT_TYPES.api, async payload => {
      try {
        if (Config.instance.isApiEnabled()) {
          await doRequest(Config.instance.getApiOptions(), payload);
        }
      } catch (error) {
        // TODO: Find a way to handle failed cases without console
        // console.log('Error: ', error);
      }
    });
    Events.instance?.on(EVENT_TYPES.file, async payload => {
      try {
        await doFile(payload);
      } catch (error) {
        // TODO: Find a way to handle failed cases without console
        // console.log('Error: ', error);
      }
    });
  };
}

const events = new Events(); // Singleton object creation

export default events;
