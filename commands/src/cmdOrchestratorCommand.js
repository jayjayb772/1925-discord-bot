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
        let url =function(){
            switch (process.env.environment) {
                case 'dev':
                    return process.env.local_orchestrator_url
                case 'prod':
                    return process.env.prod_orchestrator_url
                default:
                    return process.env.prod_orchestrator_url
            }
        }

        await request.post(`${url}discord/discord-command`, options, (err, res) => {
            if(res.body.statusCode != 200){
                reject(res)
            }
            console.log(res)
            resolve(res)
        })
    })
}

module.exports = {cmdOrchestratorCommand}
