const _ = require ('lodash');
const Q = require('q');
var moment = require('moment');

const Errors = require("../../Errors");
const ListableItemService = require("../ListableItemService");
const CustomerType = require("../Trading/Type");
const Actions = require("../Actions");
const States = require("../Budgets/States")

class BudgetsService extends ListableItemService{
    constructor(repository, repositoryList, customerRepository, townsRepository){
        super(repository, repositoryList, Errors.Budgets.Budgets);
        this.customerRepository = customerRepository;
        this.townsRepository = townsRepository;
    }
    prepareItem(data, currentData, action){
        let deferred = Q.defer();
        switch(action){
            case Actions.INSERT:
                data.BudgetDate = moment(data.BudgetDate, "DD/MM/YYYY");
                data.StateStory = [{
                    StateName: States.Created,
                    StateDate: new Date(),
                    SendMailData: null
                }];
                deferred.resolve(data);
            break;
            case Actions.UPDATE:
                data.BudgetDate = moment(data.BudgetDate, "DD/MM/YYYY");
                deferred.resolve(data);
            break;
            default:
                deferred.resolve(data);
            break;
        }        
        return deferred.promise;
    }
    createListItem(item){
        let self = this;
        let deferred = Q.defer();
        
        let { _id, BudgetNumber, BudgetDate, CustomerId, AddressId, Amounts,  StateStory } = item;
        let listItem = { _id, BudgetNumber, BudgetDate, Amounts, StateStory };

        self.getCustomer(CustomerId)
            .then(function(customer){
                if(customer){
                    listItem.CustomerCompleteName = customer.Type === CustomerType.Person ? 
                                                    customer.PersonData.CompleteName : 
                                                    customer.LegalPersonData.BusinessName;                
                    listItem.CompleteAddress = '';
                    
                    let address = _.find (
                        customer.Addresses, 
                        function(address) {
                            return address._id.toString() == AddressId.toString();
                        }
                    );                    
                    if(address){
                        listItem.CompleteAddress = `C/${ address.StreetName }`;
                        self.getTown(address.TownId)
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
        this.customerRepository.getOne(id)
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
        this.townsRepository.getOne(id)
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