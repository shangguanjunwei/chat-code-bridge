# Git 提交规范

本项目使用基于 **Conventional Commits** 的提交规范，目标是：
- 提升提交历史可读性
- 便于自动生成变更日志
- 让代码评审更高效

## 0. 推荐提交流程（已配置）

本项目已配置：
- `commitizen`：交互式生成提交信息
- `commitlint + husky`：提交时自动校验格式

推荐使用以下命令提交：

```bash
pnpm commit
```

说明：
- 执行后按提示选择 `type`、填写 `scope` 和 `subject`
- 最终提交信息会被 `commit-msg` 钩子自动校验
- 若格式不符合规范，提交会被拦截

## 1. 提交信息格式

```text
<type>(<scope>): <subject>

<body>

<footer>
```

最常用的最小格式：

```text
<type>(<scope>): <subject>
```

说明：
- `type`：提交类型，必填
- `scope`：影响范围，选填（建议填写）
- `subject`：一句话描述本次变更，必填
- `body`：详细说明，选填
- `footer`：关联 Issue / Breaking Change，选填

## 2. type 类型约定

- `feat`：新增功能
- `fix`：修复缺陷
- `docs`：文档变更
- `style`：代码格式调整（不影响逻辑）
- `refactor`：重构（非新增功能、非修复缺陷）
- `perf`：性能优化
- `test`：测试相关
- `build`：构建系统或依赖变更
- `ci`：CI 配置变更
- `chore`：杂项维护（如脚本、工具配置）
- `revert`：回滚提交

## 3. scope 范围建议

可按目录、模块或功能填写，例如：
- `core`
- `api`
- `auth`
- `cli`
- `deps`
- `release`
- `docs`

示例：
- `feat(api): 增加会话续期接口`
- `fix(auth): 修复 token 过期判断错误`

## 4. subject 编写要求

- 使用简洁中文，建议不超过 50 个字符
- 使用祈使语气，描述“做了什么”
- 不以句号结尾
- 避免“更新代码”“修复问题”等模糊描述

推荐：
- `fix(core): 修复消息重复发送问题`

不推荐：
- `fix: 修改了一些问题`

## 5. body 与 footer（可选）

`body` 用于补充“为什么改”和“怎么改”：

```text
fix(core): 修复消息重复发送问题

在弱网重试场景下，消息会被重复入队。
本次通过幂等键去重，确保同一请求只处理一次。
```

`footer` 常见写法：

```text
Closes #123
```

如果存在破坏性变更，必须标注：

```text
BREAKING CHANGE: 移除旧版 /v1/chat 接口，请改用 /v2/chat
```

## 6. 常用提交示例

```text
feat(chat): 支持流式返回对话结果
fix(session): 修复会话超时未清理问题
refactor(router): 拆分路由注册逻辑
docs(readme): 补充本地开发启动说明
chore(deps): 升级 tsx 到最新版本
```

## 7. 提交前检查清单

- 提交粒度单一（一个提交只做一件事）
- 代码可运行，基础命令可通过
- 不提交无关文件（如临时文件、IDE 缓存）
- 提交信息符合本规范

## 8. 推荐模板

```text
<type>(<scope>): <subject>

<为什么改>
<改了什么>
<影响范围>

Closes #<issue-id>
```

