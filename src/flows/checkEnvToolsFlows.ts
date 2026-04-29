import { runSequentialAsyncTasks } from '@/utils/runSequentialAsyncTasks';
import envToolsConfig from '@/config/envToolsConfig/index';

export async function installBasicPlugins(): Promise<unknown> {
  const tasks = Object.values(envToolsConfig).map(item => item.asyncEnvCheckConfig);
  await runSequentialAsyncTasks(tasks);
  return envToolsConfig;
}
