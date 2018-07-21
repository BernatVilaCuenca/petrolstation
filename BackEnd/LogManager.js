const colors = require('colors');
var moment = require('moment');

class LogManager{
    static GetCurrentMoment(){
        let result = moment().format('DD/MM/YYYY HH:mm:ss');
        return result;
    }
    static LogInfo(message){
        console.log(colors.green(`${this.GetCurrentMoment()} - ${message}`));
    }
    static LogWarn(message){
        console.log(colors.yellow(`${this.GetCurrentMoment()} - ${message}`));
    }
    static LogError(message){
        console.log(colors.red(`${this.GetCurrentMoment()} - ${message}`));
    }
}
module.exports = LogManager;