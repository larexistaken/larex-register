const { MessageEmbed, Client, Message } = require("discord.js");
const Settings = require("../Settings/Settings.json")
module.exports.run = async (client, message, args) => {

  let yetkili = Settings.Roles.Registerer
  if (!message.member.hasPermission("ADMINISTRATOR") && !message.member.roles.cache.has(yetkili)) return message.channel.send(new MessageEmbed().setAuthor("Hata!").setDescription(`**\`»\`** Bu Komutu Kullanabilmek İçin \`Yönetici\` veya \`Kayıt Sorumlusu\` Yetkisine Sahip Olmalısın.`).setColor(Settings.Colors.Red)).then(x => x.delete({ timeout: 6500 }));

  let uyarıembed = new MessageEmbed().setFooter("Larex").setTimestamp()
  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let isim = args[1]
  let yaş = args[2]
  if (!user) return message.channel.send(uyarıembed.setDescription("Bir Kişi Etiketlemelisin."))
  if (!isim) return message.channel.send(uyarıembed.setDescription("Bir İsim Yazmalısın."))
  if (!yaş) return message.channel.send(uyarıembed.setDescription("Bir Yaş Yazmalısın."))


  user.setNickname(`${Settings.ServerSettings.Tag} ${isim} | ${yaş}`)

  const embed = new MessageEmbed()
  .setDescription(`Başarıyla ${user} Üyesinin İsmi \`${isim} | ${yaş}\` Olarak Değişti.`)
  .setColor(Settings.Colors.Gold)
  .setTimestamp()
.setFooter(`Larex`)
  message.channel.send(embed)
}

module.exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["isim", "i"]
};

module.exports.help = {
  name: 'isim'
};