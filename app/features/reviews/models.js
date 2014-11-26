(function(OOP){
////////////////////////////
// This is one item in the  reviews list.
var ReviewItem = function(score, text, user, parent){
    this.create({ //it use method from basic model to create itself
        parent: parent,
        score: score,
        text: text,
        user: user
    });
};

OOP.extendObj(ReviewItem, OOP.Model); //list item shoud behave like regular model


//////////////////////////////
//This is the collection of reviews
var ReviewList = function(data){
    this.items = [];

    for(var i in data){
        this.add(data[i]); //put items in collection
    }

    this.create({
        count: data.length,
        itemsOnPage: 5,
        page: 0
    }); //init inself by params. it use basic model method to create itself.

    this.subscribe({
        update: function(){ //subscribe for notifications about changes inside collection (add, remove, etc.)
            this.set('count', this.items.length); //make shure to know exact count of items
        }
    });
};

OOP.extendObj(ReviewList, OOP.Model); //List of items should behave like regular model

ReviewList.prototype.add = function(obj){ //method for adding new item to list
        this.items.push(new ReviewItem(obj.score, obj.text, obj.user, this)); 
        this.notify('update', this);
    };
ReviewList.prototype.remove = function(index){ //method to remove
        this.items[index].remove(); //ask model to remove
        this.items.splice(index,1); //remove reference to it
        this.notify('update', this);
    };

ReviewList.prototype.orderBy = function(fieldName, direction){ //method to reorder items
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

ReviewList.prototype.getPageItems = function(){ //method to get items for the page
        var i = this.page;
        return this.items.slice(i*this.itemsOnPage, (i+1)*this.itemsOnPage);
    };

ReviewList.prototype.getPageCount = function(){ //method to get count of pages
        return Math.ceil(this.items.length / this.itemsOnPage);
    };

window.ReviewList = ReviewList;

})(OOP);