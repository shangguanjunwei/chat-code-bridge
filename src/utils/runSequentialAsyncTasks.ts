import { TerminalColor } from '@/enum/terminalColor';

const write = (text: string): void => {
  const stdout = typeof process === 'undefined' ? undefined : process.stdout;

  if (stdout) {
    stdout.write(text);
    return;
  }
  console.log(text.replace(/\r/g, ''));
};

const getErrorMessage = (error: unknown): string => {
  if (error == null) return '未知错误';
  if (error instanceof Error) return error.message || '未知错误';
  return String(error);
};

export async function runSequentialAsyncTasks(
  tasks: SequentialTask.SequentialTaskItem[]
): Promise<void> {
  write(`${TerminalColor.White}开始执行...\n\n`);

  for (let index = 0; index < tasks.length; index += 1) {
    const task = tasks[index];
    const taskNo = index + 1;
    const isLastTask = taskNo === tasks.length;
    const treePrefix = isLastTask ? '└─' : '├─';
    write(
      `${TerminalColor.Gray}${treePrefix}${TerminalColor.Reset} ${TerminalColor.Gray}… [执行中] ${task.prefix}${TerminalColor.Reset}\n`
    );

    try {
      await task.asyncFn();
      write(
        `${TerminalColor.Gray}${treePrefix}${TerminalColor.Reset} ${TerminalColor.Green}●${TerminalColor.Reset} ${TerminalColor.White}[完成] ${task.suffix}${TerminalColor.Reset}\n`
      );
    } catch (error) {
      write(
        `${TerminalColor.Gray}${treePrefix}${TerminalColor.Reset} ${TerminalColor.Red}● [失败] ${task.suffix}${TerminalColor.Reset}\n`
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

  // write(`\n${TerminalColor.Green}安装完成${TerminalColor.Reset}\n\n`);
  // if (typeof process !== 'undefined') {
  //   process.exit?.(0);
  // }
}
