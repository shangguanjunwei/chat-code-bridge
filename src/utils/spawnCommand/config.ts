/*
 * 常用 CLI 命令在 Windows / macOS / Linux 下的可执行名映射表。
 */
const commandMappings: Record<string, CommandPlatformMapping> = {
  /* key 约定为 macOS 下的命令名 */
  npm: { win32: 'npm.cmd', darwin: 'npm', linux: 'npm' },
  npx: { win32: 'npx.cmd', darwin: 'npx', linux: 'npx' },
  pnpm: { win32: 'pnpm.cmd', darwin: 'pnpm', linux: 'pnpm' },
  yarn: { win32: 'yarn.cmd', darwin: 'yarn', linux: 'yarn' },
  node: { win32: 'node.exe', darwin: 'node', linux: 'node' },
};

/*
 * 将 macOS 风格的命令名解析为当前运行平台下应使用的命令字符串。
 * 无映射时原样返回入参。
 */
export function resolveCommandByPlatform(
  macCommand: string,
  platform: NodeJS.Platform = process.platform
): string {
  const mapping = commandMappings[macCommand];

  if (!mapping) {
    return macCommand;
  }

  if (platform === 'win32' || platform === 'darwin' || platform === 'linux') {
    return mapping[platform as SupportedCommandPlatform];
  }

  return macCommand;
}
