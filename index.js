const {MessageEmbed, Client} = require("discord.js");
require('dotenv').config();
const https = require('https');
const {trainHandler} = require("./commands/src/cmdCta");
const {cmdOrchestratorCommand} = require("./commands/src/cmdOrchestratorCommand");


//const Twit = require('twit');
const {poll} = require("./commands/src/cmdPoll");
const {welcome} = require("./commands/src/welcomeAcknowledge");
const SockJS = require('sockjs-client');
const {sendToOrch} = require("./commands/src/sendToOrch");
//Commands
const {quote} = require('./commands/src/cmdQuote.js');
const {notFunctional, notCMD} = require("./commands/src/cmdErrors");
const {help} = require("./commands/src/cmdHelp");
const {say} = require("./commands/src/cmdSay");
const {residents} = require("./commands/src/cmdResidents");
const {reportBug} = require("./commands/src/cmdBug");
const {checkMessage} = require("./commands/src/automodFeatures");
//const {collectPic} = require("./commands/src/petPicCollector");

const client = new Client({
    disableEveryone: true
});
let curTime;



client.on("ready", async () => {
    console.log(`I am online, my name is ${client.user.username}`);
    if (process.env.debug === "on") {
        await client.user.setActivity(`bugs run rampant`, {type: "WATCHING"});
        //client.guilds.cache.first().channels.cache.filter(channel => channel.id === process.env.onlineChannel).first().send(`Newly updated!`).then(r => r.delete({timeout: 5000}));
    } else {
        await client.user.setActivity(`1925!help`, {type: "PLAYING"});
    }
});


client.on('guildMemberAdd', (member )=>{
   console.log(`New member: ${member.user.tag}`);
    welcome(member).then(r => {return});
});

client.on('warn', function(info){
    console.log(info);
})



let sock = new SockJS(`${process.env.sockJsURL}`);


let new_conn = function() {
    console.log('Opening new con')
    sock = new SockJS(`${process.env.sockJsURL}`);
    console.log("opening")
    sock.onopen = function() {
        console.log('open');
        curTime = Date.now();
    };
    console.log('on message')
    sock.onmessage = function(e) {
        console.log('message', e.data);
        curTime = Date.now();
    };

    sock.onclose = function() {
        console.log('close')
        new_conn();
    };
};


setInterval(()=>{
    try{
    console.log("Stay alive")
    sock.send("stay alive-discordBot");
    }catch (InvalidStateError){
        new_conn()
        console.log("Stay alive new con")
    }
}, 15000)


setInterval(()=>{
    console.log("reset Conn")
    sock.close()
    new_conn()
}, 60000*30)




client.on('message', async (message) => {
    const prefix = "1925!";
    if(message.author.bot) return;

    if (!message.guild) return;


    if (message.content.startsWith(prefix) && !message.author.bot) {
        console.log(`${message.author.username} said ${message.content}`);
    }

    console.log(message.embeds.length)
    if(message.channel.id === process.env.DisplayChannel){
        if(sock.readyState > 1){
            console.log("alive")
            new_conn()
        }
        let member = message.guild.members.cache.filter(member => member.id === message.author.id).first()
        let from = (member.nickname) ? member.nickname : message.author.username
        let ts = Date.now()
        let imageUrl = (message.embeds.length >0) ? message.embeds[0].url : null
        let data = {
            message:message.content.toString(),
            from: from,
            ts:ts,
            data:{
                imageUrl: imageUrl
            }
        }
        sock.send(JSON.stringify(data))
        console.log('sent message')
    }

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    let cmd = args.shift().toLowerCase();
    if (!message.content.startsWith(prefix)) {
        await checkMessage(message, convertTimestamp(message.createdTimestamp));
        /*
        if(message.channel.id === process.env.petPicsChannel){
            await collectPic(message);
        }
        */
        return;
    }


    switch (cmd) {
        case "say":
            await say(message, args, process.env.environment);
            break;

        case "quote":
            await quote(message);
            break;

        case "help":
            await help(message, args);
            break;

        case "display-board":
            cmdOrchestratorCommand(message, args).then(r=>{
                console.log(r);
                return r;
            }).catch(err=>{
                console.log(err)
                return err;
            });
            break;
        case "cta":
            trainHandler(message, args).then(r=>{
                console.log(r);
                return r;
            }).catch(err=>{
                console.log(err)
                return err;
            });
            break;

        case "residents":
            await residents(message, args, process.env.environment);
            break;

        case "bug":
            await reportBug(message, convertTimestamp(message.createdTimestamp));
            break;

        case "poll":
            await poll(message, args);
            break;

        case "NO_CMD":
            break;

        default:
            await notCMD(message);
    }

});

function convertTimestamp(timestamp, offset = -6) {
    let d = new Date(timestamp);
    let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
    let nd = new Date(utc + (3600000 * offset));
    return nd.toLocaleString();
}

console.log(`${process.env.TOKEN}`);

client.login(process.env.TOKEN).catch((error) => {
    console.log(error);
});



