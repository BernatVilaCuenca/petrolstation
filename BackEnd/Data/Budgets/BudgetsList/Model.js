const Mongoose = require("mongoose");
const Config = require("../../../config");

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
const stateDataSchema = new Mongoose.Schema({
    StateName: String,
    StateStory: [ stateStoryElementSchema ]
},{
    versionKey:false,
    _id: false
});

const schema = new Mongoose.Schema({
    BudgetNumber: String,
    BudgetDate: Date,
    CustomerCompleteName:String,
    CompleteAddress: String,
    Title: String,
    Amounts: {
        Total: {
            Quantity: Number
        }
    },
    StateData: stateDataSchema
},{
    versionKey:false
});
class BudgetList{
    static get(){
        const connectionName = Config.dataServer.databases.BUDGETS.name;
        const collectionName = Config.dataServer.databases.BUDGETS.collections.BUDGETSLIST;
        return global.connections[connectionName].model(collectionName, schema, collectionName);
    }
};
module.exports = BudgetList;