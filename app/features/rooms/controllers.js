(function($){

function RoomController(model, view){

	model.subscribe({ //update UI in case of changes in model data
		update: function(){
			view.render(model);
		}
	});
	
	//backward data binding for selected room count
	$(view.target).delegate('select', 'change', function(){
		model.getByIndex($(this).data('index')).set('count',parseInt($(this).val()));
	});

	//ordering by columns click listener
	$(view.target).delegate('.sortable', 'click', function(){
		model.set('orderField',$(this).data('sortableBy'));
		model.set('orderDirection',!model.get('orderDirection'));
		model.orderBy(model.get('orderField'),model.get('orderDirection'));
	});

	//just to close the gap
	$(view.target).delegate('form', 'submit', function(){
		window.alert('Please visit some real website for accomodation booking ;)');
		return false;
	});

	view.render(model); //initial rendering

}

window.RoomController = RoomController;

})(jQuery);