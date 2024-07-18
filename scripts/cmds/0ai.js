module.exports = {
	config: {
		name: "ai",
		aliases: ["blackbox"],
		version: "1.0",
		author: "Samir Œ",
		countDown: 5,
		role: 0,
		shortDescription: "ai",
		longDescription: "black box",
		category: "new ai",
		guide: {
			vi: "{pn} text ",
			en: "{pn} text"
		}
	},

	onStart: async function ({ api, event, args }) {
		const axios = require("axios");
		const { messageID, threadID, senderID, body } = event;
		const tid = threadID;
		const mid = messageID;
		const q = encodeURIComponent(args.join(" "));

		if (!q) {
			return api.sendMessage("[❗] - Missing input", tid, mid);
		}

		try {
			api.sendMessage("⏳ Searching for the answer, please wait...", tid, (err, info) => {
				if (!err) {
					("🔍", info.messageID, (reactionErr) => {
						if (reactionErr) {
							console.error("Error setting reaction:", reactionErr);
						}
					}, true);
				}
			});

			const url = "https://useblackbox.io/chat-request-v4";

			const data = {
				textInput: q,
				allMessages: [{ user: q }],
				stream: "",
				clickedContinue: false,
			};

			const response = await axios.post(url, data);

			const answer = response.data.response[0][0];

			api.sendMessage(answer, tid, mid);
		} catch (error) {
			api.sendMessage(error.message, tid, mid);
		}
	},
};
