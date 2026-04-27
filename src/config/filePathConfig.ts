/*
 * 应用内各类文件路径所参照的根目录：当前用户主目录（绝对路径）。
 */
import { homedir } from 'node:os';
import { join } from 'node:path';

/*
 * 用户主目录绝对路径；业务中的文件路径均应相对于此根拼接或解析。
 */
export const homePath = homedir();

/*
 * 用户项目配置文件绝对路径（位于主目录下 .chat-code-bridge/project-config.json）。
 */
export const USER_LOCAL_PROJECT_CONFIG_JSON_PATH = join(
  homePath,
  '.chat-code-bridge',
  'project-config.json'
);
