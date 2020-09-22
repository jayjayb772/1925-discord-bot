const request = require("request");
const {debuglog} = require("../utils/debugCommands");

function sendToOrch(message){
sock.emit(message)
}
module.exports = {sendToOrch}