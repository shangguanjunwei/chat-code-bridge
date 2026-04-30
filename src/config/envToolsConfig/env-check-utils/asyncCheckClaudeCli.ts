import { startSpawnCommand } from '@/utils/spawnCommand';
import envToolsConfig from '@/config/envToolsConfig';

const asyncCheckClaudeCli: SequentialTask.SequentialTaskItem = {
  prefix: `检查 claude-cli 是否安装`,
  suffix: `claude-cli 是否安装检查完成`,
  asyncFn: async () => {
    return new Promise<void>((resolve) => {
      const childProcess = startSpawnCommand('claude', ['--version'], { stdio: 'pipe' });
      childProcess.stdout?.on('data', (data) => {
        const version = data.toString().trim();
        if (version) {
          envToolsConfig['claude-cli'].enabled = true;
          envToolsConfig['claude-cli'].version = version;
        } else {
          envToolsConfig['claude-cli'].enabled = false;
          envToolsConfig['claude-cli'].version = undefined;
          envToolsConfig['claude-cli'].errorMsg = `claude-cli 是否安装检查失败，版本号: ${version}`;
        }
      });
      childProcess.once('error', error => {
        envToolsConfig['claude-cli'].enabled = false;
        envToolsConfig['claude-cli'].version = undefined;
        envToolsConfig['claude-cli'].errorMsg = `claude-cli 是否安装检查失败，错误: ${error.message}`;
        resolve();
      });
      childProcess.once('close', (code) => {
        if (code !== 0) {
          envToolsConfig['claude-cli'].enabled = false;
          envToolsConfig['claude-cli'].version = undefined;
          envToolsConfig['claude-cli'].errorMsg = `claude-cli 是否安装检查失败，退出码: ${code ?? 'unknown'}`;
        }
        resolve();
      });
    });
  },
}

export default asyncCheckClaudeCli;