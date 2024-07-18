const axios = require('axios');

module.exports = {
    config: {
        name: "rhyme",
        aliases: ['rhymeword', 'findrhyme'],
        author: "Hassan",
        version: "1.0",
        shortDescription: "Find rhyming words",
        longDescription: "Retrieve words that rhyme with a given word.",
        category: "Education",
        guide: {
            vi: "",
            en: "Use this command followed by a word to find rhymes. Example: !rhyme apple"
        }
    },

    onStart: async function ({ message, args }) {
        if (!args.length) {
            return message.reply("❗ Please provide a word to find rhymes for. Example: !rhyme apple");
        }

        const word = args[0];
        const url = `https://hassan-rhyme-api.onrender.com/rhyme?word=${word}`;
        
        try {
            const response = await axios.get(url);
            const rhymes = response.data;

            if (rhymes.length === 0) {
                return message.reply(`🔎 No rhymes found for the word "${word}".`);
            }

            return message.reply(`📜 Rhyming words for "${word}":\n\n${rhymes.join(', ')}`);
        } catch (error) {
            console.error(error);
            return message.reply("There was an error fetching rhyming words. Please try again later.");
        }
    }
}
