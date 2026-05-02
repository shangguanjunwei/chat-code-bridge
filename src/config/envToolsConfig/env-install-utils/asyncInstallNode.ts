import { startSpawnCommand } from '@/utils/spawnCommand';
import envToolsConfig from '@/config/envToolsConfig';
import asyncCheckNode from '../env-check-utils/asyncCheckNode';

const asyncInstallNvm: () => Promise<boolean> = () => {
  return new Promise<boolean>(async (resolve) => {
    const step1 = async () => {
      return new Promise<boolean>((resolve1) => {
        const childProcess = startSpawnCommand(process.env.SHELL || '/bin/zsh', ['-lc', 'curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.4/install.sh | bash'], { stdio: 'pipe' });
        childProcess.stdout?.on('data', (data) => {
          console.log('data', data.toString());
        });
        childProcess.once('error', error => {
          resolve1(false);
        });
        childProcess.once('close', (code) => {
          if (code !== 0) {
            resolve1(false);
          }
          resolve1(true);
        });
      });
    }
    const result1 = await step1();
    if (!result1) resolve(false);

    const step2 = async () => {
      return new Promise<boolean>((resolve2) => {
        const childProcess = startSpawnCommand(process.env.SHELL || '/bin/zsh', ['-lc', '.\ "$HOME/.nvm/nvm.sh" && nvm --version']);
        childProcess.once('error', error => {
          resolve2(false);
        });
        childProcess.once('close', (code) => {
          if (code !== 0) {
            resolve2(false);
          }
          resolve2(true);
        });
      });
    }
    const result2 = await step2();
    resolve(!!result2);
  });
}

const asyncCheckNvm: () => Promise<boolean> = () => {
  return new Promise<boolean>((resolve) => {
    const childProcess = startSpawnCommand(process.env.SHELL || '/bin/zsh', ['-lc', 'nvm --version'], { stdio: 'pipe' });
    childProcess.stdout?.on('data', (data) => {
      resolve(true);
    });
    childProcess.once('error', error => {
      resolve(false);
    });
    childProcess.once('close', (code) => {
      if (code !== 0) {
        resolve(true);
      }
      resolve(false);
    });
  });
}

const asyncInstallNodeFn: () => Promise<boolean> = async () => {
  return new Promise<boolean>(async (resolve) => {
    // 安装 node
    const childProcess = startSpawnCommand(process.env.SHELL || '/bin/zsh', ['-lc', 'nvm install --lts']);
    childProcess.stdout?.on('data', (data) => {
      console.log('data', data.toString());
    });
    childProcess.once('error', error => {
      envToolsConfig['node']!.enabled = false;
      envToolsConfig['node']!.version = undefined;
      envToolsConfig['node']!.errorMsg = `Node.js 安装失败，错误: ${error.message}`;
      resolve(false);
    });
    childProcess.once('close', async (code) => {
      if (code === 0) {
        await asyncCheckNode.asyncFn();
        resolve(true);
      } else {
        envToolsConfig['node']!.enabled = false;
        envToolsConfig['node']!.version = undefined;
        envToolsConfig['node']!.errorMsg = `Node.js 安装失败，退出码: ${code ?? 'unknown'}`;
        resolve(false);
      }
    });
  });
}

const asyncInstallNode: SequentialTask.SequentialTaskItem = {
  prefix: '安装 Node.js',
  suffix: '安装完成 Node.js',
  asyncFn: async () => {
    return new Promise<void>(async (resolve) => {
      // 检查 nvm 是否安装
      let isNvmInstalled = await asyncCheckNvm();
      if (!isNvmInstalled) isNvmInstalled = await asyncInstallNvm();
      if (!isNvmInstalled) resolve();
      // 安装 node
      await asyncInstallNodeFn();
      resolve();
    });
  }
}

export default asyncInstallNode;