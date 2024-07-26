 module.exports = {
  config: {
    name: 'imgbb',
    aliases: ['uploud', 'getlink'],
    version: '1.1',
    author: 'Riley',
    role: 0,
    longDescription: '',
    category: 'utility',
    guide: { en: '{pn} [URL]' },
  },

  onStart: async function ({ api, event, args, message, usersData }) {
    if (!event.isGroup) return;

    const attachments = event.messageReply.attachments;
    if (!attachments || attachments.length === 0) return message.reply("Harap balas ke gambar yang akan di upload ke imgbb.");
    if (attachments.length > 15) return message.reply("Maksimal 15 gambar yang dapat diunggah sekaligus.");

    const uploadPromises = attachments.map(async (attachment, index) => {
      const url = attachment.url;
      const name = `${args[0] || await usersData.getName(event.senderID) || 'foto'}_${index + 1}`;
      return await global.utils.uploadImgbb(url, name);
    });

    try {
      const results = await Promise.all(uploadPromises);
      const response = results.map(result => `📁 Link gambar: ${result.image.url}`).join('\n');
      return message.reply(response);
    } catch (error) {
      return message.reply("Terjadi kesalahan saat mengunggah gambar. Silakan coba lagi.");
    }
  },
};
