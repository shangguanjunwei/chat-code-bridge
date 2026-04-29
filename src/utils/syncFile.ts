import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';

export function writeFileContentSync(
  filePath: string,
  content: string,
  mode: SyncFile.FileWriteMode
): void {
  mkdirSync(dirname(filePath), { recursive: true });
  const flag = mode === 'append' ? 'a' : 'w';
  writeFileSync(filePath, content, { encoding: 'utf8', flag });
}

export function readFileContentSync(filePath: string): string {
  return readFileSync(filePath, { encoding: 'utf8' });
}
