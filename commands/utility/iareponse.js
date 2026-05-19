// Variable globale pour stocker l'état du mode remplacement
let iaMode = {
    active: false,
    style: "Tu es MaxiBot, l'assistant IA de l'ingénieur Maxia Kibiadi. Réponds de manière intelligente, polie mais ferme, et en français."
};

module.exports = {
    name: 'iareponse',
    aliases: ['iamode', 'remplace', 'iaon'],
    category: 'utility',
    description: 'Active/Désactive l\'IA qui répond intelligemment à votre place en DM',
    usage: '.iareponse',

    async execute(sock, msg, args, extra) {
        const remoteJid = msg.key.remoteJid;

        // Basculer l'activation
        if (iaMode.active) {
            iaMode.active = false;
            return await sock.sendMessage(remoteJid, {
                text: `────━━━━━━━━━━━━────\n🔓 *MAXIBOT SYSTEM*\nL'IA de remplacement est **DÉSACTIVÉE**. Vous reprenez la main sur vos messages !`
            }, { quoted: msg });
        }

        iaMode.active = true;
        await sock.sendMessage(remoteJid, {
            text: `────━━━━━━━━━━━━────\n🤖 *MAXIBOT SYSTEM*\nL'IA de remplacement est **ACTIVÉE**. Je vais gérer vos discussions privées intelligemment. 🥷`
        }, { quoted: msg });

        // ÉCOUTEUR DE MESSAGES EN DIRECT
        sock.ev.on('messages.upsert', async (chatUpdate) => {
            try {
                // Si le mode IA est éteint, on ne fait rien
                if (!iaMode.active) return;

                const m = chatUpdate.messages[0];
                if (!m.message || m.key.fromMe) return;

                // On s'assure que cela ne s'active QUE dans les messages privés (DMs), pas dans les groupes
                const isGroup = m.key.remoteJid.endsWith('@g.us');
                if (isGroup) return;

                // Récupérer le texte envoyé par l'ami
                const userMessage = m.message.conversation || m.message.extendedTextMessage?.text;
                if (!userMessage) return;

                // Appel d'une API IA publique et gratuite (Brainshop ou similaire)
                // Ici on utilise un service TTS/Chat public stable
                const encodePrompt = encodeURIComponent(userMessage);
                const response = await fetch(`https://api.simsimi.net/v2/?text=${encodePrompt}&lc=fr`);
                const data = await response.json();
                
                let iaAnswer = data.success || "Désolé, je suis un peu occupé en ce moment, repasse plus tard !";

                // Envoi de la réponse générée par l'IA en citant le message de l'ami
                await sock.sendMessage(m.key.remoteJid, { 
                    text: `*🤖 [MaxiBot IA] :* ${iaAnswer}` 
                }, { quoted: m });

            } catch (err) {
                console.error("Erreur du module IA :", err);
            }
        });
    }
};
