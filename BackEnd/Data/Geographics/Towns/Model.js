var Mongoose = require("mongoose");
var Config = require("../../../config");

var schema = new Mongoose.Schema({
	_id: String,
    Name: String,
    Department: String
},{
    versionKey:false
});
class Town{
    static get(){
        var connectionName = Config.dataServer.databases.GEOGRAPHICS.name;
        var collectionName = Config.dataServer.databases.GEOGRAPHICS.collections.TOWNS;
        return global.connections[connectionName].model(collectionName, schema, collectionName);
    }
};
module.exports = Town;