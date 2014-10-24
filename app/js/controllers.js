(function(){

function ListController(model, view){

	model.subscribe({
		update: function(){
			view.render(model);
		}
	});

	qs('#newItem').onsubmit=function(){
			var textElement=qs('[name=name]');
			if(textElement.value) {
				model.add(textElement.value);
			}
			textElement.value='';
			return false;
	};

	$live('.remove', 'click', 
		function(){
			var index=this.getAttribute('data-index');
			model.remove(index);
	});

	view.render(model);

}

window.ListController = ListController;

})();