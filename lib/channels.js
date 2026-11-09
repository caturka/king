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
const { createStore } = require('./store')

const store = createStore('channels', { current: null }) // current: { id, name, role }

class ChannelError extends Error {}

// Tautan saluran: https://whatsapp.com/channel/<kode>[/<id pesan>]  |  ID: 1203630xxxxx@newsletter
function parseRef(input) {
  const s = String(input || '').trim()
  let m = s.match(/whatsapp\.com\/channel\/([A-Za-z0-9_-]+)(?:\/(\d+))?/i)
  if (m) return { type: 'invite', code: m[1], serverId: m[2] || null }
  m = s.match(/^(\d{8,25})@newsletter$/i)
  if (m) return { type: 'jid', jid: `${m[1]}@newsletter` }
  return null
}

// Pastikan Baileys yang dipakai punya fungsinya (kalau tidak, beri pesan jelas, bukan crash)
function need(sock, ...fns) {
  const missing = fns.filter((f) => typeof sock[f] !== 'function')
  if (missing.length) throw new ChannelError(`Versi Baileys di bot ini belum punya fitur saluran (${missing.join(', ')}). Ketik .cekbaileys untuk detail, lalu update paket baileys.`)
}

const textOf = (v) => (v && typeof v === 'object' ? v.text ?? '' : v ?? '')

function normalize(md) {
  const vm = md.viewer_metadata || {}
  return {
    id: md.id,
    name: String(textOf(md.name) || textOf(md.thread_metadata?.name) || '-'),
    desc: String(textOf(md.description) || textOf(md.thread_metadata?.description) || ''),
    invite: md.invite || md.thread_metadata?.invite || '',
    subs: Number(md.subscribers ?? md.thread_metadata?.subscribers_count ?? 0) || 0,
    verified: /verified/i.test(String(md.verification || md.thread_metadata?.verification || '')),
    created: Number(md.creation_time ?? md.thread_metadata?.creation_time ?? 0) || 0,
    role: String(vm.role || vm.view_role || '').toUpperCase(),
    state: String(md.state?.type ?? md.state ?? '')
  }
}

async function metadata(sock, ref) {
  need(sock, 'newsletterMetadata')
  const md = ref.type === 'jid' ? await sock.newsletterMetadata('jid', ref.jid) : await sock.newsletterMetadata('invite', ref.code)
  if (!md || !md.id) throw new ChannelError('Saluran tidak ditemukan. Periksa link atau ID-nya.')
  return normalize(md)
}

const isAdminRole = (role) => role === 'OWNER' || role === 'ADMIN'
const link = (invite) => (invite ? `https://whatsapp.com/channel/${invite}` : '')

const getCurrent = () => store.data.current
function setCurrent(c) {
  store.data.current = c
  store.save()
}

// rawText = teks setelah perintah. Kalau kata pertama adalah tautan/ID saluran, itu jadi tujuan; kalau tidak, pakai saluran bawaan (.setch)
async function pickTarget(sock, rawText) {
  const raw = String(rawText || '')
  const m = raw.match(/^\s*(\S+)\s*([\s\S]*)$/)
  if (m && parseRef(m[1])) {
    const ref = parseRef(m[1])
    const md = await metadata(sock, ref)
    return { id: md.id, name: md.name, role: md.role, rest: m[2].trim(), serverId: ref.serverId, md }
  }
  const cur = getCurrent()
  if (!cur) throw new ChannelError('Belum ada saluran tujuan. Atur dulu dengan: .setch <link saluran>\n(atau tulis link saluran di awal perintah ini)')
  return { id: cur.id, name: cur.name, role: cur.role || '', rest: raw.trim(), serverId: null, md: null }
}

// Bot sudah pasti bukan admin? (peran tidak diketahui = coba saja)
function assertCanPost(t) {
  if (t.role && !isAdminRole(t.role)) throw new ChannelError(`Akun bot hanya "${t.role.toLowerCase()}" di saluran *${t.name}*, bukan admin/pemilik, jadi tidak bisa memposting.\nJadikan nomor bot admin saluran, lalu ulangi .setch.`)
}

function explain(err) {
  const m = String((err && (err.message || err)) || 'error tidak diketahui')
  if (err instanceof ChannelError) return m
  if (/not-authorized|forbidden|\b40[13]\b|unauthorized/i.test(m)) return 'Akun bot tidak punya izin di saluran ini (harus pemilik/admin saluran).'
  if (/\b404\b|not-found|item-not-found/i.test(m)) return 'Saluran atau pesan tidak ditemukan. Periksa link/ID-nya.'
  if (/time(d)? ?out/i.test(m)) return 'WhatsApp tidak merespons (timeout). Coba lagi sebentar lagi.'
  return m
}

module.exports = { ChannelError, parseRef, need, normalize, metadata, isAdminRole, link, getCurrent, setCurrent, pickTarget, assertCanPost, explain }
