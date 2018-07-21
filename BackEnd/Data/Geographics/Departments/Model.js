const Mongoose = require("mongoose");
const Config = require("../../../config");

const schema = new Mongoose.Schema({
	_id: String,
	Name: String
},{
    versionKey:false
});
class Department{
    static get(){
        const connectionName = Config.dataServer.databases.GEOGRAPHICS.name;
        const collectionName = Config.dataServer.databases.GEOGRAPHICS.collections.DEPARTMENTS;
        return global.connections[connectionName].model(collectionName, schema, collectionName);
    }
};
module.exports = Department;