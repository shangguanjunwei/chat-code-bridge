import { runSequentialAsyncTasks } from '@/utils/runSequentialAsyncTasks';
import { startSpawnCommand } from '@/utils/spawnCommand';

async function main(): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const childProcess = startSpawnCommand('node', ['-v']);

    childProcess.once('error', reject);
    childProcess.once('close', (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`子进程退出码异常: ${code ?? 'unknown'}`));
    });
  });

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
    {
      prefix: '开始任务 3',
      suffix: '任务 3 完成',
      asyncFn: async () => {
        await new Promise((_, reject) => setTimeout(reject, 3000));
      },
    },
  ]);
}

main().catch((error: unknown) => {
  console.error('执行失败:', error);
  throw error;
});