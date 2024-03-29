const { MessageEmbed, Client, Message } = require("discord.js");
const db = require("quick.db");
const Settings = require("../Settings/Settings.json");
const moment = require("moment");
module.exports.run = async (client, message, args) => {
  let yetkili = Settings.Roles.Registerer
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(yetkili)) return message.channel.send(new MessageEmbed().setAuthor("Hata!").setDescription(`**\`»\`** Bu Komutu Kullanabilmek İçin \`Yönetici\` veya \`Kayıt Sorumlusu\` Yetkisine Sahip Olman Gerekiyor.`).setColor(Settings.Colors.Red)).then(x => x.delete({ timeout: 6500 }));

  let embed2 = new MessageEmbed().setFooter("Larex").setTimestamp()
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  if (!user) return message.channel.send(embed2.setDescription("Bir Üyeyi Etiketle."))
  let check = await db.has(`${message.author.id}.toplam`)
  if (check === false) return message.channel.send(embed2.setDescription("Bu Üyenin Herhangi Bir Kayıt Verisini Bulamadım."))

  let kadınsayı = await db.get(`${message.author.id}.kadın`)
  let erkeksayı = await db.get(`${message.author.id}.erkek`)
  let toplam = await db.get(`${message.author.id}.toplam`)

  const embed = new MessageEmbed()
   .setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }))
  .setDescription(`• Toplam Kaydettiği Kişi: ${toplam || "0"}
  • Toplam Kaydettiği Kadın: ${kadınsayı || "0"}
  • Toplam Kaydettiği Erkek: ${erkeksayı || "0"}`)
  .setTimestamp()
  .setColor(Settings.Colors.Gold)
  .setFooter(`Larex`)
  message.channel.send(embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["stat", "stats"]
};

module.exports.help = {
  name: 'stat'
};