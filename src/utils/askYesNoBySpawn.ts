import readlinePromises from 'node:readline/promises';
import { stdin, stdout } from 'node:process';

export async function askYesNoBySpawn(question: string): Promise<boolean> {
  const rl = readlinePromises.createInterface({ input: stdin, output: stdout });
  try {
    while (true) {
      const answer = await rl.question(`${question} (y/n, 默认 y): `);
      const value = answer.trim().toLowerCase();
      if (value === '' || value === 'y' || value === 'yes') {
        return true;
      }
      if (value === 'n' || value === 'no') {
        return false;
      }
      stdout.write('请输入 y 或 n（直接回车默认 y）\n');
    }
  } finally {
    rl.close();
  }
}

export default askYesNoBySpawn;
