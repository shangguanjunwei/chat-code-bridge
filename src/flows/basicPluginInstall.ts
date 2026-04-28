/*
 * 基础插件安装流程：按顺序安装预设插件列表。
 */
import { runSequentialAsyncTasks } from '@/utils/runSequentialAsyncTasks';
import { startSpawnCommand } from '@/utils/spawnCommand';

/*
 * 默认基础插件列表，可按需传参覆盖。
 */
const defaultBasicPlugins: Flows.BasicPluginInstallItem[] = [
  {
    pluginName: '@larksuite/cli@latest',
    command: 'npx',
    args: ['@larksuite/cli@latest', 'install'],
    options: {
      stdio: ['inherit', 'inherit', 'pipe'],
    },
  }
];

/*
 * 安装基础插件。默认使用 pnpm add -D 安装开发依赖插件。
 */
export async function installBasicPlugins(
  plugins: Flows.BasicPluginInstallItem[] = defaultBasicPlugins
): Promise<void> {
  const tasks: SequentialTask.SequentialTaskItem[] = plugins.map((plugin) => ({
    prefix: `安装基础插件 ${plugin.pluginName}`,
    suffix: `基础插件 ${plugin.pluginName} 安装完成`,
    asyncFn: async () => {
      await new Promise<void>((resolve, reject) => {
        const childProcess = startSpawnCommand(plugin.command, plugin.args, plugin.options);

        childProcess.once('error', reject);
        childProcess.once('close', (code) => {
          if (code === 0) {
            resolve();
            return;
          }

          reject(new Error(`安装插件 ${plugin.pluginName} 失败，退出码: ${code ?? 'unknown'}`));
        });
      });
    },
  }));

  await runSequentialAsyncTasks(tasks);
}
