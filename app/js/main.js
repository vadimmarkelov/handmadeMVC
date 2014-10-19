$(function(){
		var items=new ItemsList({
			data: [ //initial data
					{name: 'Carrots'}, 
					{name: 'Pears'},
					{name: 'Fish'},
					{name: 'Milk'},
					{name: 'Bread'}
				  ], 
			//dataUrl: "data/items.json", //use it to get data by AJAX call,
			view: new ListView($('#placeForListItems'))
		});

		$('#newItem').submit(function(){
			var nameElement=$(this).find('[name=name]')[0];
			items.insert({name: nameElement.value});
			nameElement.value='';
			return false;
		});

		//put reference for items list model and controller to global scope
		window.items=items;

		//examples of operations with model
		//items.insert({name:'aaa'});
		//items.insert({name:'ccc'}).insert({name:'bbb'}).remove({name: 'aaa'}); //chaining
	});