declare global {
  interface SequentialTaskItem {
    prefix: string;
    suffix: string;
    asyncFn: () => Promise<unknown>;
  }
}

export {};
