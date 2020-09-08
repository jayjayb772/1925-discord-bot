const https = require('https');
const { MessageEmbed , Client} = require("discord.js");


async function residents(message, args, environment){
        //console.log(args);
        let withRole;
        withRole = await message.guild.roles.fetch(process.env.RESIDENT_ID);
        const online = withRole.members.filter(m => m.presence.status === 'online').map(m=>m.displayName).join('\n');
        //console.log(online);
        const mems = new MessageEmbed().setTitle('All residents online');
        if(online.length === 0){
            mems.setDescription("No residents currently online.");
        }else {
            mems.setDescription(online);
        }
        //if(message.deletable) message.delete();
        await message.channel.send(mems).then( m => m.delete({timeout:15000}));
        message.delete().catch(err=>{
            console.log("no message to delete");
        });
}

module.exports = {residents};