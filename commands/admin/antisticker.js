module.exports = {
    name: "antisticker",
    category: "group",
    desc: "Active ou désactive la protection contre le spam de stickers.",
    async execute(m, { client, isAdmin, isBotAdmin, args }) {
        if (!m.isGroup) return m.reply("Cette commande ne fonctionne que dans un groupe !");
        if (!isAdmin) return m.reply("Seuls les administrateurs peuvent configurer l'Anti-Sticker.");
        if (!isBotAdmin) return m.reply("Le bot doit être administrateur du groupe pour supprimer les messages.");

        if (!args[0]) return m.reply("Veuillez préciser *on* ou *off* (Ex: .antisticker on)");

        if (args[0].toLowerCase() === "on") {
            // Ici, la logique s'active (souvent stockée en base de données ou gérée dans handler.js)
            await client.sendMessage(m.from, { text: "🛡️ *L'Anti-Sticker est désormais activé !* Tout sticker envoyé par un non-admin sera supprimé." });
        } else if (args[0].toLowerCase() === "off") {
            await client.sendMessage(m.from, { text: "🔓 *L'Anti-Sticker est désactivé.* Les membres peuvent à nouveau envoyer des stickers." });
        } else {
            m.reply("Option invalide. Utilisez *on* ou *off*.");
        }
    }
};
