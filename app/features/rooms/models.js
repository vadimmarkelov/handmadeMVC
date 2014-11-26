(function(OOP){
////////////////////////////
// This is one item in the  reviews list.
var RoomItem = function(name, occupancy, price, count, maxCount, parent){
    this.create({ //it use method from basic model to create itself
        parent: parent,
        name: name,
        occupancy: occupancy,
        price: price,
        count: count,
        maxCount: maxCount 
    });
};

OOP.extendObj(RoomItem, OOP.Model); //list item shoud behave like regular model


//////////////////////////////
//This is the collection of reviews
var RoomList = function(data){
    this.items = [];

    this.create({
        count: data.length,
        totalRooms: 0,
        totalPeople: 0,
        totalPrice: 0,
        orderField: undefined,
        orderDirection: undefined
    }); //init inself by params. it use basic model method to create itself.

    this.subscribe({
        update: function(){ //subscribe for notifications about changes inside collection (add, remove, etc.)
            this.set('count', this.items.length); //make shure to know exact count of items
            this.set('totalPrice',this.items.reduce(function(memo, item){ //recalculate total price of selected rooms
                return memo + item.get('price') * item.get('count');
            },0)); 
            this.set('totalPeople',this.items.reduce(function(memo, item){ //recalculate total occupancy of selected rooms
                return memo + item.get('occupancy') * item.get('count');
            },0)); 
            this.set('totalRooms',this.items.reduce(function(memo, item){ //recalculate total count of selected rooms
                return memo + item.get('count');
            },0)); 
        }
    });

    for(var i in data){
        this.add(data[i]); //put items in collection
    }

};

OOP.extendObj(RoomList, OOP.Model); //List of items should behave like regular model

RoomList.prototype.add = function(obj){ //method for adding new item to list
        this.items.push(new RoomItem(obj.name, obj.occupancy, obj.price, obj.count, obj.maxCount, this)); 
        this.notify('update', this);
    };

RoomList.prototype.remove = function(index){ //method to remove
        this.items[index].remove(); //ask model to remove
        this.items.splice(index,1); //remove reference to it
        this.notify('update', this);
    };

RoomList.prototype.getByIndex = function(index){ //method to get item by index
        return this.items[index];
    };

RoomList.prototype.orderBy = function(fieldName, direction){ //method to reorder items
        this.items.sort(function(a,b){
            var result = 0;
            if(a[fieldName]<b[fieldName]) {
                result=-1;
            }
            if(a[fieldName]>b[fieldName]) {
                result=1;
            }
            return result * (direction?1:-1);
        });

        this.notify('update', this);
    };

window.RoomList = RoomList;

})(OOP);