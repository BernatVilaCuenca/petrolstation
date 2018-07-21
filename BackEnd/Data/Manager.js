const Config = require("../config");
const Mongoose = require("mongoose");
const LogManager = require("../LogManager");

class DataBaseManager{
    static Init(){
        global.connections = {};
        for (var dbProperty in Config.dataServer.databases) {                    
            const dbName = Config.dataServer.databases[dbProperty].name;
            const server = Config.dataServer.server;
            const port = Config.dataServer.port;
            const url = `mongodb://${server}:${port}/${dbName}`;
            const connection = Mongoose.createConnection(url);
            connection.on(
                "open", 
                function(){
                    LogManager.LogInfo(`DB Connection to ${dbName} opened successfuly`);
                }, 
                function(){
                    LogManager.LogError(`Error opening a DB Connection to ${dbName}`);
                }
            );            
            global.connections[dbName] = connection;
        }
    }
}
module.exports = DataBaseManager;