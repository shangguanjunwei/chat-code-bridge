declare namespace Flows {
  type EnvToolKey = 'node' | '@larksuite/cli' | 'cursor-cli' | 'claude-cli' | 'codex-cli';

  type EnvToolGroup = 'BasicEnv' | 'ToolEnv' | 'RecommendedEnv';

  interface EnvCheckItem {
    enabled: boolean;
    version?: string;
    errorMsg: string;
    installDocPath: string;
    group: EnvToolGroup;
    asyncEnvCheckConfig: {
      prefix: string;
      suffix: string;
      asyncFn: () => Promise<unknown>;
    };
    asyncInstallConfig: {
      prefix: string;
      suffix: string;
      asyncFn: () => Promise<unknown>;
    };
  }

  type EnvCheckMap = Partial<Record<EnvToolKey, EnvCheckItem>>;
}
