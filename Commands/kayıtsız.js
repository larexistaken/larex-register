const { MessageEmbed } = require('discord.js');
const Settings = require("../Settings/Settings.json")

exports.run = async (client, message, args) => {
  const unregister = message.guild.roles.cache.find(r => r.id === "Setting.Roles.Unregister")
if(![(Settings.Roles.Registerer)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setAuthor("Hata!").setDescription(`**\`»\`** Bu Komutu Kullanabilmek İçin \`Yönetici\` veya \`Kayıt Sorumlusu\` Yetkisine Sahip Olman Gerekiyor.`).setColor(Settings.Colors.Red)).then(x => x.delete({ timeout: 6500 }));

  let embedx = new MessageEmbed()
  let users = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  if(!users) return message.channel.send(embedx.setDescription(`Bir Üye Etiketlemelisin.`).setFooter("Larex").setTimestamp().setColor("RED"))

users.setNickname(users.user.username)
users.roles.add(Settings.Roles.Unregister);
users.roles.cache.forEach(r => {
users.roles.remove(r.id)
})
  let embed = new MessageEmbed()
  message.channel.send(embed.setDescription(`${users} Adlı Kullanıcı Başarıyla Kayıtsız'a Atıldı.`).setTimestamp().setColor("RED").setFooter("Larex"))
}
module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["kayıtsız"]
};

module.exports.help = {
  name: 'kayıtsız'
};