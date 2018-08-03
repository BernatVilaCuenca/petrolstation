const Mongoose = require("mongoose");
const Config = require("../../../config");

const schema = new Mongoose.Schema({
    Type: String,
    CompleteName: String,
    Phone: String,
    Email: String,
    DocumentId: String,
    Deletable: Boolean
},{
    versionKey:false
});
class CustomerList{
    static get(){
        const connectionName = Config.dataServer.databases.TRADING.name;
        const collectionName = Config.dataServer.databases.TRADING.collections.CUSTOMERSLIST;
        return global.connections[connectionName].model(collectionName, schema, collectionName);
    }
};
module.exports = CustomerList;