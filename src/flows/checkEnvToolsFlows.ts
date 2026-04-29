import { runSequentialAsyncTasks } from '@/utils/runSequentialAsyncTasks';
import envToolsConfig from '@/config/envToolsConfig/index';

async function checkEnvToolsFlows(): Promise<Flows.EnvCheckMap> {
  const tasks = Object.values(envToolsConfig).map(item => item.asyncEnvCheckConfig);
  await runSequentialAsyncTasks(tasks);
  return envToolsConfig;
}

export default checkEnvToolsFlows;