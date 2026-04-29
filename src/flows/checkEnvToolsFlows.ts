/*
 * 基础插件安装流程：按顺序安装预设插件列表。
 */
import { runSequentialAsyncTasks } from '@/utils/runSequentialAsyncTasks';
import envToolsConfig from '@/config/envToolsConfig/index';

/*
 * 安装基础插件。默认使用 pnpm add -D 安装开发依赖插件。
 */
export async function installBasicPlugins(): Promise<unknown> {
  const tasks = Object.values(envToolsConfig).map(item => item.asyncEnvCheckConfig);
  await runSequentialAsyncTasks(tasks);
  return envToolsConfig;
}
