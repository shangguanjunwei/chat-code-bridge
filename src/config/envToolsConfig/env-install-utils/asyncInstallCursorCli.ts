import { startSpawnCommand } from '@/utils/spawnCommand';
import envToolsConfig from '@/config/envToolsConfig';
import asyncCheckCursorCli from '../env-check-utils/asyncCheckCursorCli';

const asyncInstallCursorCli = {
  prefix: '安装Cursor CLI',
  suffix: '安装完成',
  asyncFn: async () => {
    // # Install (macOS, Linux, WSL)
    // curl -fsSL https://cursor.com/install | bash
    // # 安装 (Windows PowerShell)
    // irm 'https://cursor.com/install?win32=true' | iex

    return new Promise<void>((resolve, reject) => {
      const isWin = process.platform === 'win32';
      const command = isWin ? 'powershell' : 'sh';
      const args = isWin
        ? ['-NoProfile', '-Command', "irm 'https://cursor.com/install?win32=true' | iex"]
        : ['-c', 'curl -fsSL https://cursor.com/install | bash'];

      const childProcess = startSpawnCommand(command, args, { stdio: ['ignore', 'pipe', 'inherit'] });
      childProcess.stdout?.on('data', (data) => {
        process.stdout.write(data);
      });
      childProcess.once('error', error => {
        envToolsConfig['cursor-cli']!.enabled = false;
        envToolsConfig['cursor-cli']!.version = undefined;
        envToolsConfig['cursor-cli']!.errorMsg = `Cursor CLI 安装失败，错误: ${error.message}`;
        resolve();
      });
      childProcess.once('close', async (code) => {
        if (code === 0) {
          await asyncCheckCursorCli.asyncFn();
          resolve();
        } else {
          envToolsConfig['cursor-cli']!.enabled = false;
          envToolsConfig['cursor-cli']!.version = undefined;
          envToolsConfig['cursor-cli']!.errorMsg = `Cursor CLI 安装失败，退出码: ${code ?? 'unknown'}`;
          resolve();
        }
      });
    });
  }
}

export default asyncInstallCursorCli;