const LogManager = require("../LogManager");
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
    prepare(originalData, newData){
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
                itemList: {}
            };
        deferred.resolve({ success: true, data: result });
        return deferred.promise;
    }
    updateExternalEntities(data){
        let deferred = Q.defer();
        deferred.resolve({ success: true });
        return deferred.promise;
    }
    fetch(id){
        let self=this;
        let deferred = Q.defer();
        self.repository.getOne(id)
        .then(function(result){
            if(result && result.success){
                self.repositoryList.getOne(id)
                .then(function(resultList){
                    if(resultList && resultList.success)
                        deferred.resolve({ success: true, data: { item: result.data, itemList: resultList.data }});
                    else
                        deferred.resolve({ success: false, data: null });
                })
                .catch(function(){
                    deferred.resolve({ success: false, data: null });
                });
            } else
                deferred.resolve({ success: false, data: null });
        })
        .catch(function(){
            deferred.resolve({ success: false, data: null });
        });
        return deferred.promise;
    }
    performInsert(data){
        let self=this;
        let className = self.constructor.name;
        let deferred = Q.defer();
        delete data.item._id;
        self.repository.insert(data.item)
        .then(function(result){
            if(result && result.success) {
                data.itemList._id = result.data._id;
                self.repositoryList.insert(data.itemList)
                .then(function(resultList){
                    if(resultList && resultList.success)
                        LogManager.LogInfo(`${className} inserted the new item ${ resultList.data._id }`);
                    else
                        LogManager.LogError(`Error on ${className}.insert`);
                    deferred.resolve(result);
                })
                .catch(function(error){
                    LogManager.LogError(`Error on ${className}.insert: ${error}`);
                    deferred.resolve({ success: false, errors: [ self.errors.insert ] });
                });
            }else{
                LogManager.LogError(`Error on ${className}.insert: ${error}`);
                deferred.resolve({ success: false, errors: [ self.errors.insert ] });
            }
        })
        .catch(function(error){
            LogManager.LogError(`Error on ${className}.insert: ${error}`);
            deferred.resolve({ success: false, errors: [ self.errors.insert ] });
        });
        return deferred.promise;
    }
    insert(item){
        let self=this;
        let className = self.constructor.name;
        let deferred = Q.defer();
        self.prepare(null, item)
        .then(function(resultPrepare){
            if(resultPrepare && resultPrepare.success){
                self.performInsert(resultPrepare.data)
                .then(function(resultPerform){ 
                    if(resultPerform && resultPerform.success) {
                        self.updateExternalEntities(resultPerform.data)
                        .then(function(resultExternalUpdate){
                            if(resultExternalUpdate && resultExternalUpdate.success) {
                                deferred.resolve({ success: true, data: resultPerform.data });
                            }else{
                                LogManager.LogError(`Error on ${className}.insert: ${error}`);
                                deferred.resolve({ success: false, errors: [ self.errors.insert ] });
                            }
                        })
                        .catch(function(){
                            LogManager.LogError(`Error on ${className}.insert: ${error}`);
                            deferred.resolve({ success: false, errors: [ self.errors.insert ] });
                        });
                    }else{
                        LogManager.LogError(`Error on ${className}.insert: ${error}`);
                        deferred.resolve({ success: false, errors: [ self.errors.insert ] });
                    }               
                })
                .catch(function(){
                    LogManager.LogError(`Error on ${className}.insert: ${error}`);
                    deferred.resolve({ success: false, errors: [ self.errors.insert ] });
                });
            }else{
            }
        })
        .catch(function(){
            LogManager.LogError(`Error on ${className}.insert: ${error}`);
            deferred.resolve({ success: false, errors: [ self.errors.insert ] });
        });
        return deferred.promise;
    }
    performUpdate(data){
        let self=this;
        let className = self.constructor.name;
        let deferred = Q.defer();
        self.repository.update(data.item)
        .then(function(result){
            if(result && result.success) {
                data.itemList._id = result.data._id;
                self.repositoryList.update(data.itemList)
                .then(function(resultList){
                    if(resultList && resultList.success)
                        LogManager.LogInfo(`${className} updated the item ${ resultList.data._id }`);
                    else
                        LogManager.LogError(`Error on ${className}.insert`);
                    deferred.resolve(result);
                })
                .catch(function(error){
                    LogManager.LogError(`Error on ${className}.insert: ${error}`);
                    deferred.resolve({ success: false, errors: [ self.errors.insert ] });
                });
            }else{
                LogManager.LogError(`Error on ${className}.insert: ${error}`);
                deferred.resolve({ success: false, errors: [ self.errors.insert ] });
            }
        })
        .catch(function(error){
            LogManager.LogError(`Error on ${className}.insert: ${error}`);
            deferred.resolve({ success: false, errors: [ self.errors.insert ] });
        });
        return deferred.promise;
    }
    update(item){
        let self=this;
        let className = self.constructor.name;
        let deferred = Q.defer();

        self.fetch(item._id)
        .then(function(resultFetch){
            if(resultFetch && resultFetch.success) {
                self.prepare(resultFetch.data, item)
                .then(function(resultPrepare){
                    if(resultPrepare && resultPrepare.success){
                        self.performUpdate(resultPrepare.data)
                        .then(function(resultPerform){ 
                            if(resultPerform && resultPerform.success) {
                                self.updateExternalEntities(resultPerform.data)
                                .then(function(resultExternalUpdate){
                                    if(resultExternalUpdate && resultExternalUpdate.success) {
                                        deferred.resolve({ success: true, data: resultPerform.data });
                                    }else{
                                        LogManager.LogError(`Error on ${className}.update: ${error}`);
                                        deferred.resolve({ success: false, errors: [ self.errors.update ] });
                                    }
                                })
                                .catch(function(){
                                    LogManager.LogError(`Error on ${className}.update: ${error}`);
                                    deferred.resolve({ success: false, errors: [ self.errors.update ] });
                                });
                            }else{
                                LogManager.LogError(`Error on ${className}.update: ${error}`);
                                deferred.resolve({ success: false, errors: [ self.errors.update ] });
                            }               
                        })
                        .catch(function(){
                            LogManager.LogError(`Error on ${className}.update: ${error}`);
                            deferred.resolve({ success: false, errors: [ self.errors.update ] });
                        });
                    }else{
                    }
                })
                .catch(function(){
                    LogManager.LogError(`Error on ${className}.update: ${error}`);
                    deferred.resolve({ success: false, errors: [ self.errors.update ] });
                });
            }else{
                LogManager.LogError(`Error on ${className}.update: ${error}`);
                deferred.resolve({ success: false, errors: [ self.errors.update ] });
            }
        })
        .catch(function(){
            LogManager.LogError(`Error on ${className}.update: ${error}`);
            deferred.resolve({ success: false, errors: [ self.errors.update ] });
        });
        return deferred.promise;
    }
    delete(id){
        let self=this;
        let className = self.constructor.name;
        let deferred = Q.defer();
        self.repository.delete(id)
        .then(function(result){
            if(result && result.success) {
                self.repositoryList.delete(id)
                .then(function(resultList){
                    if(resultList && resultList.success)
                        LogManager.LogInfo(`${className} deleted the item ${ id }`);
                    else
                        LogManager.LogError(`Error on ${className}.delete`);
                    deferred.resolve(result);
                })
                .catch(function(error){
                    LogManager.LogError(`Error on ${className}.delete: ${error}`);
                    deferred.resolve({ success: false, errors: [ self.errors.delete ] });
                });
            }else{
                LogManager.LogError(`Error on ${className}.delete: ${error}`);
                deferred.resolve({ success: false, errors: [ self.errors.delete ] });
            }
        })
        .catch(function(error){
            LogManager.LogError(`Error on ${className}.delete: ${error}`);
            deferred.resolve({ success: false, errors: [ self.errors.delete ] });
        });
        return deferred.promise;
    }
}
module.exports = ListableItemService;