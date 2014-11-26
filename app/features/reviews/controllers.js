(function($){

function ReviewController(model, view){

	model.subscribe({ //update UI in case of changes in model data
		update: function(){
			view.render(model);
		}
	});
	
	//pagination click listener
	$(view.target).delegate('li', 'click', function(){
		model.set('page',$(this).data('pageIndex'));
	});

	//ordering by Score click listener
	$(view.target).delegate('h2', 'click', function(){
		model.set('orderDirection',!model.get('orderDirection'));
		model.orderBy('score',model.get('orderDirection'));
	});

	view.render(model); //initial rendering

}

window.ReviewController = ReviewController;

})(jQuery);