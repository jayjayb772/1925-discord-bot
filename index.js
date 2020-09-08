const {MessageEmbed, Client} = require("discord.js");
require('dotenv').config();
const https = require('https');
const {cmdText} = require("./commands/src/cmdText");


//const Twit = require('twit');
const {poll} = require("./commands/src/cmdPoll");
const {welcome} = require("./commands/src/welcomeAcknowledge");

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


client.on('message', async (message) => {
    const prefix = "1925!";
    if(message.author.bot) return;

    if (!message.guild) return;


    if (message.content.startsWith(prefix) && !message.author.bot) {
        console.log(`${message.author.username} said ${message.content}`);
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

        case "text":
            await cmdText(message);
            break;

        case "residents":
            await residents(message, args, process.env.environment);
            break;

        case "bug":
            await reportBug(message, convertTimestamp(message.createdTimestamp));

        case "poll":
            await poll(message, args);

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


client.login(process.env.TOKEN).catch((error) => {
    console.log(error);
});

/*

const twitClient = new Twit({
    consumer_key:process.env.twitterConsumerKey,
    consumer_secret:process.env.twitterConsumerSecret,
    access_token: process.env.twitterAccessToken,
    access_token_secret: process.env.twitterAccessTokenSecret
});

const twitStream = twitClient.stream(`statuses/filter`, {follow:process.env.twitterIRLID});

twitStream.on('tweet', function(tweet){
    client.guilds.cache.first().channels.cache.filter(channel => channel.id === process.env.socialMdeiaChannel).fetch().then(channel =>{
        channel.send(new MessageEmbed().setTitle(tweet.user).setDescription(tweet.text));
    })
});



 */



