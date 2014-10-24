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
          this._handlers[i][eventType].apply( thisObj, args );
          if(this.parent) { //bubble notification to parents
            this.parent.notify(eventType, thisObj);
          }
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


////////////////////////////
// This is one item in the list.
var ListItem = function(itemText, parent){
    this.create({ //it use method from basic model to create itself
        parent: parent,
        text: itemText,
    });
};

extendObj(ListItem, Model); //list item shoud behave like regular model


//////////////////////////////
//This is the collection of items
var List = function(){
    var args = Array.prototype.slice.call( arguments, 0); //fill collection by items from params
    this.items = [];

    for(var i in args){
        this.add(args[i]); //put items in collection
    }

    this.create({count: args.length}); //init inself by params. it use basic model method to create itself.

    this.subscribe({
        update: function(){ //subscribe for notifications about changes inside collection (add, remove, etc.)
            this.set('count', this.items.length); //make shure to know exact count of items
        }
    });
};

extendObj(List, Model); //List of items should behave like regular model

List.prototype.add = function(itemText){ //method for adding new item to list
        this.items.push(new ListItem(itemText, this)); 
        this.notify('update', this);
    };
List.prototype.remove = function(index){ //method to remove
        this.items[index].remove(); //ask model to remove
        this.items.splice(index,1); //remove reference to it
        this.notify('update', this);
    };

window.List = List;
})();