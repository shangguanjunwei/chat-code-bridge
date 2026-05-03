import checkAndInstallEnvToolsFlows from '@/flows/checkAndInstallEnvToolsFlows';

async function main(): Promise<void> {
  await checkAndInstallEnvToolsFlows();
}

main()
  .then(() => {
    console.log('\n');
    // console.log('安装完成✅');
  }).catch((error: any) => {
    console.log('\n');
    console.error('\n执行失败❌:', error.message);
  }).finally(() => {
    if (typeof process !== 'undefined') {
      process.exit?.(0);
    }
  });