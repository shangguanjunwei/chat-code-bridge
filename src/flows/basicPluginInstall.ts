/*
 * 基础插件安装流程：按顺序安装预设插件列表。
 */
import { runSequentialAsyncTasks } from '@/utils/runSequentialAsyncTasks';
import { startSpawnCommand } from '@/utils/spawnCommand';

/*
 * 安装基础插件。默认使用 pnpm add -D 安装开发依赖插件。
 */
export async function installBasicPlugins(): Promise<void> {
  const tasks: SequentialTask.SequentialTaskItem[] = [
    {
      prefix: `安装基础插件 @larksuite/cli@latest`,
      suffix: `基础插件 @larksuite/cli@latest 安装完成`,
      asyncFn: async () => {
        await new Promise<void>((resolve, reject) => {
          const childProcess = startSpawnCommand(
            'npx',
            ['@larksuite/cli@latest', 'install'],
            { stdio: 'inherit' }
          );
          childProcess.once('error', reject);
          childProcess.once('close', (code) => {
            if (code === 0) {
              resolve();
              return;
            }
            reject(new Error(`安装插件 @larksuite/cli@latest 失败，退出码: ${code ?? 'unknown'}`));
          });
        });
      },
    }
  ];

  await runSequentialAsyncTasks(tasks);
}
