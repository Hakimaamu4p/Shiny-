const axios = require('axios')
module.exports = {
  config: {
    name: "coral",
    version: "1.1",
    author: "lakiro",
    countDown: 2,
    role: 0,
    shortDescription: "",
    longDescription: "",
    category: "ai",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({args,api,message,event}){
    const inp = args.join(' ');
    const id = event.senderID;
    const link = `https://cohere-api-by-lanceq.onrender.com/api/chat?message=${encodeURIComponent(inp)}&&chat_id=${id}`
    if(!inp){
      message.reply('missing input');
    }else{
      try{
        const response = await axios.get(`${link}`);
        message.reply(response.data.text);
      } catch (error){
        console.log(error);
        message.reply('An error occured\n\n\n'+error.message)
      }
    }
  }
}
