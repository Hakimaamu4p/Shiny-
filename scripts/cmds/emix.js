const axios = require('axios');
const fs = require('fs');

module.exports = {
  config: {
    name: "emix",
    version: "1.2",
    author: "ArYAN",
    countDown: 0,
    role: 0,
    shortDescription: {
      en: 'Generate anime-style images based on user prompts.'
    },
    longDescription: {
      en: "This command uses an external API to create anime-style images from user-provided prompts."
    },
    category: "media",
    guide: {
      en: "{p}animex <prompt>"
    }
  },

  onStart: async function({ message, args, api, event }) {
    try {
      const prompt = args.join(" ");
      if (!prompt) {
        return message.reply("Please provide some prompts\n\nExample:\nIn the heart of a magical forest, bathed in a warm golden glow that filters through the dense canopy above. Sunbeams dance and play across the clear, babbling stream that meanders through the lush undergrowth. The scene is a masterpiece of 4K HD animation, capturing the tranquility and beauty of a serene journey through nature's enchanting embrace.");
      }

      ("⏰", event.messageID, () => {}, true);

      const startTime = new Date().getTime();
    
      const baseURL = `https://king-aryanapis.onrender.com/api/emi`;
      const params = {
        prompt: prompt,
      };

      const response = await axios.get(baseURL, {
        params: params,
        responseType: 'stream'
      });

      const endTime = new Date().getTime();
      const timeTaken = (endTime - startTime) / 1000;

      ("✅", event.messageID, () => {}, true);

      const fileName = 'emix.png';
      const filePath = `/tmp/${fileName}`; 

      const writerStream = fs.createWriteStream(filePath);
      response.data.pipe(writerStream);

      writerStream.on('finish', function() {
        message.reply({
          body: `🎀 𝗘𝗺𝗶𝗫\n━━━━━━━━━━━━━━\n\nHere is your generated image based on 𝗘𝗺𝗶𝗫 style\n\n⚙️ Prompt: ${prompt}\n👑 Time Taken: ${timeTaken} seconds`,
          attachment: fs.createReadStream(filePath)
        });
      });

    } catch (error) {
      console.error('Error generating image:', error);
      message.reply("❌ Failed to generate your 𝗘𝗺𝗶𝗫 image.");
    }
  }
};
