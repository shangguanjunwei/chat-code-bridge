import { spawn, type ChildProcess, type SpawnOptions } from 'node:child_process';
import { resolveCommandByPlatform } from '@/utils/spawnCommand/config';

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
