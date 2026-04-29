import checkEnvToolsFlows from '@/flows/checkEnvToolsFlows';
import multiSelectAction from '@/utils/multiSelectAction';

async function main(): Promise<void> {
  const envCheckResult = await checkEnvToolsFlows();
  console.log('\n');
  const noInstallEnvTools = [];
  for (const [key, value] of Object.entries(envCheckResult)) {
    if (value.enabled) {
      noInstallEnvTools.push({
        label: key,
        value: value,
      });
    }
  }
  const selectedEnvTools = await multiSelectAction(noInstallEnvTools, '请选择需要安装的插件', 'label');
  console.log('selectedEnvTools', selectedEnvTools);
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
