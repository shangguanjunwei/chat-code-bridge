import checkEnvToolsFlows from '@/flows/checkEnvToolsFlows';
import multiSelectAction from '@/utils/multiSelectAction';
import envToolsConfig from '@/config/envToolsConfig/index';

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
  OtherEnv: allEnvTools.filter(item => item.value.group === 'OtherEnv'),
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
  const basicEnvUninstalledTools = toolsClassByGroup.BasicEnv.filter(item => uninstalledTools.find(tool => tool.label === item.label));

  // const toolEnvUninstalledTools = toolsClassByGroup.ToolEnv.filter(item => uninstalledTools.find(tool => tool.label === item.label));
  // const recommendedEnvUninstalledTools = toolsClassByGroup.RecommendedEnv.filter(item => uninstalledTools.find(tool => tool.label === item.label));
  // const otherEnvUninstalledTools = toolsClassByGroup.OtherEnv.filter(item => uninstalledTools.find(tool => tool.label === item.label));

  console.log('\n');
}

main()
  .then(() => {
    console.log('安装完成✅');
  }).catch((error: any) => {
    console.error('执行失败❌:', error.message);
  }).finally(() => {
    if (typeof process !== 'undefined') {
      process.exit?.(0);
    }
  });
