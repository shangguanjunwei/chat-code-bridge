import { homedir } from 'node:os';
import { join } from 'node:path';

export const homePath = homedir();

export const USER_LOCAL_PROJECT_CONFIG_JSON_PATH = join(homePath, '.chat-code-bridge', 'project-config.json');
