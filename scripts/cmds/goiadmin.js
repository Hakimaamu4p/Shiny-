module.exports = {
config: {
  name: "goiadmin",
  aurthor:"?/zed",// Convert By Goatbot Zed
   role: 0,
  shortDescription: " ",
  longDescription: "",
  category: "love",
  guide: "{pn}"
},
  onStart: async function ({ api, event }) {
  if (event.senderID !== "61557094816783") {
    var aid = ["61557094816783"];
    for (const id of aid) {
    if ( Object.keys(event.mentions) == id) {
      var msg = ["Don't tag admin, get lost🤨", "Admin said fark you🙂", "Sorry, admin is offline 😪","Do you like my admin thats why your tagging her? 😏"," Another tag in my admin, i will punch you 🙂"];
      ("😍", event.messageID, (err) => {}, true);
      return api.sendMessage({body: msg[Math.floor(Math.random()*msg.length)]}, event.threadID, event.messageID);
    }
    }}
},
  };
