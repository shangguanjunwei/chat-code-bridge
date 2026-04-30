const asyncInstallClaudeCli: SequentialTask.SequentialTaskItem = {
  prefix: '安装 Claude CLI',
  suffix: 'Claude CLI 安装完成',
  asyncFn: async () => {
    console.log('安装Claude CLI');
  }
}

export default asyncInstallClaudeCli;