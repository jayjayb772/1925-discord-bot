const https = require('https');
const {MessageEmbed, Client} = require("discord.js");

async function welcome(member){
    const guild = member.guild;
    const introChannel = guild.channels.cache.filter(channel => channel.id === process.env.introChannel).first();
    //introChannel.send(`What's up! Welcome to 1925., ${member.user.tag}!`);
    await member.user.send("Be sure to react to the question in #welcome").catch((err)=>{
        console.log("Error sending welcome message to user:");
        console.log(err);
    });
}

module.exports = {welcome};