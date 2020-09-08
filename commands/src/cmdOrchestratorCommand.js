const request = require('request');
const https = require("request");
const { MessageEmbed , Client} = require("discord.js");

async function cmdOrchestratorCommand(message, args){

    return new Promise(async function (resolve, reject) {
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

        await request.post(`${process.env.local_orchestrator_url}discord/discord-command`, options, (err, res) => {
            if(res.body.statusCode != 200){
                reject(res)
            }
            console.log(res)
            resolve(res)
        })
    })
}

module.exports = {cmdOrchestratorCommand}
