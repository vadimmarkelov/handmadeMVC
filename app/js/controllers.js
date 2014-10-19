(function($){
/** 
 * Controller for Items List
 * @param parentElement is a jQuery reference to DOM element with view for items
 * @return instance of Items controller
 */
function ListView(parentElement){
	var _parent=parentElement || $('body'); //default parent element is a <body>
	var _items=null;
	
	/**
	 * Click handler in list
	 */
	var clickHandler=function(){
		var name=$(this).attr('data-item-name');
		_items.remove({name: name});
	};

	/**
	 * Display items
	 * @param items array display
	 */
	this.showItems=function(items){
		_items=items; //save reference to Cities model
		var newItemsList=$('<div class="listItems"></div>'); //prepare cotainer for columns
		var itemArray=_items.getItems();
		var tlen=items.getCount();
		for(var t=0; t<tlen; t++){
			$('<div class="item"><span class="name">'+itemArray[t].name+'</span> <input type="button" value="Remove" data-item-name="'+itemArray[t].name+'"/> </div>').appendTo(newItemsList);
		}
		$('<div>'+tlen+' item'+(tlen!==1?'s':'')+' in list</div>').appendTo(newItemsList);
		_parent.find('.listItems').replaceWith(newItemsList); //put Items list to the DOM
	};

	//init
	_parent.delegate('input','click', clickHandler); //attach mouse click handler to the list of items

}

window.ListView = ListView;

})(jQuery);