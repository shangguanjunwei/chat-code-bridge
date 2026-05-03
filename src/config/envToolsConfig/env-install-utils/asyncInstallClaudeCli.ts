import startSpawnCommand from '@/utils/spawnCommand';
import envToolsConfig from '@/config/envToolsConfig';
import asyncCheckClaudeCli from '@/config/envToolsConfig/env-check-utils/asyncCheckClaudeCli';

const asyncInstallHomebrew: () => Promise<boolean> = () => {
  return new Promise<boolean>((resolve) => {
    const childProcess = startSpawnCommand(process.env.SHELL || '/bin/zsh', ['-lc', '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"'], { stdio: 'pipe' });
    childProcess.stdout?.on('data', (data) => {
      console.log(data.toString());
    });
    childProcess.once('error', error => {
      resolve(false);
    });
    childProcess.once('close', (code) => {
      if (code !== 0) {
        resolve(false);
      }
      resolve(true);
    });
  });
}

const asyncCheckHomebrew: () => Promise<boolean> = () => {
  return new Promise<boolean>((resolve) => {
    const childProcess = startSpawnCommand('brew', ['--version'], { stdio: 'pipe' });
    childProcess.stdout?.on('data', (data) => {
      console.log(data.toString());
      resolve(true);
    });
    childProcess.once('error', error => {
      resolve(false);
    });
    childProcess.once('close', async (code) => {
      if (code === 0) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

const asyncInstallClaudeCliFn: () => Promise<boolean> = () => {
  return new Promise<boolean>((resolve) => {
    const childProcess = startSpawnCommand('brew', ['install', '--cask', 'claude-code'], { stdio: 'pipe' });
    childProcess.stdout?.on('data', (data) => {
      console.log(data.toString());
    });
    childProcess.once('error', error => {
      envToolsConfig['claude-cli']!.enabled = false;
      envToolsConfig['claude-cli']!.version = undefined;
      envToolsConfig['claude-cli']!.errorMsg = `Claude CLI 安装失败，错误: ${error.message}`;
      resolve(false);
    });
    childProcess.once('close', async (code) => {
      if (code === 0) {
        await asyncCheckClaudeCli.asyncFn();
        resolve(true);
      } else {
        envToolsConfig['claude-cli']!.enabled = false;
        envToolsConfig['claude-cli']!.version = undefined;
        envToolsConfig['claude-cli']!.errorMsg = `Claude CLI 安装失败，退出码: ${code ?? 'unknown'}`;
        resolve(false);
      }
    });
  });
}

const asyncInstallClaudeCli: SequentialTask.SequentialTaskItem = {
  prefix: '安装 Claude CLI',
  suffix: 'Claude CLI 安装完成',
  asyncFn: async () => {
    let isHomebrewInstalled = await asyncCheckHomebrew();
    if (!isHomebrewInstalled) isHomebrewInstalled = await asyncInstallHomebrew();
    if (!isHomebrewInstalled) return;
    await asyncInstallClaudeCliFn();
    return;
  }
}

export default asyncInstallClaudeCli;