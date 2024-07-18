const axios = require("axios");



module.exports = {

  config: {

    name: "sdxl2",

    version: "1.0",

    author: "ArYAN",

    countDown: 5,

    role: 0,

    longDescription: {

      en: "Generate Your Imagination Using SDXL API."

    },

    category: "media",

    guide: {

      en: '{pn} your prompt | Type' +

        ' here are supported models:' +

        '\n 1: anime' +

        '\n 2: fantasy' +

        '\n 3: pencil' +

        '\n 4: digital' +

        '\n 5: vintage' +

        '\n 6: 3d (render)' +

        '\n 7: cyberpunk' +

        '\n 8: manga' +

        '\n 9: realistic' +

        '\n 10: demonic' +

        '\n 11: heavenly' +

        '\n 12: comic' +

        '\n 13: robotic'

        

    }

  },

  onStart: async function ({ message, api, args, event }) {

    try {

      const startTime = new Date().getTime();



      const text = args.join(' ');

      if (!text) {

        return message.reply(`

Please provide a prompt with model !

\n1. anime

2. fantasy

3. pencil

4. digital

5. vintage

6. 3d (render)

7. cyberpunk

8. manga

9. realistic

10. demonic

11. heavenly

12. comic

13. robotic

`);

      }

      

      const [prompt, model] = text.split('|').map((text) => text.trim());

      const selectedModel = model || "7";

      const encodedPrompt = encodeURIComponent(prompt);

      const baseURL = `https://globalapis.onrender.com/api/sdxl/v2?prompt=${encodedPrompt}&model=${selectedModel}`;



      api.setMessageReaction("⏳", event.messageID, () => {}, true);



      const response = await axios.get(baseURL, { responseType: 'stream' });

      const timeTaken = (new Date().getTime() - startTime) / 1000;



      message.reply("🔎", async (err, info) => {

        message.reply({ 

          body: `🖼 [ 𝗦𝗗𝗫𝗟 ]\n\n𝖳𝗂𝗆𝖾 𝖳𝖺𝗄𝖾𝗇: ${timeTaken} 𝗌𝖾𝖼𝗈𝗇𝖽𝗌.`,

          attachment: response.data

        });



        const ui = info.messageID; 

        message.unsend(ui);

        api.setMessageReaction("✅", event.messageID, () => {}, true);

      });

    } catch (error) {

      console.error("Error:", error);

      message.reply("An error occurred while processing your request. Please try again later.");

    }

  }

};
