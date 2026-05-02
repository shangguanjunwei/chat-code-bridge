import { startSpawnCommand } from "@/utils/spawnCommand";
import envToolsConfig from "@/config/envToolsConfig";

const asyncCheckCodexCli: SequentialTask.SequentialTaskItem = {
  prefix: `检查 codex-cli 是否安装`,
  suffix: `codex-cli 是否安装检查完成`,
  asyncFn: async () => {
    return new Promise<void>((resolve) => {
      const childProcess = startSpawnCommand('codex', ['--version'], { stdio: 'pipe' });
      childProcess.stdout?.on('data', (data) => {
        const version = data.toString().trim();
        if (version) {
          envToolsConfig['codex-cli']!.enabled = true;
          envToolsConfig['codex-cli']!.version = version;
        } else {
          envToolsConfig['codex-cli']!.enabled = false;
          envToolsConfig['codex-cli']!.version = undefined;
          envToolsConfig['codex-cli']!.errorMsg = `codex-cli 是否安装检查失败，版本号: ${version}`;
        }
      });
      childProcess.once('error', (error) => {
        envToolsConfig['codex-cli']!.enabled = false;
        envToolsConfig['codex-cli']!.version = undefined;
        envToolsConfig['codex-cli']!.errorMsg = `codex-cli 是否安装检查失败，错误: ${error.message}`;
        resolve();
      });
      childProcess.once('close', (code) => {
        if (code !== 0) {
          envToolsConfig['codex-cli']!.enabled = false;
          envToolsConfig['codex-cli']!.version = undefined;
          envToolsConfig['codex-cli']!.errorMsg = `codex-cli 是否安装检查失败，退出码: ${code ?? 'unknown'}`;
        }
        resolve();
      });
    });
  },
}

export default asyncCheckCodexCli;