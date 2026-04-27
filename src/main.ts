import { runSequentialAsyncTasks } from './utils/runSequentialAsyncTasks';

async function main(): Promise<void> {
  await runSequentialAsyncTasks([
    {
      prefix: '开始任务 1',
      suffix: '任务 1 完成',
      asyncFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000));
      },
    },
    {
      prefix: '开始任务 2',
      suffix: '任务 2 完成',
      asyncFn: async () => {
        await new Promise((resolve) => setTimeout(resolve, 500));
      },
    },
  ]);
}

main().catch((error: unknown) => {
  console.error('执行失败:', error);
  throw error;
});