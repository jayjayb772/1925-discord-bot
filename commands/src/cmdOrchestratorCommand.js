const request = require('request');
const https = require("request");
const { MessageEmbed , Client} = require("discord.js");

async function cmdOrchestratorCommand(message, args){

    return new Promise(function (resolve, reject) {
        handleCommand(args[0], args.slice(1), resolve, reject)
    })
}

function handleCommand(cmd, args, message, resolve, reject){
    switch (cmd) {
        case 'text':
            return
        case 'display-message':
            displayMessage(cmd, args, message, resolve, reject)
        default:
            sendInfo(cmd, args, resolve, reject)

    }
}

function options(body){
    return {
        "headers": {
            "content-type": "application/json"
        },
        "body": body
    }
}

function displayMessage(cmd, args, message, resolve, reject){
    let body = JSON.stringify({
        "cmd":cmd,
        "message":args.join(' '),
        "from": message.author.name,
        "roles":message.author.toJSON()
    })
    let options = options(body)
    console.log(options)

    let uri = url()
    request.post(`${uri}discord/display-message`, options, (err, res) => {
        if(res.body.statusCode != 200){
            console.log(res);
            reject(res)
        }
        console.log(res)
        resolve(res)
    })
}

function sendInfo(cmd, args, resolve, reject){
    let body = JSON.stringify({
        "cmd":cmd,
        "extra":args
    })
    let options = options(body)
    console.log(options)

    let uri = url()
    request.post(`${uri}discord/discord-command`, options, (err, res) => {
        if(res.body.statusCode != 200){
            console.log(res);
            reject(res)
        }
        console.log(res)
        resolve(res)
    })
}

function url(){
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
