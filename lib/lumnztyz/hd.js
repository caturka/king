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
'use strict'
const imgops = require('../imgops')

async function hdr(buffer, scale = 2) {
  const r = await imgops.upscale(Buffer.from(buffer), Math.max(1, Math.min(4, Number(scale) || 2)))
  return r.buffer
}

async function reminiHDFallback(buffer) {
  return hdr(buffer, 2)
}

module.exports = { hdr, reminiHDFallback }
