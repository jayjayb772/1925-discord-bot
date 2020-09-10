const https = require('https');
const { MessageEmbed , Client} = require("discord.js");

//const hoursEmbed = new MessageEmbed().setTitle("IRL and IRL2 Hours of operation").addField("IRL Hours", "Monday-Friday 10AM-9PM\nSaturday 10AM-5PM\nSunday Closed", true).addField("IRL2 Hours", "Monday-Friday 10AM-9PM\nSaturday-Sunday 10AM-5PM", true);

const helpmsg = new MessageEmbed().setTitle("List of commands").setColor(2762596)
                                                                .addField("New Functionality", "I NOW DELETE MY REPLY MESSAGES AUTOMATICALLY AFTER 5-15 SECONDS.", false)
                                                                .addField("How to use commands", "In order to use commands you must start with the prefix \"irl!\" ", false)
                                                                .addField("say (embed) *str*", "repeats *str* with optional embed", false)
                                                                .addField("poll (prev_id)", "guides you through setting up a reaction poll. use the message id of a previous poll to get the results", false)
                                                                .addField("quote", "Gets quote from [Adafruit quote api](adafruit.com/quotes.php)",false)
                                                                .addField("residents", "Lists staff online, use role to specify specialties", false)
                                                                .addField("display-board (cmd) [args]", "communicate with the display board orchestrator", false)
                                                                .addField("trains (stop) [color]", "Used without a station and color will return trains at Montrose", false)
                                                                .addField("bug (report)", "Sends a message directly to person in charge of bot to easily get bug reports", false )
                                                                .addField("help", "Lists all functional commands", false)
                                                                .setURL("https://github.com/jayjayb772/discord-bot");


async function help(message, args){
    if(message.deletable) message.delete();
    await message.channel.send(helpmsg).then( m => m.delete({timeout:20000}));
}

module.exports ={help};