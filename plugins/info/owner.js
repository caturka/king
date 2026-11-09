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
let handler = async (m, { conn }) => {
    const rawOwners = global.owner || [];
    let list = [];

    for (let o of rawOwners) {
        let num = (Array.isArray(o) ? o[0] : o).toString().replace(/[^0-9]/g, '');
        if (!num) continue;

        let displayName = (Array.isArray(o) && o[1]) ? o[1] : (global.ownername || 'Owner');
        let jid = num + '@s.whatsapp.net';

        try {
            const name = await conn.getName(jid);
            if (name) displayName = name;
        } catch {}

        list.push({
            displayName: displayName,
            vcard: `BEGIN:VCARD\n` +
                   `VERSION:3.0\n` +
                   `N:${displayName}\n` +
                   `FN:${displayName}\n` +
                   `item1.TEL;waid=${num}:+${num}\n` +
                   `item1.X-ABLabel:Ponsel\n` +
                   `END:VCARD`
        });
    }

    if (list.length === 0) {
        return m.reply("❌ Tidak ada kontak owner yang terdaftar.");
    }

    await conn.sendMessage(m.chat, {
        contacts: {
            displayName: `${list.length} Kontak Owner`,
            contacts: list
        }
    }, {
        quoted: m
    });
};

handler.help = ["owner", "creator"];
handler.command = /^(owner|creator|own)$/i;
handler.tags = ["info"];

export default handler;