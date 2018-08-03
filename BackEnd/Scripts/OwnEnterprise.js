db.OwnEnterprise.drop()
db.OwnEnterprise.insert({
	"Name" : "Joan Codina Solé",
	"TradingName" : "Contruccions Torné",
	"IdNumber": "12345678Z",
	"Phone":"123 456 789",
	"Email":"construccions.torne@gmail.com",
	"Account" : {
		"Bank":{
			"BankCode": "B02",
			"BankName": "Caixa Catalunya-BBVA"
		},
		"CompleteNumber": "1234 5678 1234 5678"
	},
	"Address":{
		"Department" : { 
			"DepartmentId" : "D01",
			"DepartmentName" : "Barcelona"
		},
		"Town" :  { 
			"TownId": "D01.T06",
			"TownName" : "Barcelona"
		},
		"PostCode" : "08016",
		"StreetName" : "Pablo Iglesias",
		"HouseNumber" : "66",
		"Door" : "1º 2º",
		"Others" : ""
	}	
})
