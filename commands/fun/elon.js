module.exports = {
    name: 'elon',
    aliases: ['musk', 'askelon'],
    category: 'fun',
    description: 'Pose une question directement à Elon Musk',
    usage: 'elon [votre question]',

    async execute(sock, msg, args, extra) {
        const remoteJid = msg.key.remoteJid;
        const prefix = extra?.prefix || '.';
        const question = args.join(" ");

        // Si l'utilisateur tape juste la commande sans question
        if (!question) {
            return await sock.sendMessage(remoteJid, {
                text: `┌───────────────────\n│ 🚀 *M A X I B O T  X  E L O N*\n│ ➔ Tu blagues je t’allume.\n│\n│ Pose-moi une question chef !\n│ Exemple : _${prefix}elon Pourquoi le Cybertruck est blindé ?_\n└───────────────────`
            }, { quoted: msg });
        }

        // On affiche un petit message d'attente stylé pendant qu'Elon "réfléchit"
        await sock.sendMessage(remoteJid, { text: "⚡ *Elon Musk est en train de tweeter sa réponse...* 📝" }, { quoted: msg });

        try {
            // On crée un prompt secret pour forcer l'IA à jouer le rôle d'Elon Musk
            const elonPrompt = `Tu es Elon Musk, le milliardaire boss de Tesla, SpaceX et X. Réponds à cette question en français, avec assurance, un brin d'excentricité, parle de technologie, de Mars ou de business si ça s'y prête, mais reste court et percutant comme un tweet. Voici la question : `;
            
            const encodePrompt = encodeURIComponent(elonPrompt + question);
            
            // Appel de l'API IA publique et gratuite
            const response = await fetch(`https://api.simsimi.net/v2/?text=${encodePrompt}&lc=fr`);
            const data = await response.json();
            
            let elonAnswer = data.success || "I'm a bit busy sending rockets to Mars right now, ask me later! (Erreur de connexion)";

            // Formatage de la réponse finale en mode Dark/Boss
            let finalReply = `🚀 *💥 ELON MUSK SYSTEM* 💥\n\n`;
            finalReply += `➔ *Question :* _${question}_\n`;
            finalReply += `────━━━━━━━━━━━━────\n`;
            finalReply += `💬 *Elon :* « ${elonAnswer} »\n`;
            finalReply += `────━━━━━━━━━━━━────\n`;
            finalReply += `_🤖 Réponse générée par MaxiBot Sim-Musk_`;

            await sock.sendMessage(remoteJid, { text: finalReply }, { quoted: msg });

        } catch (error) {
            console.error("Erreur Elon IA :", error);
            await sock.sendMessage(remoteJid, { text: "❌ Désolé chef, les serveurs de SpaceX ont crashé. Réessaye !" }, { quoted: msg });
        }
    }
};
