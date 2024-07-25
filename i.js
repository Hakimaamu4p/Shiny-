const Groq = require('groq-sdk');
const fs = require('fs');

const apiKey = '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';

const groq = new Groq({ apiKey });

const memory = {};

module.exports = {
  config: {
    name: 'l',
    aliases: 'd',
    version: '1.1.2',
    author: 'Gemini',
    countDown: 0,
    role: 0,
    category: 'Ai',
    description: {
      en: 'llama3 70b - groq.',
    },
    guide: {
      en: '{pn} [question]',
    },
  },
  onStart: async function ({ api, message, event, args, commandName }) {
    var prompt = args.join(" ");

    if (prompt.toLowerCase() === "clear") {
      clearMemory(event.senderID);
      message.reply("Memory cleared!");
      return;
    }

    loadMemory(event.senderID, (memoryData) => {
      if (memoryData) {
        memory[event.senderID] = memoryData.messages;
      } else {
        memory[event.senderID] = [];
      }
    });

    var content = (event.type == "message_reply") ? event.messageReply.body : args.join(" ");
    targetMessageID = (event.type == "message_reply") ? event.messageReply.messageID : event.messageID;

    if (args.length == 0 && content == "") {
      message.reply("Please provide a prompt.");
      return;
    }

    if (content != "") {
      var updatedPrompt = `System prompt: Mostly answer in short like 1 or 2 sentences unless it requires a long answer such as essay, poem or story and so on. Analyze the prompt and answer as instructed and only the necessary part. No additional fillers.\n\nUser : ${content} \n\n`;

      ("⌛", event.messageID, () => { }, true);

      const startTime = Date.now();

      try {
        const chatCompletion = await groq.chat.completions.create({
          "messages": memory[event.senderID].concat([{
            "role": "user",
            "content": updatedPrompt
          }]),
          "model": "llama3-70b-8192",
          "temperature": 0.6,
          "max_tokens": 8192,
          "top_p": 0.8,
          "stream": false,
          "stop": null
        });

        const assistantResponse = chatCompletion.choices[0].message.content;

        const endTime = new Date().getTime();
        const completionTime = ((endTime - startTime) / 1000).toFixed(2);
        const totalWords = assistantResponse.split(/\s+/).filter(word => word !== '').length;

        let finalMessage = `${assistantResponse}\n\nCompletion time: ${completionTime} seconds\nTotal words: ${totalWords}`;

        api.sendMessage(finalMessage, event.threadID, (err, info) => {
          if (!err) {
            global.GoatBot.onReply.set(info.messageID, {
              commandName,
              messageID: info.messageID,
              author: event.senderID,
              replyToMessageID: targetMessageID
            });
          }
        }, targetMessageID);
        ("✅", event.messageID, () => { }, true);

        memory[event.senderID].push({
          "role": "user",
          "content": updatedPrompt
        }, {
          "role": "assistant",
          "content": assistantResponse
        });

        saveMemory(event.senderID, memory[event.senderID]);
      } catch (error) {
        ("❌", event.messageID, () => { }, true);
        return message.reply(`An error occurred: ${error}`, event.threadID, event.messageID);
      };
    }
  },
  onReply: async function ({ api, message, event, Reply, args }) {
    var prompt = args.join(" ");
    let { author, commandName } = Reply;

    if (event.senderID !== author) return;

    ("⌛", event.messageID, () => { }, true);

    const startTime = Date.now();

    var updatedPrompt = `System prompt: Mostly answer in short like 1 or 2 sentences unless it requires a long answer such as essay, poem or story and so on. Analyze the prompt and answer as instructed and only the necessary part. No additional fillers.\n\nUser : ${prompt}`;

    try {
      const chatCompletion = await groq.chat.completions.create({
        "messages": memory[event.senderID].concat([{
          "role": "user",
          "content": updatedPrompt
        }]),
        "model": "llama3-70b-8192",
        "temperature": 0.6,
        "max_tokens": 8192,
        "top_p": 0.8,
        "stream": false,
        "stop": null
      });

      const assistantResponse = chatCompletion.choices[0].message.content;

      const endTime = new Date().getTime();
      const completionTime = ((endTime - startTime) / 1000).toFixed(2);
      const totalWords = assistantResponse.split(/\s+/).filter(word => word !== '').length;

      let finalMessage = `${assistantResponse}\n\nCompletion time: ${completionTime} seconds\nTotal words: ${totalWords}`;

      message.reply(finalMessage, (err, info) => {
        if (!err) {
          global.GoatBot.onReply.set(info.messageID, {
            commandName,
            messageID: info.messageID,
            author: event.senderID,
          });
        }
      });

      api.setMessa
