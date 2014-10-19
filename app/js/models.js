(function($){
/**
 * Model for Items
 * @param settings {
            data: itemsData, //use to init by darray of objects
            dataUrl: urlToJSON //use to init by data from URL
            callBack: function (){} //this would be called after model has been changed
        }
 * @return instance of ItemsList model
 */
function ItemsList (settings){
	var that=this; //local reference to instance of class
	var _data;
	var _view=settings.view || null; //default view is empty

    var _filter=function (itemData) {
        if(itemData.hasOwnProperty('name')) {
            itemData['name']=$.trim(itemData['name']);
        }
    };

    var _valid=function (itemData) {
        if(!itemData.hasOwnProperty('name')) {
            return false;
        }
        if(itemData['name']==='') {
            return false;
        }
        return true;
    };

    var _sortByName=function (){
		_data.sort(function (a, b){
  			var aName = a.name.toLowerCase();
  			var bName = b.name.toLowerCase(); 
  			return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
		});
	};

	var _init=function () {
		_sortByName();
		if(_view){
            _view.showItems(that);//trigger view to display the items
        }
	};

    /**
     * get items count ...
     * @return the count of items in list
     */
     this.getCount=function(){return _data.length;};
     
    /**
     * get all items ...
     * @return the copy of array of items
     */
     this.getItems=function(){return _data.slice();};
     
	/**
     * get data about one item
     * @param name string with name of item to search
     * @return the array of items
     */
     this.getItem=function(name){
        return _data[that.searchBy('name',name)];
     };
     
	/**
     * update model by new set of items
     * @param newData array of items
     * @return reference to intance of class (for chaining)
     */
     this.updateAll=function(newData){
     	_data=[].slice.call(newData); //make local copy of data
     	_init();
        return that;
     };


	/**
     * serach item by attribute
     * @param name string that define name of attribute
     * @param value string content of attribute
     * @return the index of item (-1 if no item has been found)
     */
     this.searchBy=function(name, value){
     	var result=-1;
     	for(var i=0, len=_data.length; i<len; i++){
     		if(_data[i][name]===value){
     			result=i;
     			break;
     		}
     	}
     	return result;
     };

	/**
     * update one item in the model (one that have the same name)
     * @param itemData object with data about one item
     * @return reference to intance of class (for chaining)
     */
     this.update=function(itemData){
        _filter(itemData);
        if(!_valid(itemData)) {
            return that;
        }
     	var indexToUpdate=that.searchBy('name', itemData.name);
     	if(indexToUpdate>-1){
     		_data[indexToUpdate]=itemData;
     		_init();
     	} else {
    		that.insert(itemData);
     	}
     	return that;
     };

	/**
     * insert new item to the model
     * @param itemData object with data about one item
     * @return reference to intance of class (for chaining)
     */
     this.insert=function(itemData){
        _filter(itemData);
        if(!_valid(itemData)) {
            return that;
        }
     	var indexToUpdate=that.searchBy('name', itemData.name);
     	if(indexToUpdate<0){
     		_data.push(itemData);
     		_init();
     	} else {
    		that.update(itemData);
     	}
     	return that;
     };

	/**
     * remove one item from the model
     * @param itemData object with data about one item
     * @return reference to intance of class (for chaining)
     */
     this.remove=function(itemData){
     	var indexToUpdate=that.searchBy('name', itemData.name);
     	if(indexToUpdate>-1){
    		_data.splice(indexToUpdate,1);
     		_init();
     	}
     	return that;
     };

	//constructor
	if(settings.data) {//use data as is
		_data=[].slice.call(settings.data); //make local copy of data
		_init();
	   } else {//load data from URL
		$.ajax({
            cache: false,
            dataType: 'json',
            url: settings.dataUrl,
            method: 'GET',
            success: function(response){
                _data=response;
                _init();
            },
            error: function(jqXHR, exception, errorThrown){
                console.log('Data load has been failed!</h2> <h2>Error details: ('+jqXHR.status+') '+errorThrown);
            }
		});
	}

}

window.ItemsList = ItemsList;

})(jQuery);