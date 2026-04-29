import asyncCheckNode from './env-check-utils/asyncCheckNode';
import asyncCheckLarkCli from './env-check-utils/asyncCheckLarkCli';
import asyncCheckCursorCli from './env-check-utils/asyncCheckCursorCli';
import asyncCheckClaudeCli from './env-check-utils/asyncCheckClaudeCli';
import asyncCheckCodexCli from './env-check-utils/asyncCheckCodexCli';
import asyncInstallNode from './env-install-utils/asyncInstallNode';
import asyncInstallLarkCli from './env-install-utils/asyncInstallLarkCli';
import asyncInstallCursorCli from './env-install-utils/asyncInstallCursorCli';
import asyncInstallClaudeCli from './env-install-utils/asyncInstallClaudeCli';
import asyncInstallCodexCli from './env-install-utils/asyncInstallCodexCli';

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
        installDocPath: 'https://www.anthropic.com/claude/docs/cli/installation',
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

