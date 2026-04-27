/*
 * 子进程命令在不同操作系统上的解析与映射相关类型。
 */
declare namespace SpawnCommand {
  /*
   * 当前工具显式处理的 Node process.platform 取值。
   */
  type SupportedCommandPlatform = 'win32' | 'darwin' | 'linux';

  /*
   * 同一逻辑命令在 Windows / macOS / Linux 下的可执行名（或约定名）。
   */
  interface CommandPlatformMapping {
    win32: string;
    darwin: string;
    linux: string;
  }
}
