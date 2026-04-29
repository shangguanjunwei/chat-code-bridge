import { installBasicPlugins } from '@/flows/checkEnvToolsFlows';

async function main(): Promise<void> {
  const envCheckResult = await installBasicPlugins();
  console.log('envCheckResult', envCheckResult);
  console.log('安装基础插件完成');
}

main().catch((error: unknown) => {
  console.error('执行失败:', error);
  throw error;
});
