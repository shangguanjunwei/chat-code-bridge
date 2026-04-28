/*
 * 基础插件安装流程相关类型。
 */
declare namespace Flows {
  type EnvToolKey = 'node' | '@larksuite/cli' | 'cursor-cli' | 'claude-cli' | 'codex-cli';

  interface EnvCheckItem {
    enabled: boolean;
    version?: string;
    errorMsg: string;
    installDocPath: string;
  }

  type EnvCheckMap = Record<EnvToolKey, EnvCheckItem>;
}
