const Mongoose = require("mongoose");
const Config = require("../../../config");

const lineSchema = new Mongoose.Schema({
	Description: String,
    Amount: Number
},{
    versionKey:false,
    _id: false
});

const chapterSchema = new Mongoose.Schema({
	Description: String,
    Amount: Number,
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
    CustomerId: ObjectId,
    AddressId: ObjectId,
    Title: String,
    Description: String,
    Footer: String,
    Chapters: [ chapterSchema ],
    Amounts: {
        Total: {
            Amount: Number
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