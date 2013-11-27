/** markelov.vadim@gmail.com
 * Controller for Cities
 * @param parentElement is a jQuery reference to DOM element with view for Cities
 * @return instance of Cities controller
 */
function CitiesView(parentElement){
	var _parent=parentElement || $('body'); //default parent element is a <body>
	var _details=_parent.find('.details'); //reference to details area
	var _cities=null;
	var _prevSelectedName="";

	/**
	 * Format counter values to be two digits minimum (for example 3 -> 03)
	 * @param x counter value to format
	 * @return string that represent formatted value of counter
	 */
	var _formatCounter=function(x){
		var prefix="";
		if(Math.abs(x)<10) prefix="0";
		return prefix+x;
	}

	/**
	 * used to get details about clicked City and highlight item in list
	 */
	var clickHandler=function(e){
		var name=$(this).attr('href').split('#')[1];
		var detailsContent=_cities.getCity(name).content;
		_details.html(detailsContent);
		$('.cities .city[href="#'+_prevSelectedName+'"]').removeClass('selected');
		_prevSelectedName=name;
		$(this).addClass('selected');
	};

	/**
	 * Display cities
	 * @param cities array of columns of cities to display
	 */
	this.showCities=function(cities){
		_cities=cities; //save reference to Cities model
		var columns=_cities.getColumns(); //get cities that has bee distributed by columns
		var newCitiesList=$('<div class="cities"></div>'); //prepare cotainer for columns
		for(var i=0,ilen=columns.length; i<ilen; i++){
			var columnElement=$('<div class="column size1to'+ilen+'"></div>').appendTo(newCitiesList); //prepare column for items
			for(var t=0, tlen=columns[i].length; t<tlen; t++){ //fill the columns dy cities
				var cityElement=$('<a class="city" href="#'+columns[i][t].name+'"><span class="name">'+columns[i][t].name+'</span><span class="counter">('+_formatCounter(columns[i][t].count)+')</span></>').appendTo(columnElement);
			}
		}
		_parent.find('.cities').replaceWith(newCitiesList); //put Cities list to the DOM
		_details.html('Please, select City to get more info.'); //display hint text for user
		$('.cities .city[href="#'+_prevSelectedName+'"]').trigger('click'); //select City if it was selected before model has been updated
	};

	//init
	_details.html('Loading...'); //display loading notification if data load take some time to wait (AJAX load)
	_parent.delegate("a","click", clickHandler) //attach mouse click handler to the list of cities

}