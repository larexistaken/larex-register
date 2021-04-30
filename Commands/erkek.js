const { dc, MessageEmbed } = require('discord.js')
const db = require('quick.db')
const Settings = require('../Settings/Settings.json')
const Other = require('../Settings/Other.json')
exports.run = async (client, message, args) => {
  
if(![(Settings.Roles.Registerer)].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(new MessageEmbed().setAuthor("Hata!").setDescription(`**\`»\`** Bu Komutu Kullanabilmek İçin \`Yönetici\` veya \`Kayıt Sorumlusu\` Yetkisine Sahip Olman Gerekiyor.`).setColor(Settings.Colors.Red)).then(x => x.delete({ timeout: 6500 })); 

const sıra = await db.fetch('case')
const emoji = message.guild.emojis.cache.find(r => r.name === (Other.EmojiGeneral.Emojiİsim)) 
const chat = message.guild.channels.cache.find(r => r.id === (Settings.Channels.GeneralChat))

  let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
  let isim = args[1]
  let yaş = args[2]
let uyarıembed = new MessageEmbed().setColor(Settings.Colors.Red).setFooter("Larex").setTimestamp()
if (!user) return message.channel.send(uyarıembed.setDescription("Bir Kişi Etiketlemelisin."))
if (!isim) return message.channel.send(uyarıembed.setDescription("Bir İsim Yazmalısın."))
if (!yaş) return message.channel.send(uyarıembed.setDescription("Bir Yaş Yazmalısın."))



if (user.user.tag.includes(Settings.ServerSettings.Tag)) {
    user.setNickname(`${Settings.ServerSettings.Tag} ${isim} | ${yaş}`)
  } else {
    user.setNickname(`${Settings.ServerSettings.UnTag} ${isim} | ${yaş}`)
  }

user.roles.add(Settings.Roles.BoyRole1)
user.roles.add(Settings.Roles.BoyRole2)
user.roles.remove(Settings.Roles.Unregister)

await db.push(`isimler.${user.id}`, {
    Registerer: message.author.id,
    Name: isim,
    Age: yaş,
    Rol: Settings.Roles.BoyRole1
  })

  db.add(`${message.author.id}.toplam`, +1)
  db.add(`${message.author.id}.erkek`, +1)
  db.add('case', 1)
  let toplam = await db.get(`${message.author.id}.toplam`)

  let x = await db.get(`isimler.${user.id}`)
  let isimler = x.length > 0 ? x.map((value, index) => `**${index + 1})** \`${value.Name} | ${value.Age}\` (${value.Rol})`).join(`\n`) : "Bu Kullanıcının Önceden Bulunan Bir İsmi Yok.";
  let embed = new MessageEmbed()
    .setAuthor(user.user.username, user.user.avatarURL({ dynamic: true }))
    .setColor(Settings.Colors.Green)
    .setDescription(`• ${user}, <@${message.author.id}> Tarafından Kaydedildi.
    • ${user} Kişisinin Adı \`${isim} | ${yaş}\` Olarak Değiştirildi.
    • <@&${Settings.Roles.BoyRole1}>, <@&${Settings.Roles.BoyRole2}> Başarıyla Verildi.
    • Kayıt Sırası: **#${sıra || "1"}**
`)
.setFooter(`${message.author.username} Yetkilisinin Toplam ${toplam} Kaydı Oldu.`)
.setTimestamp()
message.channel.send(embed)
message.react(emoji)

const dmlog = new MessageEmbed()
.setDescription(`• ${user}, \`${message.guild.name}\` Sunucusunda \`Erkek\` Olarak Kaydedildin.
• İsmin \`${isim} | ${yaş}\` Olarak Değiştirildi.`)
.setFooter(`Eğer Kaydında Bir Yanlışlık Varsa Yetkililere Bildir Lütfen.`)
.setColor(Settings.Colors.Blue)
user.send(dmlog)
  
  const chatembed = new MessageEmbed()
.setDescription(`${user} Aramıza Hoşgeldin Dostum, Keyifli Vakitler Geçirmeni Dileriz.`)
.setTimestamp()
.setFooter(`Larex`)
.setColor(Settings.Colors.Blue)
chat.send(chatembed)
}
exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["erkek", "e", "man", "boy"],
    permLevel: 0
};

exports.help = {
    name: "erkek"
}