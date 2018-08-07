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
    createListItem(item){        
    }
    prepareItem(data, action){
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
        .catch(function(error){ deferred.resolve({ success: false, errors: [ self.errors[Actions.INSERT] ] }); });
        return deferred.promise;
    }
    update(item){
        let self=this;
        let deferred = Q.defer();
        self.applyAction(item, Actions.UPDATE)
        .then(function(result){ deferred.resolve(result); })
        .catch(function(error){ deferred.resolve({ success: false, errors: [ self.errors[Actions.UPDATE] ] }); });
        return deferred.promise;
    }
    delete(id){
        let self=this;
        let deferred = Q.defer();
        self.applyAction(id, Actions.DELETE)
        .then(function(result){ deferred.resolve(result); })
        .catch(function(error){ deferred.resolve({ success: false, errors: [ self.errors[Actions.DELETE] ] }); });
        return deferred.promise;
    }
    applyAction(data, action){
        let self=this;
        let className = self.constructor.name;
        let deferred = Q.defer();
        
        self.prepareItem(data, action)
        .then(function(modifiedData){
            self.repository[action](modifiedData)
            .then(function(result){
                if(result && result.success) {
                    let listItem = self.createListItem(result.data);
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
        return deferred.promise;
    }
}
module.exports = ListableItemService;