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
const axios = require('axios')
const yt = require('../youtube')
const loader = require('../loaderto')

async function searchYouTube(query) {
  const r = await yt.search(String(query), 1)
  return r && r[0] ? r[0] : null
}

async function sizeOf(url) {
  try {
    const h = await axios.head(url, { timeout: 12000, maxRedirects: 5 })
    const n = Number(h.headers['content-length'])
    return Number.isFinite(n) && n > 0 ? n : 0
  } catch {
    return 0
  }
}

// format: 'mp3' | '360' | '480' | '720' | '1080'
async function download(url, format = 'mp3') {
  const r = await loader.get(url, format)
  return { downloadUrl: r.url, title: r.title, thumb: r.thumb, file: { contentLength: await sizeOf(r.url) } }
}

module.exports = { searchYouTube, download }
