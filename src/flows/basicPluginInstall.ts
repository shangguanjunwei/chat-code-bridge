/*
 * 基础插件安装流程：按顺序安装预设插件列表。
 */
import { runSequentialAsyncTasks } from '@/utils/runSequentialAsyncTasks';
import { startSpawnCommand } from '@/utils/spawnCommand';

const envCheck: Flows.EnvCheckMap = {
  node: {
    enabled: false,
    version: undefined,
    errorMsg: '',
    installDocPath: 'https://nodejs.org/en/download/',
  },
  '@larksuite/cli': {
    enabled: false,
    version: undefined,
    errorMsg: '',
    installDocPath: 'https://open.feishu.cn/document/mcp_open_tools/feishu-cli-let-ai-actually-do-your-work-in-feishu',
  },
  'cursor-cli': {
    enabled: false,
    version: undefined,
    errorMsg: '',
    installDocPath: 'https://cursor.com/cn/cli',
  },
  'claude-cli': {
    enabled: false,
    version: undefined,
    errorMsg: '',
    installDocPath: 'https://www.anthropic.com/claude/docs/cli/installation',
  },
  'codex-cli': {
    enabled: false,
    version: undefined,
    errorMsg: '',
    installDocPath: 'https://chatgpt.com/codex/cloud',
  },
  // '@wecom/aibot-node-sdk': {
  //   enabled: false,
  //   version: undefined,
  //   errorMsg: '',
  //   installDocPath: 'https://www.npmjs.com/package/@wecom/aibot-node-sdk',
  //   // 【另一个参考】 https://www.npmjs.com/package/@wecom/wecom-aibot-sdk
  // }
}

/*
 * 安装基础插件。默认使用 pnpm add -D 安装开发依赖插件。
 */
export async function installBasicPlugins(): Promise<void> {
  const tasks: SequentialTask.SequentialTaskItem[] = [
    {
      prefix: `检查 node 环境`,
      suffix: `node 环境检查完成`,
      asyncFn: async () => {
        return new Promise<void>((resolve, reject) => {
          const childProcess = startSpawnCommand('node', ['-v'], { stdio: 'pipe' });
          childProcess.stdout?.on('data', (data) => {
            const version = data.toString().trim();
            if (version.startsWith('v') && version.split('v')[1] >= '20') {
              envCheck.node.enabled = true;
              envCheck.node.version = version;
            } else {
              envCheck.node.enabled = false;
              envCheck.node.version = undefined;
              envCheck.node.errorMsg = `node 环境检查失败，版本号: ${version}`;
            }
          });
          childProcess.once('error', reject);
          childProcess.once('close', (code) => {
            console.log('code', code);
            if (code === 0) {
              resolve();
              return;
            }
            reject(new Error(`node 环境检查失败，退出码: ${code ?? 'unknown'}`));
          });
        });
      },
    },
    {
      prefix: `检查 @larksuite/cli 是否安装`,
      suffix: `@larksuite/cli 是否安装检查完成`,
      asyncFn: async () => {
        return new Promise<void>((resolve, reject) => {
          const childProcess = startSpawnCommand('lark-cli', ['--version'], { stdio: 'pipe' });
          childProcess.stdout?.on('data', (data) => {
            const version = data.toString().trim();
            if (version) {
              envCheck['@larksuite/cli'].enabled = true;
              envCheck['@larksuite/cli'].version = version;
            } else {
              envCheck['@larksuite/cli'].enabled = false;
              envCheck['@larksuite/cli'].version = undefined;
              envCheck['@larksuite/cli'].errorMsg = `@larksuite/cli 是否安装检查失败，版本号: ${version}`;
            }
          });
          childProcess.once('error', reject);
          childProcess.once('close', (code) => {
            if (code === 0) {
              resolve();
              return;
            }
            reject(new Error(`@larksuite/cli 是否安装检查失败，退出码: ${code ?? 'unknown'}`));
          });
        });
      },
    },
    {
      prefix: `检查 cursor-cli 是否安装`,
      suffix: `cursor-cli 是否安装检查完成`,
      asyncFn: async () => {
        return new Promise<void>((resolve, reject) => {
          const childProcess = startSpawnCommand('agent', ['--version'], { stdio: 'pipe' });
          childProcess.stdout?.on('data', (data) => {
            const version = data.toString().trim();
            if (version) {
              envCheck['cursor-cli'].enabled = true;
              envCheck['cursor-cli'].version = version;
            } else {
              envCheck['cursor-cli'].enabled = false;
              envCheck['cursor-cli'].version = undefined;
              envCheck['cursor-cli'].errorMsg = `cursor-cli 是否安装检查失败，版本号: ${version}`;
            }
          });
          childProcess.once('error', reject);
          childProcess.once('close', (code) => {
            if (code === 0) {
              resolve();
              return;
            }
            reject(new Error(`cursor-cli 是否安装检查失败，退出码: ${code ?? 'unknown'}`));
          });
        });
      },
    },
    {
      prefix: `检查 claude-cli 是否安装`,
      suffix: `claude-cli 是否安装检查完成`,
      asyncFn: async () => {
        return new Promise<void>((resolve, reject) => {
          const childProcess = startSpawnCommand('claude', ['--version'], { stdio: 'pipe' });
          childProcess.stdout?.on('data', (data) => {
            const version = data.toString().trim();
            if (version) {
              envCheck['claude-cli'].enabled = true;
              envCheck['claude-cli'].version = version;
            } else {
              envCheck['claude-cli'].enabled = false;
              envCheck['claude-cli'].version = undefined;
              envCheck['claude-cli'].errorMsg = `claude-cli 是否安装检查失败，版本号: ${version}`;
            }
          });
          childProcess.once('error', reject);
          childProcess.once('close', (code) => {
            if (code === 0) {
              resolve();
              return;
            }
            reject(new Error(`claude-cli 是否安装检查失败，退出码: ${code ?? 'unknown'}`));
          });
        });
      },
    },
    {
      prefix: `检查 codex-cli 是否安装`,
      suffix: `codex-cli 是否安装检查完成`,
      asyncFn: async () => {
        return new Promise<void>((resolve, reject) => {
          const childProcess = startSpawnCommand('codex', ['--version'], { stdio: 'pipe' });
          childProcess.stdout?.on('data', (data) => {
            const version = data.toString().trim();
            if (version) {
              envCheck['codex-cli'].enabled = true;
              envCheck['codex-cli'].version = version;
            }
          });
          childProcess.once('error', reject);
          childProcess.once('close', (code) => {
            if (code === 0) {
              resolve();
              return;
            }
            reject(new Error(`codex-cli 是否安装检查失败，退出码: ${code ?? 'unknown'}`));
          });
        });
      },
    }

    // {
    //   prefix: `安装基础插件 @larksuite/cli`,
    //   suffix: `基础插件 @larksuite/cli 安装完成`,
    //   asyncFn: async () => {
    //     await new Promise<void>((resolve, reject) => {
    //       const childProcess = startSpawnCommand(
    //         'npx',
    //         ['@larksuite/cli@latest', 'install'],
    //         { stdio: 'inherit' }
    //       );
    //       childProcess.once('error', reject);
    //       childProcess.once('close', (code) => {
    //         if (code === 0) {
    //           resolve();
    //           return;
    //         }
    //         reject(new Error(`安装插件 @larksuite/cli@latest 失败，退出码: ${code ?? 'unknown'}`));
    //       });
    //     });
    //   },
    // }
  ];

  await runSequentialAsyncTasks(tasks);

  console.log('envCheck', envCheck);
}
