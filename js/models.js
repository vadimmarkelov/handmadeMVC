/**
 * Model for Cities
 * @param settings {
            data: citiesData, //use to init by darray of objects
            dataUrl: urlToJSON //use to init by data from URL
            columnCount: 3, //number of columns to be used
            callBack: function (){} //this would be called after model has been changed
        }
 * @return instance of Cities model
 */
function CitiesList (settings){
	var that=this; //local reference to instance of class
	var _data;
	var _columnCount=settings.columnCount || 3; //default number of columns is 3
	var _columns=[];
	var _callBack=settings.callBack || function (){}; //default callback function is empty

	var _sortByName=function (){
		_data.sort(function (a, b){
  			var aName = a.name.toLowerCase();
  			var bName = b.name.toLowerCase(); 
  			return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
		});
	};

	var _init=function () {
		_sortByName();
		_callBack.call(that);
	}

	/**
     * get all cities ...
     * @return the copy of array of cities
     */
     this.getCities=function(){return _data.slice();};
     
	/**
     * get data about one city
     * @param name string with name of city to search
     * @return the array of cities
     */
     this.getCity=function(name){
        return _data[that.searchBy('name',name)];
     };
     
	/**
     * get cities that has been distributed by the columns ...
     * @return the array of columns of cities
     */
     this.getColumns=function(){
     	var columns=[]	
     	var itemsInOneColumn=Math.ceil(_data.length / _columnCount);
     	for(var i=0; i<_columnCount; i++){
     		columns.push(_data.slice(i*itemsInOneColumn, (i+1)*itemsInOneColumn));
     	}
     	return columns;
     };

	/**
     * update model by new set of cities
     * @param newData array of cities
     * @return reference to intance of class (for chaining)
     */
     this.updateAll=function(newData){
     	_data=[].slice.call(newData); //make local copy of data
     	_init();
        return that;
     }


	/**
     * serach item by attribute
     * @param name string that define name of attribute
     * @param value string content of attribute
     * @return the index of item (-1 if no item has been found)
     */
     this.searchBy=function(name, value){
     	var result=-1;
     	for(var i=0, len=_data.length; i<len; i++){
     		if(_data[i][name]==value){
     			result=i;
     			break;
     		}
     	}
     	return result;
     }

	/**
     * update one item in the model (one that have the same name)
     * @param itemData object with data about one city
     * @return reference to intance of class (for chaining)
     */
     this.update=function(itemData){
     	if(itemData.count<1) {
     		that.remove(itemData);
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
     }

	/**
     * insert new city to the model
     * @param itemData object with data about one city
     * @return reference to intance of class (for chaining)
     */
     this.insert=function(itemData){
     	var indexToUpdate=that.searchBy('name', itemData.name);
     	if(indexToUpdate<0){
     		_data.push(itemData);
     		_init();
     	} else {
    		that.update(itemData);
     	}
     	return that;
     }

	/**
     * remove one city from the model
     * @param itemData object with data about one city
     * @return reference to intance of class (for chaining)
     */
     this.remove=function(itemData){
     	var indexToUpdate=that.searchBy('name', itemData.name);
     	if(indexToUpdate>-1){
    		_data.splice(indexToUpdate,1);
     		_init();
     	}
     	return that;
     }

	//constructor
	if(settings.data) {//use data as is
		_data=[].slice.call(settings.data); //make local copy of data
		_init();
	} else {//load data from URL
		$.ajax({
            cache: false,
            dataType: "json",
            url: settings.dataUrl,
            method: "GET",
            success: function(response){
                _data=response;
                console.log(_data);
                _init();
            },
            error: function(jqXHR, exception, errorThrown){
                //throwError('Data load has been failed!</h2> <h2>Error details: ('+jqXHR.status+') '+errorThrown)
            }
		});
	}

}
