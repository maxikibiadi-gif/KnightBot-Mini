const { downloadContentFromMessage } = require('@whiskeysockets/baileys');
const { Sticker, StickerTypes } = require('wa-sticker-formatter');

module.exports = {
    name: 'sticker',
    aliases: ['s', 'stiker'],
    category: 'media',
    description: 'Transforme une image ou une vidéo en sticker WhatsApp',
    usage: '.sticker (en répondant à une image)',

    async execute(sock, msg, args, extra) {
        try {
            const quotedMsg = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
            const type = quotedMsg ? Object.keys(quotedMsg)[0] : Object.keys(msg.message)[0];
            
            let mediaMessage = quotedMsg ? quotedMsg[type] : msg.message[type];

            if (!type || (!type.includes('image') && !type.includes('video'))) {
                return await sock.sendMessage(msg.key.remoteJid, { 
                    text: "Chef, tu dois envoyer une image ou une vidéo avec la commande, ou répondre à un média existant en tapant *.sticker* !" 
                }, { quoted: msg });
            }

            const stream = await downloadContentFromMessage(mediaMessage, type.replace('Message', ''));
            let buffer = Buffer.from([]);
            for await (const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            const sticker = new Sticker(buffer, {
                pack: 'Mon Bot Magique',
                author: 'Chef Durolh',
                type: StickerTypes.FULL,
                categories: ['🤩', '🎉'],
                quality: 70
            });

            const stickerBuffer = await sticker.toBuffer();
            await sock.sendMessage(msg.key.remoteJid, { sticker: stickerBuffer }, { quoted: msg });

        } catch (error) {
            console.error(error);
            await sock.sendMessage(msg.key.remoteJid, { 
                text: "Impossible de créer le sticker, vérifie le fichier chef." 
            }, { quoted: msg });
        }
    }
};
