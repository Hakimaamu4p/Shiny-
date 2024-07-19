const axios = require('axios');

module.exports = {
  config: {
    name: "emi",
    version: "10.5",
    author: "ArYAN",
    shortDescription: { en: 'Converts text to image' },
    longDescription: { en: "Generates images based on provided text using the AnimeGen API." },
    category: "media",
    countDown: 10,
    role: 0,
    guide: { en: '{pn} your prompt' }
  },

  onStart: async function ({ api, event, args, message }) {
    const startTime = new Date().getTime();
    const text = args.join(" ");

    if (!text) {
      return message.reply("Please provide some prompts.");
    }

    message.reply(`Please wait....⌛`, async (err, info) => {
      if (err) {
        console.error(err);
        return;
      }
      
      let ui = info.messageID;
      ("⏳", event.messageID, () => {}, true);

      try {
        const response = await axios.get(`https://global-sprak.onrender.com/api/emi/v2?prompt=${encodeURIComponent(text)}`);
        
        ("✅", event.messageID, () => {}, true);

        const images = response.data.images;
        if (!images || images.length === 0) {
          throw new Error("No images found in the response");
        }

        api.unsendMessage(ui);

        const endTime = new Date().getTime();
        const timeTaken = (endTime - startTime) / 1000;

        let imagesInfo = `
🖼 [𝗘𝗠𝗜]
━━━━━━━━━━━━

👑 𝗣𝗿𝗼𝗺𝗽𝘁𝘀: ${text}

🌟 𝗡𝘂𝗺𝗯𝗲𝗿 𝗼𝗳 𝗜𝗺𝗮𝗴𝗲𝘀: ${images.length}

⚙ 𝗜𝗺𝗮𝗴𝗲𝘀 𝗟𝗶𝗻𝗸𝘀:
${images.map((img, index) => `(${index + 1}) ${img}`).join("\n")}

⏰ 𝗧𝗶𝗺𝗲 𝗧𝗮𝗸𝗲𝗻: ${timeTaken.toFixed(2)} seconds
━━━━━━━━━━━━`;

        message.reply({
          body: imagesInfo,
          attachment: await Promise.all(images.map(img => global.utils.getStreamFromURL(extractURL(img)))) 
        }, async (err) => {
          if (err) {
            console.error(err);
          }
        });
      } catch (error) {
        console.error(error);
        api.sendMessage(`Error.`, event.threadID, event.messageID);
      }
    });
  },
};

function extractURL(imageString) {
  const parts = imageString.split(': ');
  return parts[1];
}
