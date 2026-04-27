export interface SequentialTaskItem {
  prefix: string;
  suffix: string;
  asyncFn: () => Promise<unknown>;
}

export async function runSequentialAsyncTasks(
  tasks: SequentialTaskItem[]
): Promise<void> {
  for (const task of tasks) {
    console.log(task.prefix);
    await task.asyncFn();
    console.log(task.suffix);
  }
}
