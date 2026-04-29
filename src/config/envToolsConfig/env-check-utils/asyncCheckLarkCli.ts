import { startSpawnCommand } from '@/utils/spawnCommand';
import envToolsConfig from '@/config/envToolsConfig';

const asyncCheckLarkCli = {
    prefix: `检查 @larksuite/cli 是否安装`,
    suffix: `@larksuite/cli 是否安装检查完成`,
    asyncFn: async () => {
        return new Promise<void>((resolve, reject) => {
            const childProcess = startSpawnCommand('lark-cli', ['--version'], { stdio: 'pipe' });
            childProcess.stdout?.on('data', (data) => {
                const version = data.toString().trim();
                if (version) {
                    envToolsConfig['@larksuite/cli'].enabled = true;
                    envToolsConfig['@larksuite/cli'].version = version;
                } else {
                    envToolsConfig['@larksuite/cli'].enabled = false;
                    envToolsConfig['@larksuite/cli'].version = undefined;
                    envToolsConfig['@larksuite/cli'].errorMsg = `@larksuite/cli 是否安装检查失败，版本号: ${version}`;
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
}

export default asyncCheckLarkCli;