const LogManager = require("../LogManager");
const Q = require('q');

class ListableItemService {
    constructor(repository, repositoryList, errors){
        this.repository = repository;
        this.repositoryList = repositoryList;
        this.errors = errors;
        this.actions = {
            INSERT: 'insert',
            UPDATE: 'update',
            DELETE: 'delete'
        };
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
    prepareItem(item){        
    }
    insert(item){
        let self=this;
        let deferred = Q.defer();
        delete item._id;
        self.applyAction(item, self.actions.INSERT)
        .then(function(result){ deferred.resolve(result); })
        .catch(function(error){ deferred.resolve({ success: false, errors: [ self.errors[self.actions.INSERT] ] }); });
        return deferred.promise;
    }
    update(item){
        let self=this;
        let deferred = Q.defer();
        self.applyAction(item, self.actions.UPDATE)
        .then(function(result){ deferred.resolve(result); })
        .catch(function(error){ deferred.resolve({ success: false, errors: [ self.errors[self.actions.UPDATE] ] }); });
        return deferred.promise;
    }
    delete(id){
        let self=this;
        let deferred = Q.defer();
        self.applyAction(id, self.actions.DELETE)
        .then(function(result){ deferred.resolve(result); })
        .catch(function(error){ deferred.resolve({ success: false, errors: [ self.errors[self.actions.DELETE] ] }); });
        return deferred.promise;
    }
    applyAction(data, action){
        let self=this;
        let className = self.constructor.name;
        let deferred = Q.defer();
        
        if([ self.actions.INSERT, self.actions.UPDATE ].indexOf(action) > -1)
            self.prepareItem(data);
        
        self.repository[action](data)
        .then(function(result){
            if(result && result.success) {
                let listItem = self.createListItem(result.data);
                self.repositoryList[action](listItem)
                .then(function(resultInList){
                    if(resultInList && resultInList.success)
                        LogManager.LogInfo(`${className}.${action} the new item ${resultInList.data._id}`);
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
        .catch(function(error){
            deferred.resolve({ success: false, errors: [ self.errors[action] ] });
        });
        return deferred.promise;
    }
}
module.exports = ListableItemService;