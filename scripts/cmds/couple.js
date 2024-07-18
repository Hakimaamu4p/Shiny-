const axios = require('axios');

module.exports = {
  config: {
    name: "couple",
    aliases: ["cdp"],
    version: "10.5",
    author: "ArYAN",
    shortDescription: { en: ' Fetch random coupledp images' },
    category: "image",
    countDown: 10,
    role: 0,
    guide: { en: '{pn} your prompt' }
  },

  onStart: async function ({ api, event, args, message }) {
    try {
        const response = await axios.get(`https://global-sprak.onrender.com/api/cdp`);
        
        if (response.data && response.data.result) {
            const { female, male } = response.data.result;
            const images = [female, male];

            api.setMessageReaction("✅", event.messageID, () => {}, true);

            let imagesInfo = `Here is your CoupleDP...🥰`;

            message.reply({
              body: imagesInfo,
              attachment: await Promise.all(images.map(img => global.utils.getStreamFromURL(img))) 
            }, async (err) => {
              if (err) {
                console.error(err);
              }
            });
        } else {
            throw new Error('Invalid response format');
        }
      } catch (error) {
        console.error(error);
        api.sendMessage(`There was an error fetching the images: ${error.message}`, event.threadID, event.messageID);
      }
  }
};
