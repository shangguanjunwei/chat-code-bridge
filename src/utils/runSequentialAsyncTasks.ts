import { TerminalColor } from '@/enum/terminalColor';

export async function runSequentialAsyncTasks(
  tasks: SequentialTaskItem[]
): Promise<void> {
  const spinnerFrames = ['|', '/', '-', '\\'];

  const stdout = typeof process === 'undefined' ? undefined : process.stdout;

  const write = (text: string): void => {
    if (stdout) {
      stdout.write(text);
      return;
    }
    console.log(text.replace(/\r/g, ''));
  };

  const getErrorMessage = (error: unknown): string => {
    if (error == null) {
      return '未知错误';
    }
    if (error instanceof Error) {
      return error.message || '未知错误';
    }
    return String(error);
  };

  write(`${TerminalColor.White}共 ${tasks.length} 个任务待执行${TerminalColor.Reset}\n\n`);

  for (let index = 0; index < tasks.length; index += 1) {
    const task = tasks[index];
    const taskNo = index + 1;
    const isLastTask = taskNo === tasks.length;
    const treePrefix = isLastTask ? '└─' : '├─';
    const taskLabel = `[${taskNo}/${tasks.length}]`;
    let frameIndex = 0;

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
