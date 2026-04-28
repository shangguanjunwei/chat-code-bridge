/*
 * 基础插件安装流程相关类型。
 */
declare namespace Flows {
  /*
   * 单个插件安装项：命令、参数与可选的 spawn 启动配置。
   */
  interface BasicPluginInstallItem {
    pluginName: string;
    command: string;
    args: string[];
    options?: import('node:child_process').SpawnOptions;
  }
}
