const fs = require('fs');
const moment = require('moment-timezone');

module.exports = {
	config: {
		name: "info",
		version: "1.0",
		author: "cliff",
		countDown: 20,
		role: 0,
		shortDescription: { vi: "", en: "" },
		longDescription: { vi: "", en: "" },
		category: "owner",
		guide: { en: "" },
		envConfig: {}
	},
	onStart: async function ({ message }) {
		const botName = "Astral";
		const botPrefix = "-";
		const authorName = "Stanley Demokratiko";
		const ownAge = "18";
		const teamName = "Astral Team";
		const authorFB = "https://www.facebook.com/100043265301021";
		const authorInsta = "Undefined";
		const tikTok = "None";
		const urls = JSON.parse(fs.readFileSync('cliff.json'));
		const link = urls[Math.floor(Math.random() * urls.length)];
		const now = moment().tz('Asia/Jakarta');
		const date = now.format('MMMM Do YYYY');
		const time = now.format('h:mm:ss A');
		const uptime = process.uptime();
		const seconds = Math.floor(uptime % 60);
		const minutes = Math.floor((uptime / 60) % 60);
		const hours = Math.floor((uptime / (60 * 60)) % 24);
		const days = Math.floor(uptime / (60 * 60 * 24));
		const uptimeString = `${days} days ${hours} hours ${minutes} minutes ${seconds} seconds`;

		message.reply({
			body: `《  Bot & Owner Info 》
\Name: ${𝐇𝐄𝐀𝐕𝐄𝐍 𝐁𝐎𝐓}
\Bot Prefix: ${-}
\owner: ${𝙃𝙀𝘼𝙑𝙀𝙉 𝘾𝙊𝙉𝙏𝙍𝙊}
\Age : ${17}
\Facebook: ${https://www.facebook.com/profile.php?id=61557094816783}
\Instagram: ${nevermind}
\TikTok: ${unknown}
\Date: ${date}
\Time: ${time}
\Team: ${github team Heaven}
\Uptime: ${uptimeString}
\===============`,
			attachment: await global.utils.getStreamFromURL(link)
		});
	},
	onChat: async function ({ event, message, getLang }) {
		if (event.body && event.body.toLowerCase() === "info") {
			this.onStart({ message });
		}
	}
};
