const _ = require ('lodash');
const Errors = require("../../Errors");
const ListableItemService = require("../ListableItemService");
const CustomerType = require("../Trading/Type");

class BudgetsService extends ListableItemService{
    constructor(repository, repositoryList, customerRepository, townsRepository){
        super(repository, repositoryList, Errors.Budgets.Budgets);
        this.customerRepository = customerRepository;
        this.townsRepository = townsRepository;
    }
    createListItem(item){
        let self = this;
        let deferred = Q.defer();
        let {
            _id,
            BudgetNumber,
            BudgetDate,
            CustomerId,
            AddressId,
            Amounts, 
            StateStory
        } = item;

        let listItem = {
            _id,
            BudgetNumber,
            BudgetDate,
            Amounts,
            StateStory
        };
        self.getCustomer(CustomerId)
            .then(function(customer){ 
                if(customer !== null){
                    listItem.CustomerCompleteName = customer.Type === CustomerType.Person ? 
                                                    customer.PersonData.CompleteName : 
                                                    customer.LegalPersonData.BusinessName;                
                    let iAddress = _.findIndex (
                        customer.Addresses, 
                        function(address) {
                            return address._id === AddressId;
                        }
                    );
                    listItem.CompleteAddress = '';
                    if(iAddress > -1){
                        listItem.CompleteAddress = `C/${ customer.Addresses[iAddress].StreetName }`;
                        
                        self.getTown(customer.Addresses[iAddress].TownId)
                            .then(function(town){    
                                listItem.CompleteAddress = `${ listItem.CompleteAddress } (${ town.Name })`;
                            })
                            .finally(function(){ 
                                deferred.resolve(listItem); 
                            });
                    } else
                        deferred.resolve(listItem);
                } else
                    deferred.resolve(listItem);
            })
            .catch(function(){ 
                deferred.resolve(listItem); 
            });

        return deferred.promise;
    }
    getCustomer(id){
        let deferred = Q.defer();
        global.customerRepository.getOne(id)
                               .then(function(result){ 
                                    deferred.resolve((result && result.success) ? result.data : null); 
                                })
                               .catch(function(){ 
                                    deferred.resolve(null);
                                });
        return deferred.promise;
    }
    getTown(id){
        let deferred = Q.defer();
        global.townsRepository.getOne(id)
                                .then(function(result){ 
                                    deferred.resolve((result && result.success) ? result.data : null); 
                                })
                                .catch(function(){ 
                                    deferred.resolve(null);
                                });
        return deferred.promise;
    }
}
module.exports = BudgetsService;