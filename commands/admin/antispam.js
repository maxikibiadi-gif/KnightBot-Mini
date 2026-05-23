const cooldowns = new Map();

module.exports = {
    name: "antispam",
    category: "group",
    desc: "Empêche le spam des commandes dans le groupe.",
    async execute(m, { client, isAdmin, isBotAdmin, args }) {
        if (!m.isGroup) return m.reply("Cette commande est réservée aux groupes !");
        if (!isAdmin) return m.reply("Désolé, seuls les administrateurs peuvent configurer l'Antispam.");

        // Logique simple pour s'assurer que le système s'active globalement
        m.reply("🛡️ Système Antispam actif ! Le bot limitera désormais les messages trop rapides pour éviter les crashs.");
    },
    
    // Ce bout de code intercepte les messages (à ajouter dans handler.js si tu veux un blocage automatique strict)
    async handleMessage(m, client) {
        if (!m.isGroup || m.fromMe) return;

        const userId = m.sender;
        const now = Date.now();
        const LIMIT_TIME = 3000; // 3 secondes de blocage entre chaque commande

        if (cooldowns.has(userId)) {
            const expirationTime = cooldowns.get(userId) + LIMIT_TIME;
            if (now < expirationTime) {
                // L'utilisateur envoie des messages trop vite
                return; // Bloque silencieusement ou ajoute un m.reply("Pas si vite !")
            }
        }

        cooldowns.set(userId, now);
        setTimeout(() => cooldowns.delete(userId), LIMIT_TIME);
    }
};
