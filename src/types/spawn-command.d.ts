declare namespace SpawnCommand {
  type SupportedCommandPlatform = 'win32' | 'darwin' | 'linux';

  interface CommandPlatformMapping {
    win32: string;
    darwin: string;
    linux: string;
  }
}
