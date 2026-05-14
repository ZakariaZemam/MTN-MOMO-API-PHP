import { bundle } from '@remotion/bundler';
import { renderMedia, selectComposition } from '@remotion/renderer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BROWSER = '/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell';

const bundled = await bundle({
  entryPoint: path.join(__dirname, 'src/index.ts'),
  webpackOverride: (config) => config,
});

const composition = await selectComposition({
  serveUrl: bundled,
  id: 'FivePoints',
  browserExecutable: BROWSER,
});

console.log('Rendering FivePoints composition...');
await renderMedia({
  composition,
  serveUrl: bundled,
  codec: 'h264',
  outputLocation: path.join(__dirname, 'five-points.mp4'),
  browserExecutable: BROWSER,
  onProgress: ({ progress }) => {
    process.stdout.write(`\rProgress: ${Math.round(progress * 100)}%  `);
  },
});

console.log('\nDone! Output: five-points.mp4');
