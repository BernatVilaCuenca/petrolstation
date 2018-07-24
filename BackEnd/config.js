module.exports = Object.freeze({
    graphQlServer:{
        port : 4378
    },
	dataServer:{
		server : "localhost",
		port : 27017,
		databases: {
			GEOGRAPHICS: {
				name: "Geographics",
				collections: {
					DEPARTMENTS: "Departments",
					TOWNS: "Towns"
				}
			},
			TRADING: {
				name: "Trading",
				collections: {
					CUSTOMERS: "Customers",
					CUSTOMERSLIST: "CustomersList"
				}
			}
		}
	}	
});