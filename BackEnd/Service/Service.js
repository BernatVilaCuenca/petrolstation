const LogManager = require("../LogManager");
const Q = require('q');

class Service {
    constructor(repository, errors){
        this.repository = repository;
        this.errors = errors;        
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
        let className = this.constructor.name;
        let deferred = Q.defer();
        this.repository.insert(item)
        .then(function(result){
            if(result && result.success)
                LogManager.LogInfo(`${className}.insert created the new item ${result.data._id}`);
            else
                LogManager.LogError(`Error on ${className}.insert`);
            deferred.resolve(result);
        })
        .catch(function(error){
            LogManager.LogError(`Error on ${className}.insert: ${error}`);
            deferred.resolve({ success: false, errors: [ this.errors.insert ] });
        });
        return deferred.promise;
    }
    update(item){
        let className = this.constructor.name;
        let deferred = Q.defer();
        this.repository.update(item)
        .then(function(result){
            if(result && result.success)
                LogManager.LogInfo(`${className}.update modified the item ${result.data._id}`);
            else
                LogManager.LogError(`Error on ${className}.update`);
            deferred.resolve(result);
        })
        .catch(function(error){
            LogManager.LogError(`Error on ${className}.update: ${error}`);
            deferred.resolve({ success: false, errors: [ this.errors.update ] });
        });
        return deferred.promise;
    }
    delete(id){
        let className = this.constructor.name;
        let deferred = Q.defer();
        this.repository.delete(id)
        .then(function(result){
            if(result && result.success)
                LogManager.LogInfo(`${className}.delete removed the item ${result.data._id}`);
            else
                LogManager.LogError(`Error on ${className}.delete`);
            deferred.resolve(result);
        })
        .catch(function(error){
            LogManager.LogError(`Error on ${className}.delete: ${error}`);
            deferred.resolve({ success: false, errors: [ this.errors.delete ] });
        });
        return deferred.promise;
    }
}
module.exports = Service;