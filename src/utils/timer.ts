// TODO: Implementation pending (work in progress)
export default class Timer {
  private intervalId: NodeJS.Timeout | null;
  private startTime: number;
  private pausedTime: number;
  private isPaused: boolean;

  constructor(
    private interval: number,
    private callback: () => void,
  ) {
    this.intervalId = null;
    this.startTime = 0;
    this.pausedTime = 0;
    this.isPaused = false;
  }

  start() {
    if (this.intervalId) return;

    this.startTime = Date.now();
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.callback();
      }
    }, this.interval);
  }

  pause() {
    if (!this.intervalId || this.isPaused) return;

    clearInterval(this.intervalId);
    this.pausedTime = Date.now() - this.startTime;
    this.isPaused = true;
  }

  resume() {
    if (!this.isPaused) return;

    this.startTime = Date.now() - this.pausedTime;
    this.intervalId = setInterval(() => {
      if (!this.isPaused) {
        this.callback();
      }
    }, this.interval);
    this.isPaused = false;
  }

  reset() {
    clearInterval(this.intervalId);
    this.intervalId = null;
    this.startTime = 0;
    this.pausedTime = 0;
    this.isPaused = false;
  }
}
