const request = require("request");
const {url} = require("../utils/url.js");
const {MessageEmbed, Client} = require("discord.js");

async function trainTimes(station, color, message) {
    return new Promise(function (resolve, reject) {
        try {
            station = station.charAt(0).toUpperCase() + station.slice(1)
            color = color.charAt(0).toUpperCase() + color.slice(1)
            let uri = `${url()}cta/train-times?name=${station}&color=${color}`
            makeRequest(uri, station, color, message, resolve, reject)
        } catch (err) {
            reject(message.channel.send("There was an error").then(m => m.delete({timeout: 10000})))
        }
    })
}


async function montrose(message) {
    return new Promise(function (resolve, reject) {
        let uri = `${url()}discord/train-times`
        makeRequest(uri, "Montrose", "Brown", message, resolve, reject)
    })
}

async function makeRequest(uri, station, color, message, resolve, reject) {
    request.get(uri, (err, res) => {
        if (err) {
            reject(message.channel.send("There was an error").then(m => m.delete({timeout: 10000})));
        } else {
            let a = JSON.parse(res.body);
            console.log(a);
            const trainsMsg = new MessageEmbed().setTitle(`Trains at ${a["Train 1"].where}!`).setColor(a["Train 1"].colorHex)
            for (let [trainName, trainObj] of Object.entries(a)) {
                trainsMsg.addField(`${trainObj["color"]} Line, ${trainObj["dest"]} in ${trainObj["eta"]}`, `A ${trainObj["color"]} Line train to ${trainObj["dest"]} is arriving at ${trainObj["where"]} in ${trainObj["eta"]}`, false)
            }
            resolve(message.channel.send(trainsMsg).then(m => {
                m.delete({timeout: 20000})
                message.delete()
            }))
        }
    })
}

async function trainHandler(message, args) {
    return new Promise(async function (resolve, reject) {
        if (args.length >= 2) {
            trainTimes(args[0], args[1], message).then(r => {
                resolve(r)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
        } else {
            montrose(message).then(r => {
                resolve(r)
            }).catch(err => {
                console.log(err);
                reject(err)
            })
        }
    })
}

module.exports = {trainHandler}