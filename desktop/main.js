const { app, BrowserWindow, shell } = require('electron');
const path = require('path');
const { spawn } = require('child_process');

let backend;
const root = path.join(__dirname, '..');

function startBackend() {
  const backendPath = path.join(root, 'backend');

  if (process.platform === 'win32') {
    backend = spawn(
      'cmd.exe',
      ['/d', '/s', '/c', `npm --prefix "${backendPath}" run dev`],
      {
        cwd: root,
        windowsHide: true,
        stdio: 'ignore'
      }
    );
  } else {
    backend = spawn(
      'npm',
      ['--prefix', backendPath, 'run', 'dev'],
      {
        cwd: root,
        stdio: 'ignore'
      }
    );
  }
}
async function waitForBackend() {
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch('http://127.0.0.1:5001/api/health');
      if (r.ok) return true;
    } catch {}
    await new Promise(r => setTimeout(r, 500));
  }
  return false;
}

async function createWindow() {
  startBackend();
  const ready = await waitForBackend();
  const win = new BrowserWindow({
    width: 1440,
    height: 900,
    minWidth: 1100,
    minHeight: 700,
    backgroundColor: '#070914',
    webPreferences: { contextIsolation: true, sandbox: true }
  });
  if (!ready) {
    await win.loadURL('data:text/html,<h2 style="font-family:sans-serif;padding:40px">DEVQUEST backend did not start. Please run Setup-DevQuest.ps1 and make sure Docker Desktop is running.</h2>');
    return;
  }
  await win.loadFile(path.join(root, 'frontend', 'dist', 'index.html'));
  win.webContents.setWindowOpenHandler(({url}) => { shell.openExternal(url); return { action: 'deny' }; });
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (backend) backend.kill(); if (process.platform !== 'darwin') app.quit(); });
app.on('before-quit', () => { if (backend) backend.kill(); });
