const request = require('request');
const https = require("request");
const {MessageEmbed, Client} = require("discord.js");

async function cmdOrchestratorCommand(message, args) {

    return new Promise(async function (resolve, reject) {
        await handleCommand(args[0], args.slice(1), message, resolve, reject)
    })
}

async function handleCommand(cmd, args, message, resolve, reject) {
    switch (cmd) {
        case 'text':
            return
        case 'display-message':
            displayMessage(cmd, args, message, resolve, reject)
            break;
        case 'trains':
            if (args.length >= 2) {
                trainTimes(args[0], args[1], message).then(r => {resolve()}).catch(err=>{console.log(err); reject(err)})
            } else {
                montrose(message).then(r => {resolve()}).catch(err=>{console.log(err); reject(err)})
            }
            return;
        default:
            sendInfo(cmd, args, resolve, reject)
            break;
    }
}

async function trainTimes(station, color, message) {
    return new Promise(function (resolve, reject) {
        station = station.charAt(0).toUpperCase() + station.slice(1)
        color = color.charAt(0).toUpperCase() + color.slice(1)
        let uri = `${url()}discord/train-times?name=${station}&color=${color}`
        request.get(uri, (err, res) => {
            if (err) {
                reject(message.channel.send("There was an error").then(m => m.delete({timeout: 10000})));
            } else {

                let a = JSON.parse(res.body);
                console.log(a);
                const trainsMsg = new MessageEmbed().setTitle("Trains!").setColor(a["Train 1"].colorHex)
                for (let [trainName,trainObj] of Object.entries(a)) {
                    trainsMsg.addField(`${trainObj["color"]} Line, ${trainObj["dest"]} in ${trainObj["eta"]}`, `A ${trainObj["color"]} Line train to ${trainObj["dest"]} is arriving at ${trainObj["where"]} in ${trainObj["eta"]}`, false)
                }
                resolve(message.channel.send(trainsMsg).then(m=>{m.delete({timeout:20000})
                message.delete()}))
            }
        })
    })
}

async function montrose(message) {
    return new Promise(function (resolve, reject) {
        let uri = `${url()}discord/train-times`
        request.get(uri, (err, res) => {
            if (err) {
                reject(message.channel.send("There was an error").then(m => m.delete({timeout: 10000})));
            } else {

                let a = JSON.parse(res.body);
                console.log(a);
                const trainsMsg = new MessageEmbed().setTitle("Trains!").setColor(a["Train 1"].colorHex)
                for (let [trainName,trainObj] of Object.entries(a)) {
                    trainsMsg.addField(`${trainObj["dest"]} in ${trainObj["eta"]}`, `A ${trainObj["color"]} Line train to ${trainObj["dest"]} is arriving at ${trainObj["where"]} in ${trainObj["eta"]}`, false)
                }
                resolve(message.channel.send(trainsMsg).then(m=>{m.delete({timeout:20000})
                    message.delete()}))
            }
        })
    })
}

function options(body) {
    return {
        "headers": {
            "content-type": "application/json"
        },
        "body": body
    }
}

function displayMessage(cmd, args, message, resolve, reject) {
    let body = JSON.stringify({
        "cmd": cmd,
        "message": args.join(' '),
        "from": message.author.name,
        "roles": message.author.toJSON()
    })
    let options = options(body)
    console.log(options)

    let uri = url()
    request.post(`${uri}discord/display-message`, options, (err, res) => {
        if (res.body.statusCode != 200) {
            console.log(res);
            reject(res)
        }
        console.log(res)
        resolve(res)
    })
}

function sendInfo(cmd, args, resolve, reject) {
    let body = JSON.stringify({
        "cmd": cmd,
        "extra": args
    })
    let options = options(body)
    console.log(options)

    let uri = url()
    request.post(`${uri}discord/discord-command`, options, (err, res) => {
        if (res.body.statusCode != 200) {
            console.log(res);
            reject(res)
        }
        console.log(res)
        resolve(res)
    })
}

function url() {
    switch (process.env.environment) {
        case 'dev':
            return process.env.local_orchestrator_url
        case 'prod':
            return process.env.prod_orchestrator_url
        default:
            return process.env.prod_orchestrator_url
    }
}

module.exports = {cmdOrchestratorCommand}
