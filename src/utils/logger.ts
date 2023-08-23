// TODO: Implementation pending (work in progress)

import Timer from './timer';

interface Log {
  level: number;
  message: string;
}

export default class Logger {
  private queue: Log[] = [];
  private level: number;
  private threshold: number;
  private timer: Timer;

  constructor(level: number = 0, threshold: number = 10, interval: number = 5000) {
    this.level = level;
    this.threshold = threshold;
    this.timer = new Timer(interval, this.flush.bind(this));
    this.timer.start();
  }

  public setLevel(level: number): void {
    this.level = level;
  }

  public setThreshold(threshold: number): void {
    this.threshold = threshold;
  }

  public log(message: string, level: number = 0): void {
    const log: Log = { level, message };

    if (level >= this.level) {
      // TODO: Find a way to handle failed cases without console
      // console.log(message);
    }

    this.queue.push(log);

    if (this.queue.length >= this.threshold) {
      this.flush();
    }
  }

  public flush(): void {
    while (this.queue.length) {
      // const log = this.queue.shift();
      // TODO: Find a way to handle failed cases without console
      // console.log(log.message);
    }
  }
}
