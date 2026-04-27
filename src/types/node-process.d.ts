declare global {
  interface ProcessStdout {
    write: (text: string) => void;
  }

  interface ProcessLike {
    stdout?: ProcessStdout;
    exit?: (code?: number) => never;
  }

  const process: ProcessLike | undefined;
}

export {};
