/*
 * 封装 child_process.spawn：按平台解析命令名并启动子进程。
 */
import { spawn, type ChildProcess, type SpawnOptions } from 'node:child_process';
import { resolveCommandByPlatform } from '@/utils/spawnCommand/config';

/*
 * 启动子进程；Windows 下默认使用 shell，stdio 继承当前终端。
 */
export function startSpawnCommand(
  command: string,
  args: string[] = [],
  options: SpawnOptions = {}
): ChildProcess {
  const resolvedCommand = resolveCommandByPlatform(command);

  return spawn(resolvedCommand, args, {
    stdio: 'inherit',
    shell: process?.platform === 'win32',
    ...options,
  });
}
