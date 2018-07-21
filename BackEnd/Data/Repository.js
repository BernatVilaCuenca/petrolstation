const Q = require('q');

class Repository{
    constructor(model, errors){
        this.model = model;
        this.errors = errors;
    }
    getAll(query){
        var deferred = Q.defer();
        this.model.find(query, function(error, result){	
            if(error){
                deferred.resolve({ success: false, errors: [ errors.getAll ]});
            }else{
                deferred.resolve({ success: true, data: result });
            }
        });
        return deferred.promise;
    }
    getOne(id){
        var deferred = Q.defer();
        this.model.findById(id, function(error, result){	
            if(error){
                deferred.resolve({ success: false, errors: [ errors.getOne ]});
            }else{
                deferred.resolve({ success: true, data: result });
            }
        });
        return deferred.promise;
    }
    insert(item){
        var newItem = new this.model();        
        Object.assign(newItem, item);
        delete newItem._id;
        
        var deferred = Q.defer();
        newItem.save(function(error){	
            if(error){
                deferred.resolve({ success: false, errors: [ errors.insert ]});
            }else{
                deferred.resolve({ success: true, data: newItem });
            }
        });
        return deferred.promise;
    }
    update(item){
        var deferred = Q.defer();
        console.log(item._id);
        this.model.findById(item._id, function(errorOnFetch, result){	
            if(errorOnFetch){
                deferred.resolve({ success: false, errors: [ errors.getOne ]});
            }else{
                var itemToUpdate = Object.assign(result, item);
                itemToUpdate.save(function(errorSave){	
                    if(errorSave){
                        deferred.resolve({ success: false, errors: [ errors.update ]});
                    }else{
                        deferred.resolve({ success: true, data: itemToUpdate });
                    }
                });
            }
        });
        return deferred.promise;
    }
    delete(id){
        var deferred = Q.defer();
        this.model.findById(id, function(errorOnFetch, itemToDelete){	
            if(errorOnFetch){
                deferred.resolve({ success: false, errors: [ errors.getOne ]});
            }else{
                itemToDelete.remove(function(errorOnDelete){	
                    if(errorOnDelete){
                        deferred.resolve({ success: false, errors: [ errors.delete ]});
                    }else{
                        deferred.resolve({ success: true, data: itemToDelete });
                    }
                });
            }
        });
        return deferred.promise;
    }
}
module.exports = Repository;