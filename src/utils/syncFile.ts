/*
 * 基于 Node 同步 fs API 的文本文件读写工具（UTF-8）。
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

/*
 * 同步写入文本文件；父目录或文件不存在时会创建。
 * 编码固定为 UTF-8。
 */
export function writeFileContentSync(
  filePath: string,
  content: string,
  mode: SyncFile.FileWriteMode
): void {
  mkdirSync(dirname(filePath), { recursive: true });
  const flag = mode === 'append' ? 'a' : 'w';
  writeFileSync(filePath, content, { encoding: 'utf8', flag });
}

/*
 * 同步读取文本文件，按 UTF-8 解码为字符串。
 */
export function readFileContentSync(filePath: string): string {
  return readFileSync(filePath, { encoding: 'utf8' });
}
