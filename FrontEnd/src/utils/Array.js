const _ = require("lodash");

module.exports = class ArrayUtils {
    static isEqual(a, b){
        if(!(Array.isArray(a) && Array.isArray(b) && (a.length === b.length))) return false;
        for(let index in a){
            if(! _.isEqual(a[index], b[index])) 
                return false;
        }
        return true;
    }
};