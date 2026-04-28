# new-chat-code-bridge

一个基于 TypeScript + Node.js 的命令行项目脚手架/桥接示例。
当前代码重点是：

- 统一的路径配置
- 同步文件读写工具
- 跨平台子进程命令启动
- 串行异步任务执行与终端状态展示

## 运行方式

```bash
pnpm dev
```

该命令会执行 `src/main.ts`，示例流程包括：

1. 先启动子进程执行 `node -v`
2. 再按顺序执行一个任务队列
3. 终端中显示树形结构、转圈动画、成功/失败状态

## src 目录结构与功能

```text
src
├─ config
│  └─ filePathConfig.ts
├─ enum
│  └─ terminalColor.ts
├─ types
│  ├─ sequential-task.d.ts
│  ├─ spawn-command.d.ts
│  └─ sync-file.d.ts
├─ utils
│  ├─ runSequentialAsyncTasks.ts
│  ├─ syncFile.ts
│  └─ spawnCommand
│     ├─ config.ts
│     └─ index.ts
└─ main.ts
```

### `src/main.ts`

项目入口文件，负责串起演示流程：

- 调用 `startSpawnCommand` 启动 `node -v` 子进程并等待结束
- 调用 `runSequentialAsyncTasks` 执行任务列表
- 在任务失败时输出错误信息并抛出

### `src/config`

路径配置模块。

#### `filePathConfig.ts`

- `homePath`：当前用户主目录（`os.homedir()`）
- `USER_LOCAL_PROJECT_CONFIG_JSON_PATH`：用户本地配置文件绝对路径（`~/.chat-code-bridge/project-config.json`）

### `src/enum`

枚举定义模块。

#### `terminalColor.ts`

定义终端 ANSI 颜色码，供输出高亮使用：

- 白色、灰色、绿色、红色
- 重置颜色

### `src/types`

全局类型声明（`.d.ts`），按业务模块拆分并以 namespace 组织。

#### `sync-file.d.ts`

- `SyncFile.FileWriteMode`：文件写入模式
  - `'append'`：追加
  - `'overwrite'`：覆盖

#### `spawn-command.d.ts`

- `SpawnCommand.SupportedCommandPlatform`：支持的平台类型
- `SpawnCommand.CommandPlatformMapping`：命令在不同平台上的映射结构

#### `sequential-task.d.ts`

- `SequentialTask.SequentialTaskItem`：串行任务项结构
  - `prefix`：任务执行中文案前缀
  - `suffix`：任务完成/失败中文案后缀
  - `asyncFn`：任务异步函数

### `src/utils`

通用工具模块。

#### `syncFile.ts`

同步文件读写工具（UTF-8）：

- `writeFileContentSync(filePath, content, mode)`
  - 自动创建父目录（`mkdirSync(..., { recursive: true })`）
  - 通过 `mode` 控制追加/覆盖
- `readFileContentSync(filePath)`
  - 读取并返回文本内容

#### `runSequentialAsyncTasks.ts`

串行任务执行器：

- 严格按顺序 `await` 每个任务
- 显示终端转圈动画与树形结构
- 成功显示绿色状态，失败显示红色状态
- 失败时立即中止并退出进程

#### `spawnCommand`

子进程启动相关工具。

- `config.ts`：命令名映射与平台解析
  - 如 `npm` / `pnpm` / `node` 在 Windows 下映射到 `.cmd`/`.exe`
- `index.ts`：封装 `spawn`
  - 自动按平台解析命令
  - Windows 下默认使用 `shell`
  - `stdio` 继承当前终端

## 设计约定

- 使用 `@/* -> src/*` 路径别名（见 `tsconfig.json`）
- 类型声明统一放在 `src/types/**/*.d.ts`
- 注释风格统一使用块状注释（`/* ... */`）

## 后续可扩展方向

- 将 `main.ts` 的示例流程改为真实 CLI 命令入口
- 增加配置文件初始化与校验逻辑
- 在 `utils` 中补充异常处理与日志分级能力
