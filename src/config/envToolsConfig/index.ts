import asyncCheckNode from './utils/asyncCheckNode';
import asyncCheckLarkCli from './utils/asyncCheckLarkCli';
import asyncCheckCursorCli from './utils/asyncCheckCursorCli';
import asyncCheckClaudeCli from './utils/asyncCheckClaudeCli';
import asyncCheckCodexCli from './utils/asyncCheckCodexCli';

const envToolsConfig: Flows.EnvCheckMap = {
    node: {
        enabled: false,
        version: undefined,
        errorMsg: '',
        installDocPath: 'https://nodejs.org/en/download/',
        asyncEnvCheckConfig: asyncCheckNode,
        group: 'BasicEnv',
    },
    '@larksuite/cli': {
        enabled: false,
        version: undefined,
        errorMsg: '',
        installDocPath: 'https://open.feishu.cn/document/mcp_open_tools/feishu-cli-let-ai-actually-do-your-work-in-feishu',
        asyncEnvCheckConfig: asyncCheckLarkCli,
        group: "RecommendedEnv",
    },
    'cursor-cli': {
        enabled: false,
        version: undefined,
        errorMsg: '',
        installDocPath: 'https://cursor.com/cn/cli',
        asyncEnvCheckConfig: asyncCheckCursorCli,
        group: "ToolEnv",
    },
    'claude-cli': {
        enabled: false,
        version: undefined,
        errorMsg: '',
        installDocPath: 'https://www.anthropic.com/claude/docs/cli/installation',
        asyncEnvCheckConfig: asyncCheckClaudeCli,
        group: "ToolEnv",
    },
    'codex-cli': {
        enabled: false,
        version: undefined,
        errorMsg: '',
        installDocPath: 'https://chatgpt.com/codex/cloud',
        asyncEnvCheckConfig: asyncCheckCodexCli,
        group: "ToolEnv",
    },
}

export default envToolsConfig;

