const axios = require("axios");
const fs = require("fs-extra");
const { loadImage, createCanvas } = require("canvas");

module.exports = {
  config: {
    name: "heaven",
    author: "UPoL 🐸",
    countDown: 5,
    role: 0,
    category: "write"
  },
  wrapText: async (ctx, text, maxWidth) => {
    return new Promise((resolve) => {
      if (ctx.measureText(text).width < maxWidth) return resolve([text]);
      if (ctx.measureText("W").width > maxWidth) return resolve(null);
      const words = text.split(" ");
      const lines = [];
      let line = "";
      while (words.length > 0) {
        let split = false;
        while (ctx.measureText(words[0]).width >= maxWidth) {
          const temp = words[0];
          words[0] = temp.slice(0, -1);
          if (split) words[1] = temp.slice(-1) + words[1];
          else {
            split = true;
            words.splice(1, 0, temp.slice(-1));
          }
        }
        if (ctx.measureText(line + words[0]).width < maxWidth)
          line += words.shift() + " ";
        else {
          lines.push(line.trim());
          line = "";
        }
        if (words.length === 0) lines.push(line.trim());
      }
      return resolve(lines);
    });
  },

  onStart: async function ({ api, event, args }) {
    let { threadID, messageID } = event;
    let pathImg = __dirname + "/cache/upol.png";
    let text = args.join(" ");
    if (!text)
      return api.sendMessage(
        "Put a text for post",
        threadID,
        messageID
      );
    let getPorn = (
      await axios.get("https://i.ibb.co/xhCsWg6/image.png", {
        responseType: "arraybuffer",
      })
    ).data;
    fs.writeFileSync(pathImg, Buffer.from(getPorn, "utf-8"));
    let baseImage = await loadImage(pathImg);
    let canvas = createCanvas(baseImage.width, baseImage.height);
    let ctx = canvas.getContext("2d");
    ctx.drawImage(baseImage, 0, 0, canvas.width, canvas.height);
    ctx.font = "500 25px Arial";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "start";
    let fontSize = 250;
    while (ctx.measureText(text).width > 2600) {
      fontSize--;
      ctx.font = `400 ${fontSize}px Arial, sans-serif`;
    }
    const lines = await this.wrapText(ctx, text, 700);
    let y = 155;
    lines.forEach((line) => {
      ctx.fillText(line, 50, y);
      y += 30; 
    });
    ctx.beginPath();
    const imageBuffer = canvas.toBuffer();
    fs.writeFileSync(pathImg, imageBuffer);
    api.sendMessage(
      { attachment: fs.createReadStream(pathImg) },
      threadID,
      () => fs.unlinkSync(pathImg),
      messageID
    );
  },
};