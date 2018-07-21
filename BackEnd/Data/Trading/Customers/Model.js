const Mongoose = require("mongoose");
const Config = require("../../../config");

const contactSchema = new Mongoose.Schema({
	Name: String,
    SurName: String,
    CompleteName: String,
    Phone: String,
    Email: String,
    DocumentId: String
},{
    versionKey:false,
    _id: false
});
const addressSchema = new Mongoose.Schema({
	DepartmentId: String,
    TownId: String,
    PostCode: String,
    StreetName: String,
    HouseNumber: String,
    FlatNumber: String,
    Door: String,
    Others: String
},{
    versionKey:false,
    _id: false
});
const schema = new Mongoose.Schema({
    Type: String,
    PersonData:{
        Name: String,
        Surname: String,
        CompleteName: String,
        Phone: String,
        Email: String,
        DocumentId: String
    },
    LegalPersonData:{
        BusinessName: String,
        Phone: String,
        Email: String,
        DocumentId: String
    },
    Addresses: [ addressSchema ],
    Contacts: [ contactSchema ]
},{
    versionKey:false
});
class Customer{
    static get(){
        const connectionName = Config.dataServer.databases.TRADING.name;
        const collectionName = Config.dataServer.databases.TRADING.collections.CUSTOMERS;
        return global.connections[connectionName].model(collectionName, schema, collectionName);
    }
};
module.exports = Customer;