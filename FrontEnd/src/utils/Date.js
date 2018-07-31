module.exports = class DateUtils {
    static createDateFromFormattedString = function(value){
        var result = new Date();
        if(value && (/(\d){2}\/(\d){2}\/(\d){4}/.test(value))){
            var dateArray = value.split("/");
            result = new Date(
                parseInt(dateArray[2]), 
                parseInt(dateArray[1]) - 1, 
                parseInt(dateArray[0])
            );
        }
        return result;
    };
    static format = function(date){
        function pad(s) { return (s < 10) ? ['0', s].join('') : s; }
        var result = [pad(date.getDate()), pad(date.getMonth()+1), date.getFullYear()].join('/');
        return result;
    };
    static formatISODate = function(value){
        var self=this;
        var result = self.Format(new Date(value));
        return result;
    };
    static isValidDate = function(day, month, year){    
        if(day == 0 ){
            return false;
        }
        switch(month){
            case 1: case 3: case 5: case 7: case 8: case 10: case 12:
                if(day > 31)
                    return false;
                return true;
            case 2:
                if (year % 4 == 0)
                    if(day > 29){
                        return false;
                    }
                    else{
                        return true;
                    }
                if(day > 28){
                    return false;
                }
                return true;
            case 4: case 6: case 9: case 11:
                if(day > 30){
                    return false;
                }
                return true;
            default:
                return false;
        }
    };
};