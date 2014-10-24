(function(){

var ListView = function (target) {

    this.target = target;

};

ListView.prototype = {
    render: function (model) {
        var html = '';
        model.items.forEach(function(item, index) {
            html += '<div class="item"><span class="name">'+item.get('text')+'</span> <input class="remove" type="button" value="Remove" data-index="'+index+'"/> </div>';
        });
        var count = model.get('count');
        html += '<div>'+count+' item'+(count!==1?'s':'')+' in list</div>';
        this.target.innerHTML = html;
    }
};

window.ListView = ListView;

})();