const Type = require("./Type");

module.exports = Object.freeze({
    ErrorFillingForm: { 
        id:'ErrorFillingForm', 
        message:'All required fields should be completed',
        type: Type.Error
    },
    ErrorGeographicsDepartmentsGetAll: { 
        id:'ErrorGeographicsDepartmentsGetAll', 
        message:'Error while getting the departments',
        type: Type.Error
    },
    ErrorGeographicsDepartmentsGetOne: { 
        id:'ErrorGeographicsDepartmentsGetOne', 
        message:'Error while getting the department',
        type: Type.Error
    },
    ErrorGeographicsTownsGetAll: { 
        id:'ErrorGeographicsTownsGetAll', 
        message:'Error while getting the towns',
        type: Type.Error
    },
    ErrorGeographicsTownsGetOne: { 
        id:'ErrorGeographicsTownsGetOne', 
        message:'Error while getting the town',
        type: Type.Error
    },
    ErrorTradingCustomersGetAll: { 
        id:'ErrorTradingCustomersGetAll', 
        message:'Error while getting the customers',
        type: Type.Error
    },
    ErrorTradingCustomersGetOne: { 
        id:'ErrorTradingCustomersGetOne', 
        message:'Error while getting the customer',
        type: Type.Error
    },
    ErrorTradingCustomersInsert: { 
        id:'ErrorTradingCustomersInsert', 
        message:'Error while creating the new customer',
        type: Type.Error
    },
    ErrorTradingCustomersUpdate: { 
        id:'ErrorTradingCustomersUpdate', 
        message:'Error while updating the customer',
        type: Type.Error
    },
    ErrorTradingCustomersDelete: { 
        id:'ErrorTradingCustomersDelete', 
        message:'Error while deleting the customer',
        type: Type.Error
    },
    SuccessTradingCustomersInsert: { 
        id:'SuccessTradingCustomersInsert', 
        message:'Customer created succesfuly',
        type: Type.Information
    },
    SuccessTradingCustomersUpdate: { 
        id:'SuccessTradingCustomersUpdate', 
        message:'Customer updated succesfuly',
        type: Type.Information
    },
    SuccessTradingCustomersDelete: { 
        id:'SuccessTradingCustomersDelete', 
        message:'Customer deleted succesfuly',
        type: Type.Information
    },
    ErrorTradingOwnEnterpriseGetOne: { 
        id:'ErrorTradingOwnEnterpriseGetOne', 
        message:'Error while getting the company data',
        type: Type.Error
    },
    ErrorTradingOwnEnterpriseUpdate: { 
        id:'ErrorTradingOwnEnterpriseUpdate', 
        message:'Error while updating the company data',
        type: Type.Error
    },
    SuccessTradingOwnEnterpriseUpdate: { 
        id:'SuccessTradingOwnEnterpriseUpdate', 
        message:'Company data updated succesfuly',
        type: Type.Information
    }
});