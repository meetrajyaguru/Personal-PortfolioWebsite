import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const backend = path.join(root, 'backend');
const children = [
  spawn(
    process.execPath,
    [path.join(backend, 'node_modules', 'nodemon', 'bin', 'nodemon.js'), 'server.js'],
    { cwd: backend, stdio: 'inherit' },
  ),
  spawn(process.execPath, [path.join(root, 'node_modules', 'vite', 'bin', 'vite.js')], {
    cwd: root,
    stdio: 'inherit',
  }),
];

let stopping = false;

const stopChildren = (signal, exitCode = 0) => {
  if (stopping) return;
  stopping = true;
  process.exitCode = exitCode;
  children.forEach((child) => {
    if (child.exitCode === null && !child.killed) child.kill(signal);
  });
};

children.forEach((child) => {
  child.on('error', (error) => {
    console.error('Failed to start a development service:', error.message);
    stopChildren('SIGTERM', 1);
  });
  child.on('exit', (code) => {
    if (!stopping) stopChildren('SIGTERM', code ?? 1);
  });
});

process.on('SIGINT', () => stopChildren('SIGINT'));
process.on('SIGTERM', () => stopChildren('SIGTERM'));
