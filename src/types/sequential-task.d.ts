declare namespace SequentialTask {
  interface SequentialTaskItem {
    prefix: string;
    suffix: string;
    asyncFn: () => Promise<unknown>;
  }
}
