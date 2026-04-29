/*
 * 应用入口：演示子进程版本查询与串行异步任务终端 UI。
 */
import { installBasicPlugins } from '@/flows/checkEnvToolsFlows';

/* 等待 node -v 子进程成功结束后再跑示例任务队列。 */
async function main(): Promise<void> {
  const envCheckResult = await installBasicPlugins();
  console.log('envCheckResult', envCheckResult);
  console.log('安装基础插件完成');
}

main().catch((error: unknown) => {
  console.error('执行失败:', error);
  throw error;
});
