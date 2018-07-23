var EventEmitter2 = require('eventemitter2').EventEmitter2;

class EventManager {
    constructor(){   
        this.instance = new EventEmitter2();
    }
    emit(event, data){
        this.instance.emit(event, data);
    }
    on(event, callBack){
        this.instance.on(event, callBack);
    }
}
module.exports = EventManager;