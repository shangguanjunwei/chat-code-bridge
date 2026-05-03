import asyncCheckNode from '@/config/envToolsConfig/env-check-utils/asyncCheckNode';
import asyncCheckLarkCli from '@/config/envToolsConfig/env-check-utils/asyncCheckLarkCli';
import asyncCheckCursorCli from '@/config/envToolsConfig/env-check-utils/asyncCheckCursorCli';
import asyncCheckClaudeCli from '@/config/envToolsConfig/env-check-utils/asyncCheckClaudeCli';
import asyncCheckCodexCli from '@/config/envToolsConfig/env-check-utils/asyncCheckCodexCli';
import asyncInstallNode from '@/config/envToolsConfig/env-install-utils/asyncInstallNode';
import asyncInstallLarkCli from '@/config/envToolsConfig/env-install-utils/asyncInstallLarkCli';
import asyncInstallCursorCli from '@/config/envToolsConfig/env-install-utils/asyncInstallCursorCli';
import asyncInstallClaudeCli from '@/config/envToolsConfig/env-install-utils/asyncInstallClaudeCli';
import asyncInstallCodexCli from '@/config/envToolsConfig/env-install-utils/asyncInstallCodexCli';

const envToolsConfig: Flows.EnvCheckMap = {
  node: {
    enabled: false,
    version: undefined,
    errorMsg: '',
    installDocPath: 'https://nodejs.org/en/download/',
    asyncEnvCheckConfig: asyncCheckNode,
    asyncInstallConfig: asyncInstallNode,
    group: 'BasicEnv',
  },
  '@larksuite/cli': {
    enabled: false,
    version: undefined,
    errorMsg: '',
    installDocPath: 'https://open.feishu.cn/document/mcp_open_tools/feishu-cli-let-ai-actually-do-your-work-in-feishu',
    asyncEnvCheckConfig: asyncCheckLarkCli,
    asyncInstallConfig: asyncInstallLarkCli,
    group: "RecommendedEnv",
  },
  'cursor-cli': {
    enabled: false,
    version: undefined,
    errorMsg: '',
    installDocPath: 'https://cursor.com/cn/cli',
    asyncEnvCheckConfig: asyncCheckCursorCli,
    asyncInstallConfig: asyncInstallCursorCli,
    group: "ToolEnv",
  },
  'claude-cli': {
    enabled: false,
    version: undefined,
    errorMsg: '',
    installDocPath: 'https://code.claude.com/docs/zh-CN/quickstart#homebrew',
    asyncEnvCheckConfig: asyncCheckClaudeCli,
    asyncInstallConfig: asyncInstallClaudeCli,
    group: "ToolEnv",
  },
  'codex-cli': {
    enabled: false,
    version: undefined,
    errorMsg: '',
    installDocPath: 'https://chatgpt.com/codex/cloud',
    asyncEnvCheckConfig: asyncCheckCodexCli,
    asyncInstallConfig: asyncInstallCodexCli,
    group: "ToolEnv",
  },
}

export default envToolsConfig;

