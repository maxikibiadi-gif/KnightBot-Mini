const axios = require('axios');

module.exports = {
    name: 'say',
    aliases: ['dit', 'iavoix', 'parle'],
    category: 'media',
    description: 'Fait parler une IA avec le texte de ton choix',
    usage: '.say [votre texte]',

    async execute(sock, msg, args, extra) {
        const text = args.join(" ");

        if (!text) {
            return await sock.sendMessage(msg.key.remoteJid, { 
                text: "┌───────────────────\n│ ⚠️ *M A X I B O T  I A*\n│ ➔ Tu blagues je t’allume.\n│ Écris le texte que l'IA doit dire chef !\n└───────────────────" 
            }, { quoted: msg });
        }

        await sock.sendMessage(msg.key.remoteJid, { text: "⏳ *MaxiBot fait parler l'IA...*" }, { quoted: msg });

        try {
            // Utilisation d'une API TTS publique et rapide pour générer un audio propre
            const encodedText = encodeURIComponent(text);
            const audioUrl = `https://translate.google.com/translate_tts?ie=UTF-8&tl=fr&client=tw-ob&q=${encodedText}`;

            // Envoi direct de l'audio sous forme de vrai message vocal WhatsApp (ptt: true)
            await sock.sendMessage(msg.key.remoteJid, {
                audio: { url: audioUrl },
                mimetype: 'audio/mp4',
                ptt: true // Donne l'impression que c'est un vrai vocal enregistré en direct
            }, { quoted: msg });

        } catch (error) {
            console.error(error);
            await sock.sendMessage(msg.key.remoteJid, { 
                text: "Impossible de générer la voix de l'IA pour le moment chef." 
            }, { quoted: msg });
        }
    }
};
