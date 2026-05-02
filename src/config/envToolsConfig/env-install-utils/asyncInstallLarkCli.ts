import { startSpawnCommand } from '@/utils/spawnCommand';
import envToolsConfig from '@/config/envToolsConfig';
import asyncCheckLarkCli from '@/config/envToolsConfig/env-check-utils/asyncCheckLarkCli';

const asyncInstallLarkCli: SequentialTask.SequentialTaskItem = {
  prefix: '安装Lark CLI',
  suffix: '安装完成',
  asyncFn: async () => {
    return new Promise<void>((resolve) => {
      const childProcess = startSpawnCommand('npx', ['@larksuite/cli@latest', 'install'], { stdio: 'inherit' });
      childProcess.stdout?.on('data', (data) => {
        console.log(data.toString());
      });
      childProcess.once('error', error => {
        envToolsConfig['@larksuite/cli']!.enabled = false;
        envToolsConfig['@larksuite/cli']!.version = undefined;
        envToolsConfig['@larksuite/cli']!.errorMsg = `Lark CLI 安装失败，错误: ${error.message}`;
        resolve();
      });
      childProcess.once('close', async (code) => {
        if (code === 0) {
          await asyncCheckLarkCli.asyncFn();
          resolve();
        } else {
          envToolsConfig['@larksuite/cli']!.enabled = false;
          envToolsConfig['@larksuite/cli']!.version = undefined;
          envToolsConfig['@larksuite/cli']!.errorMsg = `Lark CLI 安装失败，退出码: ${code ?? 'unknown'}`;
          resolve();
        }
      });
    });
  }
}

export default asyncInstallLarkCli;