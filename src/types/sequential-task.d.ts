/*
 * 串行异步任务列表中每一项的结构说明（全局类型）。
 */
declare global {
  /*
   * 单个串行任务：展示用前后缀 + 实际执行的异步函数。
   */
  interface SequentialTaskItem {
    prefix: string;
    suffix: string;
    asyncFn: () => Promise<unknown>;
  }
}

export {};
