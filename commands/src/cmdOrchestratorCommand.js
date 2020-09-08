const request = require('request');
const https = require("request");
const { MessageEmbed , Client} = require("discord.js");

async function cmdOrchestratorCommand(message, args){

    return new Promise(function (resolve, reject) {
        let body = JSON.stringify({
            "cmd":args[0],
            "extra":args.slice(1)
        })
        let options = {
            "headers": {
                "content-type": "application/json"
            },
            "body": body
        }
        console.log(options)

        let uri = url()
        request.post(`${uri}discord/discord-command`, options, (err, res) => {
            console.log(res)
            console.log(err)
            if(res.body.statusCode != 200){
                console.log(res);
                reject(res)
            }
            console.log(res)
            resolve(res)
        })
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
