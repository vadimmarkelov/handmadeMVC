(function(){

//for prototypal inheritance
var extendObj = function(childObj, parentObj) {
    var TmpObj = function () {};
    TmpObj.prototype = parentObj.prototype;
    childObj.prototype = new TmpObj();
    childObj.prototype.constructor = childObj;
};

/////////////////////////////
//this is for adding observabily to object
//when subscribe you should pass object with definition for specific events (update, create, remove)
var Observable = function(){};
Observable.prototype = {
    subscribe: function(obj) {
        if(!this._handlers) {
            this._handlers=[];
        }
        this._handlers.push(obj);
    },
    unsubscribe: function(obj) {
        if(!this._handlers) {
            this._handlers=[];
        }
        for( var i = 0, len = this._handlers.length; i < len; i++ ) {
          if( this._handlers[i] === obj ) {
            this._handlers.splice( i, 1 );
            return true;
          }
        }
    return false;
    },
    notify: function(eventType, thisObj) {
        if(!this._handlers) {
            this._handlers=[];
        }
        var args = Array.prototype.slice.call( arguments, 2);
        for( var i = 0, len = this._handlers.length; i < len; i++ ) {
          if(this._handlers[i][eventType]){
            this._handlers[i][eventType].apply( thisObj, args );
          }
        }
        if(this.parent) { //bubble notification to parents
          this.parent.notify(eventType, this.parent);
        }
    }
};

//////////////////////////////////////
//Basic Model with gettter and setters
var Model = function(initData){
    this.create(initData);
};

extendObj(Model, Observable); //make it observable

Model.prototype.get = function(propName){
        return this[propName];
    };
Model.prototype.set = function(propName, value){
        var changed = (value !== this[propName]);
        this[propName]=value;
        if (changed) {
            this.notify('update', this); //notify subscribers about update
        }
    };
Model.prototype.create = function(obj){
        for(var i in obj){
            if(obj.hasOwnProperty(i)) {
                this[i]=obj[i];
            }
        }
        this.notify('create', this); //notify subscribers about create
    };
Model.prototype.remove = function(){
        this.notify('remove', this); //just a gateway to send remove notification
    };


window.OOP = {
    Observable: Observable,
    Model: Model,
    extendObj: extendObj
};


})();