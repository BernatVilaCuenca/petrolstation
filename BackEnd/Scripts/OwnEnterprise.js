db.OwnEnterprise.drop()
db.OwnEnterprise.insert({
	"CompleteName" : "Joan Codina Solé",
	"TradingName" : "Contruccions Torné",
	"DocumentId": "12345678Z",
	"Phone":"123 456 789",
	"Email":"construccions.torne@gmail.com",
	"Account" : {
		"Bank":"Caixa Catalunya-BBVA",
		"CompleteNumber": "1234 5678 1234 5678"
	},
	"Address":{
		"DepartmentId" : "D01",
		"TownId": "D01.T06",
		"PostCode" : "08016",
		"StreetName" : "Pablo Iglesias",
		"HouseNumber" : "66",
		"FlatNumber": "1º", 
		"Door" : "2º",
		"Others" : ""
	}	
})
