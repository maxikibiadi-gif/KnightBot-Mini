module.exports = {
    name: "vv",
    category: "general",
    desc: "Renvoie les médias à vue unique (View Once).",
    async execute(m, { client }) {
        const quoted = m.quoted ? m.quoted : null;
        if (!quoted || (!quoted.viewOnceMessageV2 && !quoted.viewOnceMessageV2Extension)) {
            return m.reply("Veuillez mentionner (quoter) un message à vue unique !");
        }

        const viewOnceContent = quoted.viewOnceMessageV2?.message || quoted.viewOnceMessageV2Extension?.message;
        const mediaType = Object.keys(viewOnceContent)[0];
        const buffer = await client.downloadMediaMessage({ message: viewOnceContent });

        await client.sendMessage(m.from, { 
            [mediaType.replace('Message', '')]: buffer, 
            caption: "🔓 Média décrypté avec succès par KnightBot-Mini." 
        }, { quoted: m });
    }
};
