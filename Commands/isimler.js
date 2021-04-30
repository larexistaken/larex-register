const { MessageEmbed, Message, Client } = require("discord.js");
const db = require("quick.db")
const Settings = require("../Settings/Settings.json")
const moment = require("moment")
module.exports.run = async (client, message, args) => {

  let cezarolu = Settings.Roles.Registerer
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(cezarolu)) {
    return message.channel.send(new MessageEmbed().setAuthor("Hata!").setDescription(`**\`»\`** Bu Komutu Kullanabilmek İçin \`Yönetici\` veya \`Kayıt Sorumlusu\` Yetkisine Sahip Olmalısın.`).setColor(Settings.Colors.Red)).then(x => x.delete({ timeout: 6500 }));
  }
 
  const embedx = new MessageEmbed().setColor(Settings.Colors.Red).setFooter("Larex").setTimestamp()
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
  if (!user) return message.channel.send(embedx.setDescription("Bir Üye Etiketlemelisin."))
  let check = await db.has(`isimler.${user.id}`)
  if (check === false) return message.channel.send(embedx.setDescription("Bu Üyenin İsim Verisine Ulaşamadım."))

  let fetch = await db.get(`isimler.${user.id}`)
  let isimler = fetch.length > 0 ? fetch.map((value, index) => `${index + 1}. \`${value.Name} | ${value.Age}\` (<@&${value.Rol}>)`).join(`\n\n`) : "Bu Üyenin Geçmiş İsimleri Bulunamadı.";

  const embed = new MessageEmbed()
  .setAuthor(user.user.username, user.user.avatarURL({ dynamic: true}))
  .setDescription(`${isimler}`)
  .setColor(Settings.Colors.Gold)
  .setFooter(`Larex`)
  .setTimestamp()
  message.channel.send(embed)


}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isimler", "eski-isimler"]
};

module.exports.help = {
  name: 'isimler'
};