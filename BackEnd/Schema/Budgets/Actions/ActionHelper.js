const States = require("../../../Service/Budgets/States");

module.exports = class ActionHelper {
    static GetActionsAvailable(budget){
        let result = {
            Edit: false,
            Delete: false,
            Lock: false,
            Reopen: false,
            SendMail: false,
        };
        if (budget === null || budget.StateData === null) return result;
        switch(budget.StateData.StateName){
            case States.Created:
                result.Edit = true;
                result.Delete = true;
                result.Lock = true;
            break;
            case States.Locked:
                result.Delete = true;
                result.Reopen = true;
                result.SendMail = true;
            break;
            case States.Sent:
                result.Reopen = true;
                result.SendMail = true;
            break;
        }
        return result;
    }
}