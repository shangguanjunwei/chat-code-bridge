/*
 * 终端 ANSI 转义序列颜色，用于控制台输出高亮与重置样式。
 */
export enum TerminalColor {
  White = '\x1b[37m',
  Gray = '\x1b[90m',
  Green = '\x1b[32m',
  Red = '\x1b[31m',
  Reset = '\x1b[0m',
}
