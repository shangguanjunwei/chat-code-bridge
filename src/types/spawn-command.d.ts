/*
 * 子进程命令在常见操作系统上的名称映射相关全局类型。
 */
declare global {
  /*
   * 本工具显式支持的 Node 平台标识。
   */
  type SupportedCommandPlatform = 'win32' | 'darwin' | 'linux';

  /*
   * 同一逻辑命令在各平台上的可执行文件名（或约定名）。
   */
  interface CommandPlatformMapping {
    win32: string;
    darwin: string;
    linux: string;
  }
}

export {};
