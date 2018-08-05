const Mongoose = require("mongoose");
const Config = require("../../../config");

const schema = new Mongoose.Schema({
    CompleteName: String,
    TradingName: String,
    Phone: String,
    Email: String,
    DocumentId: String,
    Account: {
        Bank: String,
        CompleteNumber: String
    },
    Address: {
        DepartmentId: String,
        TownId: String,
        PostCode: String,
        StreetName: String,
        HouseNumber: String,
        FlatNumber: String,
        Door: String,
        Others: String
    }
},{
    versionKey:false
});
class OwnEnterprise{
    static get(){
        const connectionName = Config.dataServer.databases.TRADING.name;
        const collectionName = Config.dataServer.databases.TRADING.collections.OWNENTERPRISE;
        return global.connections[connectionName].model(collectionName, schema, collectionName);
    }
};
module.exports = OwnEnterprise;