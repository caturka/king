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
import fs from "node:fs";
import { proto, generateWAMessageFromContent, prepareWAMessageMedia } from "@adiwajshing/baileys";


/* ============ HELPER ============ */
const SC = {
    a: 'ᴀ', b: 'ʙ', c: 'ᴄ', d: 'ᴅ', e: 'ᴇ', f: 'ғ', g: 'ɢ', h: 'ʜ', i: 'ɪ', j: 'ᴊ', k: 'ᴋ', l: 'ʟ', m: 'ᴍ',
    n: 'ɴ', o: 'ᴏ', p: 'ᴘ', q: 'ǫ', r: 'ʀ', s: 's', t: 'ᴛ', u: 'ᴜ', v: 'ᴠ', w: 'ᴡ', x: 'x', y: 'ʏ', z: 'ᴢ'
};
const sc = (t) => String(t).toLowerCase().split('').map(c => SC[c] || c).join('');

const LINE = '─────────────────';

const ICONS = {
    ai: '🤖', alkitab: '📖', am: '🧩', anime: '🎌', bugs: '🐞', buga: '🐞', donghua: '🐉', downloader: '📥',
    freefire: '🔥', game: '🎮', group: '👥', info: 'ℹ️', internet: '🌐', islami: '🕌', komik: '📚',
    maker: '🎨', manga: '📕', mlbb: '⚔️', movie: '🎬', music: '🎵', news: '📰', owner: '👑', panel: '🖥️',
    primbon: '🔮', random: '🎲', samp: '🚗', search: '🔍', stalker: '🕵️', sticker: '🏷️', store: '🛒', tools: '🛠️'
};
const icon = (tag) => ICONS[tag] || '📂';

function getUptime() {
    let s = Math.floor(process.uptime());
    const d = Math.floor(s / 86400); s %= 86400;
    const h = Math.floor(s / 3600); s %= 3600;
    const mnt = Math.floor(s / 60); s %= 60;
    return `${d ? d + 'd ' : ''}${h}h ${mnt}m ${s}s`;
}
function getTime() {
    return new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Jakarta', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).format(new Date()) + ' WIB';
}
function getDate() {
    return new Intl.DateTimeFormat('id-ID', { timeZone: 'Asia/Jakarta', weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' }).format(new Date());
}

/* ============ HEADER MENU ============ */
function buildHeader(userName, prefix, title) {
    return `╭${LINE}
│ʜɪ ${sc(userName)}, ᴡᴇʟᴄᴏᴍᴇ 👋
├${LINE}
│📌 𝐁𝐨𝐭 𝐈𝐧𝐟𝐨
│ ├ ɴᴀᴍᴀ  : King Bangcats
│ ├ ᴠᴇʀsɪ  : ${global.botversion || 'v1'}
│ ├ ʙᴀsᴇ   : sxᴄ ʙᴏᴛ
│ ╰ ᴘʀᴇғɪx : ${prefix}
├${LINE}
│🕒 𝙎𝙏𝘼𝙏𝙐𝙎
│├ ᴊᴀᴍ     : ${getTime()}
│├ ᴛᴀɴɢɢᴀʟ : ${getDate()}
│╰ ᴜᴘᴛɪᴍᴇ  : ${getUptime()}
├${LINE}
│⚙️ 𝘿𝙀𝙑 & 𝘾𝙍𝙀𝘼𝙏𝙊𝙍
│ ├ ᴅᴇᴠ : ${sc(global.devname || 'C.K.A')}
│ ╰ ᴄʀᴇᴀᴛᴏʀ : ${sc(global.creatorname || 'Bangcats')}
╰${LINE}
\`${title}\``;
}

/* ============ BLOK COMMAND PER KATEGORI ============ */
function buildBlock(tag, items, prefix) {
    const rows = items.map((it, i) => {
        const branch = i === items.length - 1 ? '╰' : '├';
        return `│ ${branch} ${prefix}${it.help}${it.badge}`;
    }).join('\n');
    return `╭${LINE}
│${icon(tag)} ${sc(tag)} (${items.length})
├${LINE}
${rows}
╰${LINE}`;
}

/* ============ AMBIL DATA PLUGIN ============ */
function collectCategories(isOwner) {
    const pluginsObj = (global.pg || (typeof pg !== 'undefined' ? pg : null))?.plugins || global.plugins || {};
    const map = {};
    for (const plugin of Object.values(pluginsObj)) {
        if (!plugin || plugin.disabled) continue;
        const tags = Array.isArray(plugin.tags) ? plugin.tags : (plugin.tags ? [plugin.tags] : []);
        const helps = Array.isArray(plugin.help) ? plugin.help : (plugin.help ? [plugin.help] : []);
        if (!helps.length) continue;
        const badge = plugin.premium ? ' ✨' : (plugin.limit ? ' ⚡' : '');
        for (const t of tags) {
            if (!t || typeof t !== 'string') continue;
            const tag = t.toLowerCase().trim();
            if (tag === 'main') continue;
            if (tag === 'owner' && !isOwner) continue;
            if (!map[tag]) map[tag] = [];
            for (const h of helps) map[tag].push({ help: h, badge });
        }
    }
    for (const tag of Object.keys(map)) {
        const seen = new Set();
        map[tag] = map[tag].filter(x => !seen.has(x.help) && seen.add(x.help));
        map[tag].sort((a, b) => a.help.localeCompare(b.help));
    }
    return map;
}

/* ============ PECAH TEKS PANJANG ============ */
function chunkBlocks(blocks, max = 3500) {
    const out = [];
    let cur = '';
    for (const b of blocks) {
        if (b.length > max) {
            const lines = b.split('\n');
            for (const ln of lines) {
                if ((cur + '\n' + ln).length > max) { if (cur) out.push(cur); cur = ln; }
                else cur = cur ? cur + '\n' + ln : ln;
            }
            continue;
        }
        if ((cur + '\n\n' + b).length > max) { if (cur) out.push(cur); cur = b; }
        else cur = cur ? cur + '\n\n' + b : b;
    }
    if (cur) out.push(cur);
    return out;
}

/* ============ PENGIRIM KARTU INTERAKTIF ============ */
// Pola yang sama dengan sendNativeButtons di moai.js: tanpa footer, field minimal,
// dan node biz/bot ikut dikirim supaya WhatsApp menampilkan list & tombol.
async function sendMenuInteractive(conn, jid, quoted, { body = '', image = null, buttons = [] }) {
    const content = { nativeFlowMessage: { buttons } };
    if (body) content.body = { text: body };
    if (image) {
        const media = await prepareWAMessageMedia({ image }, { upload: conn.waUploadToServer });
        content.header = { title: '', hasMediaAttachment: true, imageMessage: media.imageMessage };
    }
    const payload = proto.Message.InteractiveMessage.create(content);
    const wa = generateWAMessageFromContent(jid, { viewOnceMessage: { message: { interactiveMessage: payload } } }, {
        userJid: conn.user.id,
        quoted: quoted || null
    });
    const additionalNodes = [{
        tag: 'biz', attrs: {},
        content: [{ tag: 'interactive', attrs: { type: 'native_flow', v: '1' }, content: [{ tag: 'native_flow', attrs: { v: '9', name: 'mixed' } }] }]
    }];
    if (!jid.endsWith('@g.us')) additionalNodes.push({ tag: 'bot', attrs: { biz_bot: '1' } });
    await conn.relayMessage(jid, wa.message, { messageId: wa.key.id, additionalNodes });
    return wa;
}

/* ============ HANDLER ============ */
let handler = async (m, { conn, text, usedPrefix, isROwner, command }) => {
    try {
        // reaction 🗡️
        await conn.sendMessage(m.chat, { react: { text: '🗡️', key: m.key } }).catch(() => {});

        const prefix = usedPrefix || '.';
        const senderNum = String(m.sender || '').split('@')[0].split(':')[0];
        const ownerNums = (global.owner || []).map(o => String(Array.isArray(o) ? o[0] : o).replace(/[^0-9]/g, ''));
        const isOwner = !!(isROwner || m.fromMe || ownerNums.includes(senderNum));

        const userName = m.pushName || 'User';
        const cats = collectCategories(isOwner);
        const tags = Object.keys(cats).sort();

        let query = (text || '').trim().toLowerCase();
        if (/^allmenu$/i.test(command || '') && !query) query = 'all';

        /* ---------- tombol ---------- */
        const rows = [
            { title: '📜 ALLMENU', description: 'Semua fitur bot', id: `${prefix}menu all` },
            ...tags.map(t => ({
                title: `${icon(t)} ${t.toUpperCase()}`,
                description: `${cats[t].length} fitur`,
                id: `${prefix}menu ${t}`
            }))
        ];
        const buttons = [
            {
                name: 'single_select',
                buttonParamsJson: JSON.stringify({
                    title: 'ᴘɪʟɪʜ ᴍᴇɴᴜ',
                    sections: [{ title: 'ᴋᴀᴛᴇɢᴏʀɪ ᴍᴇɴᴜ', highlight_label: 'KageBot', rows }]
                })
            },
            {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                    display_text: '📢 Channel Dev',
                    url: global.linkch
                })
            },
            {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                    display_text: '📢 Channel Creator',
                    url: global.linkchcreator
                })
            },
            {
                name: 'cta_url',
                buttonParamsJson: JSON.stringify({
                    display_text: '✨ Donasi',
                    url: 'https://app.gopay.co.id/D7F3/w5799wnl'
                })
            }
        ];

        /* ---------- isi menu ---------- */
        let title = 'MENU IS BELOW';
        let blocks = [];

        if (query === 'all' || query === 'allmenu') {
            title = 'ALL MENU';
            blocks = tags.map(t => buildBlock(t, cats[t], prefix));
        } else if (query) {
            const wanted = query.split(/[,\s]+/).filter(Boolean).filter(t => cats[t]);
            if (!wanted.length) {
                title = 'KATEGORI TIDAK ADA';
            } else {
                title = `${wanted.join(', ').toUpperCase()} MENU`;
                blocks = wanted.map(t => buildBlock(t, cats[t], prefix));
            }
        }

        const header = buildHeader(userName, prefix, title);

        // satu kartu utuh untuk semua kategori (sama seperti moai.js), tanpa dipecah jadi chat terpisah
        const full = blocks.length ? `${header}\n\n${blocks.join('\n\n')}` : header;
        const body = full;
        const rest = [];

        let image = null;
        try {
            if (fs.existsSync('./media/thumbnail.jpg')) image = fs.readFileSync('./media/thumbnail.jpg');
        } catch {}

        try {
            await sendMenuInteractive(conn, m.chat, m, { body, image, buttons });
        } catch (e) {
            console.error('[menu] kartu interaktif gagal, fallback teks:', e?.message || e);
            await conn.sendMessage(m.chat, { text: full }, { quoted: m });
        }

        for (const part of rest) {
            await conn.sendMessage(m.chat, { text: part }, { quoted: m });
            await new Promise(r => setTimeout(r, 600));
        }
    } catch (err) {
        console.error(err);
        m.reply('Error: ' + (err.message || err));
    }
};

handler.help = ['menu', 'allmenu', 'help'];
handler.command = ['menu', 'allmenu', 'help', 'cmd', 'coremenu'];
handler.tags = ['main'];

export default handler;
