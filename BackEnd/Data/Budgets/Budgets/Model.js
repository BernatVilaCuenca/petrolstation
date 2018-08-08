const Mongoose = require("mongoose");
const Config = require("../../../config");

const lineSchema = new Mongoose.Schema({
	Description: String,
    Quantity: Number
},{
    versionKey:false,
    _id: false
});

const chapterSchema = new Mongoose.Schema({
	Description: String,
    Quantity: Number,
    Lines: [ lineSchema ]
},{
    versionKey:false,
    _id: false
});

const stateStoryElementSchema = new Mongoose.Schema({
    StateName: String,
    StateDate: Date,
    SendMailData: {
        Destinations: [ String ]
    }
},{
    versionKey:false,
    _id: false
});

const schema = new Mongoose.Schema({
    BudgetNumber: String,
    BudgetDate: Date,
    CustomerId: Mongoose.SchemaTypes.ObjectId,
    AddressId: Mongoose.SchemaTypes.ObjectId,
    Title: String,
    Description: String,
    Footer: String,
    Chapters: [ chapterSchema ],
    Amounts: {
        Total: {
            Quantity: Number
        }
    },
    StateStory: [ stateStoryElementSchema ]
},{
    versionKey:false
});
class Budget{
    static get(){
        const connectionName = Config.dataServer.databases.BUDGETS.name;
        const collectionName = Config.dataServer.databases.BUDGETS.collections.BUDGETS;
        return global.connections[connectionName].model(collectionName, schema, collectionName);
    }
};
module.exports = Budget;