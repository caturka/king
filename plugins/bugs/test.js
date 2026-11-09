//ambil fitur? ambil aja tapi kasi credits jir lumnztyz gitu
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
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function isiPesan(conn, target, jumlah) {
  for (let i = 1; i <= jumlah; i++) {
    await conn.sendMessage(target, {
      text: `✅ *Pesan Test ${i}/${jumlah}*\n\nPesan pengujian dari bot.`,
    });
    if (i < jumlah) await delay(1000);
  }
}

let handler = async (m, { conn, text, usedPrefix, command, PremOnly }) => {
  if (!PremOnly) {
    return m.reply(
      `⚠️ *Akses Ditolak / Access Denied*\nAnda tidak memiliki izin untuk menjalankan perintah ini.`
    );
  }
  if (!text) {
    return m.reply(
      `❗ *Format Tidak Valid*\nGunakan: *${usedPrefix + command} <nomor> <jumlah>*\nContoh: *${usedPrefix + command} 628123456789 5*`
    );
  }
  const [rawNumber, rawJumlah] = text.trim().split(/\s+/);
  const number = rawNumber ? rawNumber.replace(/[^0-9]/g, "") : "";
  const jumlah = parseInt(rawJumlah, 10);
  if (!number || isNaN(jumlah) || jumlah < 1) {
    return m.reply(
      `❗ *Input Tidak Valid*\nPastikan nomor dan jumlah pesan berupa angka valid.\nContoh: *${usedPrefix + command} 628123456789 5*`
    );
  }
  if (jumlah > 5) {
    return m.reply("❌ Maksimal 5 pesan untuk pengujian.");
  }
  const target = `${number}@s.whatsapp.net`;
  try {
    await isiPesan(conn, target, jumlah);
    await m.reply(
      `✅ *Berhasil*\nTarget: ${number}\nJumlah: ${jumlah} pesan`
    );
  } catch (err) {
    console.error("Error pada test:", err);
    await m.reply(
      `❌ *Gagal mengirim pesan*\n${err?.message || "Terjadi kesalahan tidak dikenal."}`
    );
  }
};

handler.help = ['test <nomor> <jumlah>'];
handler.tags = ['bugs'];
handler.command = /^(test)$/i;
handler.premium = true;

export default handler;
