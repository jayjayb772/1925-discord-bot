
function consoleDebug(str){
    if(process.env.DEBUG){
        console.log(str);
    }
}

module.exports = {consoleDebug};