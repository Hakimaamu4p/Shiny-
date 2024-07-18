module.exports = {
	config: {
		name: "goiadmin",
		version: "1.0",
		author: "Cliff",
		countDown: 5,
		role: 0,
		shortDescription: "sarcasm",
		longDescription: "sarcasm",
		category: "reply",
	},
	onStart: async function () {},
	onChat: async function ({ event, message, getLang, api }) {
		const msg = [
			"Stop mentioning my creator, he's busy 😗",
			"My Creator is currently offline 😢",
			"𝖠𝗇𝗈𝗍𝗁𝖾𝗋 𝗍𝖺𝗀 𝗂𝗇 𝗆𝗒 𝖺𝖽𝗆𝗂𝗇, 𝗂 𝗐𝗂𝗅𝗅 𝗉𝗎𝗇𝖼𝗁 𝗒𝗈𝗎 🙂",
			"busy pa ata yun kaya mag-antay ka",
			"Sorry, naka bebetime pa don't disturb him 🙄",
			"Do you like my creator thats why your tagging her? lol she's not single😏",
			"Another tag in my Creator, i will kick your fucking ass"
		];

		const CliffRegex = /^(61557094816783)$/i;
		if (event.body && CliffRegex.test(event.body)) {
			("😍", event.messageID, (err) => {}, true);
			return api.sendMessage({ body: msg[Math.floor(Math.random() * msg.length)] }, event.threadID, event.messageID);
		}
	},
};
