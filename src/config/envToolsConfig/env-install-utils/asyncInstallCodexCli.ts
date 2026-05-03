import startSpawnCommand from '@/utils/spawnCommand';
import envToolsConfig from '@/config/envToolsConfig';
import asyncCheckCodexCli from '@/config/envToolsConfig/env-check-utils/asyncCheckCodexCli';

const asyncInstallCodexCli: SequentialTask.SequentialTaskItem = {
  prefix: '安装Codex CLI',
  suffix: '安装完成',
  asyncFn: async () => {
    return new Promise<void>((resolve) => {
      const childProcess = startSpawnCommand('npm', ['i', '-g', '@openai/codex'], { stdio: 'pipe' });
      childProcess.stdout?.on('data', (data) => {
        console.log(data.toString());
      });
      childProcess.once('error', error => {
        envToolsConfig['codex-cli']!.enabled = false;
        envToolsConfig['codex-cli']!.version = undefined;
        envToolsConfig['codex-cli']!.errorMsg = `Codex CLI 安装失败，错误: ${error.message}`;
        resolve();
      });
      childProcess.once('close', async (code) => {
        if (code !== 0) {
          envToolsConfig['codex-cli']!.enabled = false;
          envToolsConfig['codex-cli']!.version = undefined;
          envToolsConfig['codex-cli']!.errorMsg = `Codex CLI 安装失败，退出码: ${code ?? 'unknown'}`;
          resolve();
        } else {
          await asyncCheckCodexCli.asyncFn();
          resolve();
        }
      });
    });
  }
}

export default asyncInstallCodexCli;