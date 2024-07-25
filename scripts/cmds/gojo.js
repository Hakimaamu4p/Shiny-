const axios = require('axios');

module.exports = {
  config: {
    name: 'gojo',
    version: '1.0.1',
    author: 'ArYAN',
    role: 0,
    category: 'ai',
    longDescription: {
      en: 'Chat With Anime Character Gojo.',
    },
    guide: {
      en: '',
    },
  },
  onStart: async ({ api, event, args }) => {
    try {
      const prompt = args.join(' ');
      const uid = event.senderID;
      const response = await axios.get(`https://king-aryanapis.onrender.com/api/gojo?prompt=${encodeURIComponent(prompt)}&uid=${uid}`);

      if (response.status !== 200 || !response.data) throw new Error('Invalid or missing response from API');

      const answer = response.data.answer;
      api.sendMessage(answer, event.threadID, (err, info) => {
        if (err) return console.error(err);
        global.GoatBot.onReply.set(info.messageID, { commandName: module.exports.config.name, messageID: info.messageID, author: event.senderID });
      });
    } catch (error) {
      console.error(error);
      api.sendMessage("Api skill issue", event.threadID);
    }
  },

  onReply: async ({ api, event, Reply }) => {
    const { author } = Reply;

    try {
      const userReply = event.body.trim();
      const uid = event.senderID; 

      const response = await axios.get(`https://king-aryanapis.onrender.com/api/gojo?prompt=${encodeURIComponent(userReply)}&uid=${uid}`);

      if (response.status !== 200 || !response.data) throw new Error('Invalid or missing response from API');

      const followUpAnswer = response.data.answer;
      api.sendMessage(followUpAnswer, event.threadID, (err, info) => {
        if (err) return console.error(err);
        global.GoatBot.onReply.set(info.messageID, { commandName: module.exports.config.name, messageID: info.messageID, author: event.senderID });
      });
    } catch (error) {
      console.error(error);
      api.sendMessage("Api skill issue", event.threadID); 
    }
  }
};
