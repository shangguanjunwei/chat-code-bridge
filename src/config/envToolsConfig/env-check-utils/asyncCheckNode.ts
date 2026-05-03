import startSpawnCommand from '@/utils/spawnCommand';
import envToolsConfig from '@/config/envToolsConfig';

const asyncCheckNode: SequentialTask.SequentialTaskItem = {
  prefix: `检查 node 环境`,
  suffix: `node 环境检查完成`,
  asyncFn: async () => {
    return new Promise<void>((resolve) => {
      const childProcess = startSpawnCommand('node', ['-v'], { stdio: 'pipe' });
      childProcess.stdout?.on('data', (data) => {
        const version = data.toString().trim();
        if (version.startsWith('v') && version.split('v')[1] >= '22') {
          envToolsConfig.node!.enabled = true;
          envToolsConfig.node!.version = version;
        } else {
          envToolsConfig.node!.enabled = false;
          envToolsConfig.node!.version = undefined;
          envToolsConfig.node!.errorMsg = `node 环境检查失败，版本号: ${version}`;
        }
      });
      childProcess.once('error', error => {
        envToolsConfig.node!.enabled = false;
        envToolsConfig.node!.version = undefined;
        envToolsConfig.node!.errorMsg = `node 环境检查失败，错误: ${error.message}`;
        resolve();
      });
      childProcess.once('close', (code) => {
        if (code !== 0) {
          envToolsConfig.node!.enabled = false;
          envToolsConfig.node!.version = undefined;
          envToolsConfig.node!.errorMsg = `node 环境检查失败，退出码: ${code ?? 'unknown'}`;
        }
        resolve();
      });
    });
  },
}
export default asyncCheckNode;