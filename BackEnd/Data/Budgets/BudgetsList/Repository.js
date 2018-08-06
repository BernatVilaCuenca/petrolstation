const Model = require("./Model").get();
const Errors = require("../../../Errors");
const Repository = require("../../Repository");

class BudgetsListRepository extends Repository{
    constructor(){
        super(Model, Errors.Budgets.Budgets);
    }
}
module.exports = BudgetsListRepository;