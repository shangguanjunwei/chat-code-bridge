import checkEnvToolsFlows from '@/flows/checkEnvToolsFlows';
import envToolsConfig from '@/config/envToolsConfig/index';
import askYesNoBySpawn from '@/utils/askYesNoBySpawn';
import { runSequentialAsyncTasks } from '@/utils/runSequentialAsyncTasks';
import multiSelectAction from '@/utils/multiSelectAction';

const allEnvTools: { label: string; value: Flows.EnvCheckItem }[] = [];
for (const [key, value] of Object.entries(envToolsConfig)) {
  allEnvTools.push({
    label: key,
    value,
  });
}

const toolsClassByGroup: Record<Flows.EnvToolGroup, { label: string; value: Flows.EnvCheckItem }[]> = {
  BasicEnv: allEnvTools.filter(item => item.value.group === 'BasicEnv'),
  ToolEnv: allEnvTools.filter(item => item.value.group === 'ToolEnv'),
  RecommendedEnv: allEnvTools.filter(item => item.value.group === 'RecommendedEnv'),
}

async function main(): Promise<void> {
  const envCheckResult = await checkEnvToolsFlows();
  console.log('\n');

  const uninstalledTools: { label: string; value: Flows.EnvCheckItem }[] = [];
  for (const [key, value] of Object.entries(envCheckResult)) {
    if (value.enabled) {
      uninstalledTools.push({
        label: key,
        value,
      });
    }
  }

  const basicEnvUninstalledTools = toolsClassByGroup.BasicEnv.filter(item => uninstalledTools.find(tool => tool.label === item.label));
  const result = await askYesNoBySpawn(`${basicEnvUninstalledTools.map(item => item.label).join(', ')} 为必须安装的工具，是否继续？`);
  if (!result) return;
  await runSequentialAsyncTasks(basicEnvUninstalledTools.map(item => item.value.asyncInstallConfig));
  console.log('\n');

  const toolEnvUninstalledTools = toolsClassByGroup.ToolEnv.filter(item => uninstalledTools.find(tool => tool.label === item.label));
  const result2 = await askYesNoBySpawn(`${toolEnvUninstalledTools.map(item => item.label).join(', ')} 为必须安装的工具（最少安装其中一个），是否继续？`);
  if (!result2) return;
  let choosedTool: { label: string; value: Flows.EnvCheckItem }[] = [];
  const fn = async () => {
    choosedTool = await multiSelectAction(toolEnvUninstalledTools, '请选择需要安装的工具（最少安装其中一个）');
    if (choosedTool.length === 0) await fn();
  }
  await fn();
  await runSequentialAsyncTasks(choosedTool.map(item => item.value.asyncInstallConfig));
  console.log('\n');

  const recommendedEnvUninstalledTools = toolsClassByGroup.RecommendedEnv.filter(item => uninstalledTools.find(tool => tool.label === item.label));
  const result3 = await askYesNoBySpawn(`${recommendedEnvUninstalledTools.map(item => item.label).join(', ')} 为推荐安装的工具，是否继续？`);
  if (!result3) return;
  await runSequentialAsyncTasks(recommendedEnvUninstalledTools.map(item => item.value.asyncInstallConfig));
}

main()
  .then(() => {
    console.log('\n');
    console.log('安装完成✅');
  }).catch((error: any) => {
    console.log('\n');
    console.error('\n执行失败❌:', error.message);
  }).finally(() => {
    if (typeof process !== 'undefined') {
      process.exit?.(0);
    }
  });
