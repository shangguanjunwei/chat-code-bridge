const commandMappings: Record<string, CommandPlatformMapping> = {
  // key 约定为 macOS 下的命令名
  npm: { win32: 'npm.cmd', darwin: 'npm', linux: 'npm' },
  npx: { win32: 'npx.cmd', darwin: 'npx', linux: 'npx' },
  pnpm: { win32: 'pnpm.cmd', darwin: 'pnpm', linux: 'pnpm' },
  yarn: { win32: 'yarn.cmd', darwin: 'yarn', linux: 'yarn' },
  node: { win32: 'node.exe', darwin: 'node', linux: 'node' },
};

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
