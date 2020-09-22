const request = require('request');
const https = require("request");
const {debuglog} = require("../utils/debugCommands");
const {url} = require("../utils/url.js");

async function cmdOrchestratorCommand(message, args) {

    return new Promise(async function (resolve, reject) {
        await handleCommand(args[0], args.slice(1), message, resolve, reject)
    })
}

async function cmdSendDisplayMessage(message) {

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
        default:
            sendInfo(cmd, args, resolve, reject)
            break;
    }
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
    debuglog(options)

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






module.exports = {cmdOrchestratorCommand}
