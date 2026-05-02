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

  const uninstalledTools: { label: string; value: Flows.EnvCheckItem }[] = [];
  for (const [key, value] of Object.entries(envCheckResult)) {
    if (value.enabled) {
      uninstalledTools.push({
        label: key,
        value,
      });
    }
  }

  // 必须安装的工具
  const basicEnvUninstalledTools = toolsClassByGroup.BasicEnv.filter(item => uninstalledTools.find(tool => tool.label === item.label));
  if (basicEnvUninstalledTools.length > 0) {
    const result = await askYesNoBySpawn(`${basicEnvUninstalledTools.map(item => item.label).join(', ')}为必须安装的工具，是否继续？`);
    if (!result) return;
    await runSequentialAsyncTasks(basicEnvUninstalledTools.map(item => item.value.asyncInstallConfig));
  }

  console.log('11111111111', envToolsConfig);
  return;

  // 必须安装的工具（最少安装其中一个）
  const toolEnvUninstalledTools = toolsClassByGroup.ToolEnv.filter(item => uninstalledTools.find(tool => tool.label === item.label));
  if (toolEnvUninstalledTools.length > 0) {
    if (toolEnvUninstalledTools.length === 1) {
      const result2 = await askYesNoBySpawn(`${toolEnvUninstalledTools.map(item => item.label).join(', ')}为推荐安装的工具，是否继续？`);
      if (result2) {
        await runSequentialAsyncTasks(toolEnvUninstalledTools.map(item => item.value.asyncInstallConfig));
      }
    } else if (toolEnvUninstalledTools.length === toolsClassByGroup.ToolEnv.length) {
      const result3 = await askYesNoBySpawn(`${toolEnvUninstalledTools.map(item => item.label).join(', ')}为必须安装的工具（最少安装其中一个），是否继续？`);
      if (!result3) return;
      let choosedTool: { label: string; value: Flows.EnvCheckItem }[] = [];
      const fn = async () => {
        choosedTool = await multiSelectAction(toolEnvUninstalledTools, '请选择需要安装的工具（最少安装其中一个）');
        if (choosedTool.length === 0) await fn();
      }
      await fn();
      await runSequentialAsyncTasks(choosedTool.map(item => item.value.asyncInstallConfig));
    } else {
      const result4 = await askYesNoBySpawn(`${toolEnvUninstalledTools.map(item => item.label).join(', ')}为推荐安装的工具，是否继续？`);
      if (result4) {
        let choosedTool: { label: string; value: Flows.EnvCheckItem }[] = [];
        const fn = async () => {
          choosedTool = await multiSelectAction(toolEnvUninstalledTools, '请选择需要安装的工具');
          if (choosedTool.length === 0) await fn();
        }
        await fn();
        await runSequentialAsyncTasks(choosedTool.map(item => item.value.asyncInstallConfig));
      }
    }
  }

  // 推荐安装的工具
  const recommendedEnvUninstalledTools = toolsClassByGroup.RecommendedEnv.filter(item => uninstalledTools.find(tool => tool.label === item.label));
  if (recommendedEnvUninstalledTools.length > 0) {
    console.log('\n');
    const result5 = await askYesNoBySpawn(`${recommendedEnvUninstalledTools.map(item => item.label).join(', ')}为推荐安装的工具，您是否需要安装？`);
    if (result5) {
      await runSequentialAsyncTasks(recommendedEnvUninstalledTools.map(item => item.value.asyncInstallConfig));
    }
  }
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
