const _ = require ('lodash');
const Q = require('q');
var moment = require('moment');

const Errors = require("../../Errors");
const ListableItemService = require("../ListableItemService");
const CustomerType = require("../Trading/Type");
const Actions = require("./Actions");
const States = require("./States")

class BudgetsService extends ListableItemService{
    constructor(repository, repositoryList, customerRepository, townsRepository){
        super(repository, repositoryList, Errors.Budgets.Budgets);
        this.customerRepository = customerRepository;
        this.townsRepository = townsRepository;
    }
    completeItemListData(item){
        let self = this;
        let deferred = Q.defer();

        let { _id, BudgetNumber, BudgetDate, CustomerId, AddressId, Amounts,  StateData } = item;
        let itemList = { _id, BudgetNumber, BudgetDate, Amounts, StateData };
        console.log(CustomerId)
        self.getCustomer(CustomerId)
            .then(function(customer){
                if(customer){
                    console.log(customer)
                    itemList.CustomerCompleteName = customer.Type === CustomerType.Person ? 
                                                        customer.PersonData.CompleteName : 
                                                        customer.LegalPersonData.BusinessName;                
                    itemList.CompleteAddress = '';
                    
                    let address = _.find (
                        customer.Addresses, 
                        function(address) {
                            return address._id.toString() == AddressId.toString();
                        }
                    );           
                    console.log(address)         
                    if(address){
                        itemList.CompleteAddress = `C/${ address.StreetName }`;
                        self.getTown(address.TownId)
                            .then(function(town){    
                                itemList.CompleteAddress = `${ itemList.CompleteAddress } (${ town.Name })`;
                            })
                            .finally(function(){ 
                                deferred.resolve({ success: true, data: itemList });
                            });
                    } else
                        deferred.resolve({ success: false });
                } else
                    deferred.resolve({ success: false });
            })
            .catch(function(){ 
                deferred.resolve({ success: false });
            });
        return deferred.promise;
    }
    completeItemData(item){
        let self = this;
        let deferred = Q.defer();
        item.BudgetDate = moment(item.BudgetDate, "DD/MM/YYYY");

        switch(self.action){
            case Actions.Insert:
                item.StateData = {
                    StateName: States.Created,
                    StateStory: [{
                        StateName: States.Created,
                        StateDate: new Date(),
                        SendMailData: null
                    }]
                };
            break;
            case Actions.Lock:
                let stateStory = item.StateData.StateStory;
                stateStory.push({
                    StateName: States.Locked,
                    StateDate: new Date(),
                    SendMailData: null
                });
                item.StateData = {
                    StateName: States.Locked,
                    StateStory: stateStory
                };
            break;
            case Actions.Send:
            break;
            default:
            break;
        }
        deferred.resolve({ success: true, data: item });
        return deferred.promise;
    }
    prepare(originalData, newData){
        let self = this;
        let deferred = Q.defer();
        let result = { };
        if(originalData)
            result = { 
                item: Object.assign(originalData.item, newData),
                itemList: Object.assign({ }, originalData.itemList)
            };
        else
            result = { 
                item: newData,
                itemList: { }
            };
        self.completeItemData(result.item)
        .then(function(resultCompleteItem){ 
            if(resultCompleteItem && resultCompleteItem.success){
                result.item = resultCompleteItem.data;
                self.completeItemListData(result.item)
                .then(function(resultCompleteItemList){ 
                    if(resultCompleteItemList && resultCompleteItemList.success){
                        result.itemList = resultCompleteItemList.data;
                        deferred.resolve({ success: true, data: result });
                    }else
                        deferred.resolve({ success: false });                    
                })
               .catch(function(){
                    deferred.resolve({ success: false });
                });
            }else
                deferred.resolve({ success: false });                     
        })
       .catch(function(){
            deferred.resolve({ success: false });
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