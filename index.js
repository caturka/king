/*
* lumnztyz ngasih credits ke yang bersangkutan dengan sc ini, baik base, apikey, scrape, dan lain sebagainya.
* github resmi sc ini : https://github.com/SiX-CoRe/SxcWaMdV3
* developer : t.me/LumnzTyz
* saluran info update : https://whatsapp.com/channel/0029Vb7XYjLKgsNyWrRHL10k
* creator : DrstNitro
* wa : wa.me/6283181895347
* saluran : https://whatsapp.com/channel/0029VbDvIntK0IBjZp1bMy19
* telegram : https://t.me/droluxe
‼️JANGAN HAPUS CREDITS INI YA, RENAME RENAME SAJA JANGAN COBA COBA HAPUS TEKS INI ‼️
***DONASI BIAR SEMANGAT BERKARYA***
https://sociabuzz.com/lumnztyz
*/
process.env.NODE_NO_WARNINGS = '1';
process.removeAllListeners('warning');
process.emitWarning = () => {};

import './config.js';
import { fileURLToPath } from 'url';
import { join, dirname } from 'path';
import { createRequire } from 'module';
import { setupMaster, fork } from 'cluster';
import { watchFile, unwatchFile } from 'fs';
import pino from "pino"
import {
  smsg,
  isUrl,
  generateMessageTag,
  getBuffer,
  getSizeMedia,
  fetchJson,
  sleep,
  tanggal,
  day,
  bulan,
  tahun,
  weton,
  loadModule,
  protex
} from './lib/myfunc.js'

const logger = pino({
    level: "debug",
    transport: {
        target: "pino-pretty",
        options: {
            colorize: true,
            translateTime: "HH:MM",
            ignore: "pid,hostname",
        },
    },
});

const __dirname = dirname(fileURLToPath(import.meta.url));
const require = createRequire(__dirname);
const { name, author, version } = require(join(__dirname, './package.json'));

const [major] = process.versions.node.split('.').map(Number);

if (major < 20) {
  logger.error("Node wajib 20!")
  process.exit(1);
};

logger.info(`🚀 Starting ${name} (v${version})...`)

var isRunning = false;

/**
 * Start a js file
 * @param {String} file `path/to/file`
 */
function start(file) {
  if (isRunning) return;
  isRunning = true;

  let args = [join(__dirname, file), ...process.argv.slice(2)];

  setupMaster({ exec: args[0], args: args.slice(1) });
  let p = fork();

  p.on('exit', (_, code) => {
    isRunning = false;
    logger.warn(`Worker process exited (code: ${code}). Auto-restarting in 2 seconds...`);
    setTimeout(() => {
      start(file);
    }, 2000);
  });
}

start('main.js');