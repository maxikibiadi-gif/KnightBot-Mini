module.exports = {
    name: 'fancy',
    aliases: ['style', 'police', 'texte'],
    category: 'general',
    description: 'Change le style d\'un texte en mode sombre',
    usage: '.fancy [votre texte]',

    async execute(sock, msg, args, extra) {
        const text = args.join(" ");

        if (!text) {
            return await sock.sendMessage(msg.key.remoteJid, { 
                text: "┌───────────────────\n│ ⚠️ *M A X I B O T*\n│ ➔ Tu blagues je t’allume.\n│ Ecris un texte après la commande chef !\n└───────────────────" 
            }, { quoted: msg });
        }

        // Conversion des polices
        const styles = {
            bulles: text.toLowerCase().replace(/[a-z]/g, char => {
                const ascii = char.charCodeAt(0);
                return String.fromCharCode(ascii + 9327);
            }),
            gothique: text.toLowerCase().replace(/[a-z]/g, char => {
                const gothicAlphabet = "𝔞𝔟𝔠𝔡𝔢𝔣𝔤𝔥𝔦𝔧𝔨𝔩𝔪𝔫𝔬𝔭𝔮𝔯𝔰𝔱𝔲𝔳𝔴𝔵𝔶𝔷";
                const index = char.charCodeAt(0) - 97;
                return gothicAlphabet[index] || char;
            })
        };

        // Design 100% Dark et Menaçant
        let responseText = `────━━━━━━━━━━━━────\n`;
        responseText += `🕷️  *M A X I B O T  D A R K* 🕷️\n`;
        responseText += `« _Tu blagues je t’allume_ »\n`;
        responseText += `────━━━━━━━━━━━━────\n\n`;
        
        responseText += `┌───┫ 🌑 BULLES ┣─\n`;
        responseText += `│ ➔ ${styles.bulles}\n`;
        responseText += `└───────────────────\n\n`;
        
        responseText += `┌───┫ 🖤 GOTHIQUE ┣─\n`;
        responseText += `│ ➔ ${styles.gothique}\n`;
        responseText += `└───────────────────\n\n`;
        
        responseText += `┌───┫ 💻 MONOSPACE ┣─\n`;
        responseText += `│ ➔ \`\`\`${text}\`\`\`\n`;
        responseText += `└───────────────────\n\n`;
        
        responseText += `──━┫ 🥷 M A X I B O T ┣━──`;

        await sock.sendMessage(msg.key.remoteJid, { text: responseText }, { quoted: msg });
    }
};
