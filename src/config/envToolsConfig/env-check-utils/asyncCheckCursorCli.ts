import { startSpawnCommand } from '@/utils/spawnCommand';
import envToolsConfig from '@/config/envToolsConfig';
const asyncCheckCursorCli = {
  prefix: `检查 cursor-cli 是否安装`,
  suffix: `cursor-cli 是否安装检查完成`,
  asyncFn: async () => {
    return new Promise<void>((resolve, reject) => {
      const childProcess = startSpawnCommand('agent', ['--version'], { stdio: 'pipe' });
      childProcess.stdout?.on('data', (data) => {
        const version = data.toString().trim();
        if (version) {
          envToolsConfig['cursor-cli'].enabled = true;
          envToolsConfig['cursor-cli'].version = version;
        } else {
          envToolsConfig['cursor-cli'].enabled = false;
          envToolsConfig['cursor-cli'].version = undefined;
          envToolsConfig['cursor-cli'].errorMsg = `cursor-cli 是否安装检查失败，版本号: ${version}`;
        }
      });
      childProcess.once('error', error => {
        envToolsConfig['cursor-cli'].enabled = false;
        envToolsConfig['cursor-cli'].version = undefined;
        envToolsConfig['cursor-cli'].errorMsg = `cursor-cli 是否安装检查失败，错误: ${error.message}`;
        resolve();
      });
      childProcess.once('close', (code) => {
        if (code !== 0) {
          resolve();
          envToolsConfig['cursor-cli'].enabled = false;
          envToolsConfig['cursor-cli'].version = undefined;
          envToolsConfig['cursor-cli'].errorMsg = `cursor-cli 是否安装检查失败，退出码: ${code ?? 'unknown'}`;
        }
        resolve();
      });
    });
  },
}

export default asyncCheckCursorCli;