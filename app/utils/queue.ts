type QueuedTask<T> = () => Promise<T>;

interface QueueItem<T> {
  task: QueuedTask<T>;
  resolve: (value: T) => void;
  reject: (error: unknown) => void;
}

export class ConcurrencyQueue {
  private running = 0;
  private queue: QueueItem<unknown>[] = [];

  constructor(private maxConcurrent: number) {}

  async run<T>(task: QueuedTask<T>): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      this.queue.push({ task, resolve, reject } as QueueItem<unknown>);
      this.process();
    });
  }

  private async process() {
    if (this.running >= this.maxConcurrent || this.queue.length === 0) {
      return;
    }

    const item = this.queue.shift()!;
    this.running++;

    try {
      const result = await item.task();
      item.resolve(result);
    } catch (err) {
      item.reject(err);
    } finally {
      this.running--;
      this.process();
    }
  }

  /** Current number of active tasks */
  get activeCount() {
    return this.running;
  }

  /** Current number of waiting tasks */
  get pendingCount() {
    return this.queue.length;
  }
}
