const LogManager = require("../LogManager");
const Actions = require("./Actions");
const Q = require('q');

class ListableItemService {
    constructor(repository, repositoryList, errors){
        this.repository = repository;
        this.repositoryList = repositoryList;
        this.errors = errors;
    }
    getAll(query){
        let self=this;
        let className = self.constructor.name;
        let deferred = Q.defer();
        self.repositoryList.getAll(query)
        .then(function(result){
            if(result && result.success)
                LogManager.LogInfo(`${className}.getAll querying ${JSON.stringify(query)} returned ${result.data ? result.data.length : 0} items`);
            else
                LogManager.LogError(`Error on ${className}.getAll`);
            deferred.resolve(result);
        })
        .catch(function(error){
            LogManager.LogError(`Error on ${className}.getAll: ${error}`);
            deferred.resolve({ success: false, errors: [ self.errors.getAll ] });
        });
        return deferred.promise;
    }
    getOne(id){
        let self=this;
        let className = self.constructor.name;
        let deferred = Q.defer();
        self.repository.getOne(id)
        .then(function(result){
            if(result && result.success)
                LogManager.LogInfo(`${className}.getOne returned the item ${id}`);
            else
                LogManager.LogError(`Error on ${className}.getOne`);
            deferred.resolve(result);
        })
        .catch(function(error){
            LogManager.LogError(`Error on ${className}.getOne: ${error}`);
            deferred.resolve({ success: false, errors: [ self.errors.getOne ] });
        });
        return deferred.promise;
    }
    createListItem(data){
        let deferred = Q.defer();
        deferred.resolve(data);
        return deferred.promise;
    }
    prepareItem(data, currentData, action){
        let deferred = Q.defer();
        deferred.resolve(data);
        return deferred.promise;
    }
    getCurrentData(data, action){
        let deferred = Q.defer();
        switch(action){
            case Actions.INSERT:
            deferred.resolve(null);
            break;
            case Actions.UPDATE:
            case Actions.DELETE:
                let id = (action === Actions.UPDATE) ? data._id : data;
                self.repository.getOne(id)
                .then(function(result){
                    if(result && result.success)
                        deferred.resolve(result.data);
                    else
                        deferred.resolve(null);
                })
                .catch(function(){
                    deferred.resolve(null);
                });
            break;
            default:
                deferred.resolve(null);
            break;
        }
        return deferred.promise;
    }
    updateExternal(data, action){
        let deferred = Q.defer();
        deferred.resolve(data);
        return deferred.promise;
    }
    insert(item){
        let self=this;
        let deferred = Q.defer();
        delete item._id;
        self.applyAction(item, Actions.INSERT)
        .then(function(result){ deferred.resolve(result); })
        .catch(function(){ deferred.resolve({ success: false, errors: [ self.errors[Actions.INSERT] ] }); });
        return deferred.promise;
    }
    update(item){
        let self=this;
        let deferred = Q.defer();
        self.applyAction(item, Actions.UPDATE)
        .then(function(result){ deferred.resolve(result); })
        .catch(function(){ deferred.resolve({ success: false, errors: [ self.errors[Actions.UPDATE] ] }); });
        return deferred.promise;
    }
    delete(id){
        let self=this;
        let deferred = Q.defer();
        self.applyAction(id, Actions.DELETE)
        .then(function(result){ deferred.resolve(result); })
        .catch(function(){ deferred.resolve({ success: false, errors: [ self.errors[Actions.DELETE] ] }); });
        return deferred.promise;
    }
    applyAction(data, action){
        let self=this;
        let className = self.constructor.name;
        let deferred = Q.defer();
        
        self.getCurrentData(data, action)
        .then(function(currentData){
            self.prepareItem(data, currentData, action)
            .then(function(modifiedData){
                self.repository[action](modifiedData)
                .then(function(result){
                    if(result && result.success) {
                        self.createListItem(result.data)
                        .then(function(listItem){
                            self.repositoryList[action](listItem)
                            .then(function(resultInList){
                                if(resultInList && resultInList.success)
                                    LogManager.LogInfo(`${className}.${action}`);
                                else
                                    LogManager.LogError(`Error on ${className}.${action}`);
                                deferred.resolve(result);
                            })
                            .catch(function(error){
                                LogManager.LogError(`Error on ${className}.${action}: ${error}`);
                                deferred.resolve({ success: false, errors: [ self.errors[action] ] });
                            });
                        })
                        .catch(function(error){
                            LogManager.LogError(`Error on ${className}.${action}: ${error}`);
                            deferred.resolve({ success: false, errors: [ self.errors[action] ] });
                        });                    
                    } else {
                        LogManager.LogError(`Error on ${className}.${action}: ${error}`);
                        deferred.resolve({ success: false, errors: [ self.errors[action] ] });
                    }                
                })
                .catch(function(){
                    deferred.resolve({ success: false, errors: [ self.errors[action] ] });
                });
            })
            .catch(function(){
                deferred.resolve({ success: false, errors: [ self.errors[action] ] });
            });
        })
        .catch(function(){
            deferred.resolve({ success: false, errors: [ self.errors[action] ] });
        });        
        return deferred.promise;
    }
}
module.exports = ListableItemService;