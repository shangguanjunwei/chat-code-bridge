/*
 * 终端串行异步任务队列相关类型。
 */
declare namespace SequentialTask {
  /*
   * 队列中单项：用于展示的文案前缀/后缀，以及实际执行的异步函数。
   */
  interface SequentialTaskItem {
    prefix: string;
    suffix: string;
    asyncFn: () => Promise<unknown>;
  }
}
