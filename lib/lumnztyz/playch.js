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
const yt = require('../youtube')
const savetube = require('../savetube')
const ffm = require('../ffm')

// -> [{ title, link, channel, ... }]
async function searchYoutube(query) {
  const list = await yt.search(String(query), 5)
  return (list || []).map((v) => ({ ...v, link: v.url }))
}

// -> { title, download_url }
async function downloadYoutube(link) {
  const r = await savetube.audio(link)
  return { title: r.title, download_url: r.url }
}

// buffer audio apa saja -> OGG/Opus mono (voice note)
async function Toptt(buffer) {
  return ffm.run(Buffer.from(buffer), 'ogg', (i, o) => ['-i', i, '-vn', '-c:a', 'libopus', '-b:a', '48k', '-ac', '1', '-ar', '48000', '-f', 'ogg', o], 120000)
}

module.exports = { searchYoutube, downloadYoutube, Toptt }
