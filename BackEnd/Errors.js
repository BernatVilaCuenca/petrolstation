module.exports = Object.freeze({
    Geographics:{
        Departments:{
            getAll: "ErrorGeographicsDepartmentsGetAll",
            getOne: "ErrorGeographicsDepartmentsGetOne"
        },
        Towns:{
            getAll: "ErrorGeographicsTownsGetAll",
            getOne: "ErrorGeographicsTownsGetOne"
        }
    },
    Trading:{
        Customers:{
            getAll: "ErrorTradingCustomersGetAll",
            getOne: "ErrorTradingCustomersGetOne",
            insert: "ErrorTradingCustomersInsert",
            update: "ErrorTradingCustomersUpdate",
            delete: "ErrorTradingCustomersDelete"
        },
        OwnEnterprise:{
            getOne: "ErrorTradingOwnEnterpriseGetOne",
            update: "ErrorTradingOwnEnterpriseUpdate"
        }
    },
    Budgets:{
        Budgets:{
            getAll: "ErrorBudgetsGetAll",
            getOne: "ErrorBudgetsGetOne",
            insert: "ErrorBudgetsInsert",
            update: "ErrorBudgetsUpdate",
            delete: "ErrorBudgetsDelete"
        }
    }
});