/*
 * 在终端中以树形与转圈动画串行执行多个异步任务，失败即中止并退出进程。
 */
import { TerminalColor } from '@/enum/terminalColor';

/* 写入 stdout；无 process 时退化为 console.log。 */
const write = (text: string): void => {
  const stdout = typeof process === 'undefined' ? undefined : process.stdout;

  if (stdout) {
    stdout.write(text);
    return;
  }
  console.log(text.replace(/\r/g, ''));
};

/* 控制台转圈动画帧，表示任务执行中。 */
const spinnerFrames = ['|', '/', '-', '\\'];

/* 将未知异常统一为可读字符串，避免输出 [object Object]。 */
const getErrorMessage = (error: unknown): string => {
  if (error == null) return '未知错误';
  if (error instanceof Error) return error.message || '未知错误';
  return String(error);
};

/*
 * 按数组顺序依次 await 每个任务的 asyncFn，并刷新终端展示。
 */
export async function runSequentialAsyncTasks(
  tasks: SequentialTask.SequentialTaskItem[]
): Promise<void> {
  /* 开始执行前先输出总任务数。 */
  write(`${TerminalColor.White}共 ${tasks.length} 个任务待执行${TerminalColor.Reset}\n\n`);

  for (let index = 0; index < tasks.length; index += 1) {
    const task = tasks[index];
    const taskNo = index + 1;
    const isLastTask = taskNo === tasks.length;
    const treePrefix = isLastTask ? '└─' : '├─';
    const taskLabel = `[${taskNo}/${tasks.length}]`;
    let frameIndex = 0;

    /* 用回车符刷新同一行，实现单行转圈动画。 */
    const renderRunning = (): void => {
      const frame = spinnerFrames[frameIndex % spinnerFrames.length];
      frameIndex += 1;
      write(
        `\r${TerminalColor.Gray}${treePrefix}${TerminalColor.Reset} ${TerminalColor.Gray}${frame} ${taskLabel} ${task.prefix}${TerminalColor.Reset}`
      );
    };

    renderRunning();
    const spinnerTimer = setInterval(renderRunning, 80);

    try {
      /* 串行：须等当前任务结束再进入下一项。 */
      await task.asyncFn();
      clearInterval(spinnerTimer);
      write(
        `\r${TerminalColor.Gray}${treePrefix}${TerminalColor.Reset} ${TerminalColor.Green}●${TerminalColor.Reset} ${TerminalColor.White}${taskLabel} ${task.suffix}${TerminalColor.Reset}\n`
      );
    } catch (error) {
      clearInterval(spinnerTimer);
      write(
        `\r${TerminalColor.Gray}${treePrefix}${TerminalColor.Reset} ${TerminalColor.Red}● ${taskLabel} ${task.suffix}${TerminalColor.Reset}\n`
      );
      write(
        `${TerminalColor.Red}第 ${taskNo}/${tasks.length} 个任务执行失败：${TerminalColor.White}${getErrorMessage(error)}${TerminalColor.Reset}\n`
      );
      /* 失败后立即退出，避免继续执行后续任务造成误导。 */
      if (typeof process !== 'undefined') {
        process.exit?.(1);
      }
      return;
    }

    if (!isLastTask) {
      write(`${TerminalColor.Gray}│${TerminalColor.Reset}\n`);
    }
  }

  write(`\n${TerminalColor.Green}安装完成${TerminalColor.Reset}\n\n`);
  if (typeof process !== 'undefined') {
    process.exit?.(0);
  }
}
