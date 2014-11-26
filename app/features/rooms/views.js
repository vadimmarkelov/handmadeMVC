(function(Handlebars){

//View for UI of all rooms
var RoomView = function (target, template) {

    this.target = target;
    this.template = Handlebars.compile(template);

};

//render model data and put to UI
RoomView.prototype = {
    render: function (model) {
        var context = {
            rooms: model.get('items'),
            totalRooms: model.get('totalRooms'),
            totalPeople: model.get('totalPeople'),
            totalPrice: model.get('totalPrice').toFixed(2),
            orderField: model.get('orderField'),
            orderDirection: model.get('orderDirection')
        };
        this.target.html(this.template(context));
    }
};

window.RoomView = RoomView; //export to global namespace

})(Handlebars);