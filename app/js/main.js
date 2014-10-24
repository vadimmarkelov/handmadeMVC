$on(window, 'load', function(){
	var listModel = new List('Carrots', 'Pears', 'Fish', 'Milk', 'Bread');
	var listView = new ListView(qs('.listItems'));
	var listController = new ListController(listModel, listView);
});