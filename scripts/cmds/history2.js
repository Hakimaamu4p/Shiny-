const axios = require("axios");

const Prefixes = ["history", "History", "HISTORY"];
const API_URL = "https://hassan-historical-api.onrender.com/historicalevents";

module.exports = {
  config: {
    name: "history2",
    version: "1.0.0",
    author: "Hassan",
    role: 0,
    category: "utility",
    shortDescription: {
      en: "Fetches historical events for a given date or keyword.",
    },
    longDescription: {
      en: "Fetches historical events based on a given date or keyword from the historical events.",
    },
    guide: {
      en: "{pn} [date or keyword]",
    },
  },
  onStart: async function ({ message, api, event, args }) {},
  onChat: async function ({ api, event, args, message }) {
    try {
      const prefix = Prefixes.find(
        (p) => event.body && event.body.toLowerCase().startsWith(p)
      );

      if (!prefix) {
        return;
      }

      const query = event.body.substring(prefix.length).trim();

      if (query === "") {
        await api.sendMessage(
          "Please provide a date (YYYY-MM-DD) or a keyword to search for historical events.",
          event.threadID
        );
        return;
      }

      ("⌛", event.messageID, () => {}, true);

      const response = await axios.get(`${API_URL}?text=${encodeURIComponent(query)}`);

      if (response.status !== 200 || !response.data || response.data.length === 0) {
        throw new Error("No information found for your search term.");
      }

      const events = response.data;

      let messageText = "Here are the historical events:\n";
      events.forEach(event => {
        messageText += `\n${event.year}-${event.month}-${event.day}: ${event.event}`;
      });

      await message.reply(messageText);

      ("✅", event.messageID, () => {}, true);
    } catch (error) {
      console.error("Error in onChat:", error);
      await api.sendMessage(
        `Failed to fetch historical events: ${error.message}`,
        event.threadID
      );
    }
  }
};
