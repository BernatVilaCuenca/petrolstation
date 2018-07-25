const LogManager = require("../LogManager");
const Q = require('q');

class ItemService {
    constructor(repository, errors){
        this.repository = repository;
        this.errors = errors;
        this.actions = {
            INSERT: 'insert',
            UPDATE: 'update',
            DELETE: 'delete'
        };       
    }
    getAll(query){
        let className = this.constructor.name;
        let deferred = Q.defer();
        this.repository.getAll(query)
        .then(function(result){
            if(result && result.success)
                LogManager.LogInfo(`${className}.getAll querying ${JSON.stringify(query)} returned ${result.data ? result.data.length : 0} items`);
            else
                LogManager.LogError(`Error on ${className}.getAll`);
            deferred.resolve(result);
        })
        .catch(function(error){
            LogManager.LogError(`Error on ${className}.getAll: ${error}`);
            deferred.resolve({ success: false, errors: [ this.errors.getAll ] });
        });
        return deferred.promise;
    }
    getOne(id){
        let className = this.constructor.name;
        let deferred = Q.defer();
        this.repository.getOne(id)
        .then(function(result){
            if(result && result.success)
                LogManager.LogInfo(`${className}.getOne returned the item ${id}`);
            else
                LogManager.LogError(`Error on ${className}.getOne`);
            deferred.resolve(result);
        })
        .catch(function(error){
            LogManager.LogError(`Error on ${className}.getOne: ${error}`);
            deferred.resolve({ success: false, errors: [ this.errors.getOne ] });
        });
        return deferred.promise;
    }
    insert(item){
        let self=this;
        let deferred = Q.defer();
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
    applyAction(item, action){
        let self=this;
        let className = self.constructor.name;
        let deferred = Q.defer();
        self.repository[action](item)
        .then(function(result){
            if(result && result.success)
                LogManager.LogInfo(`${className}.${action} the item ${result.data._id}`);
            else
                LogManager.LogError(`Error on ${className}.${action}`);
            deferred.resolve(result);         
        })
        .catch(function(error){
            deferred.resolve({ success: false, errors: [ self.errors[action] ] });
        });
        return deferred.promise;
    }
}
module.exports = ItemService;