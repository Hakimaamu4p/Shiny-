const axios = require("axios");
const gallery = ["Itsuki Nakano", "Nino Nakano", "Miku Nakano", "Youtsuba Nakano", "Ichika Nakano", "Futaro Uesugi", "Raiha Uesugi"];
module.exports = {
 config: {
 name: "gotoubun",
 version: "1.0",
 author: "Hady Zen",
 countDown: 16,
 role: 0,
 description: "Random Character Gotoubun No Hanayome",
 category: "MEDIA",
 guide: { id: "{pn}" }
 },

 onStart: async function ({ message }) {
 const itsuki = gallery[Math.floor(Math.random() * gallery.length)];
 const nino = await axios.get(`https://nash-rest-api.vercel.app/pinterest?search=${encodeURIComponent(itsuki)}`);
 const miku = nino.data.data.data;
 const ichika = miku[Math.floor(Math.random() * miku.length)];
 const youtsuba = await utils.getStreamFromURL(ichika);
 message.reply({ body: itsuki, attachment: youtsuba });
 },
};
