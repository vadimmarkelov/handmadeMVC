(function(Handlebars){

//View for UI of all reviews
var ReviewView = function (target, template) {

    this.target = target;
    this.template = Handlebars.compile(template);

};

//render model data and put to UI
ReviewView.prototype = {
    render: function (model) {
        var context = {
            items: model.getPageItems(),
            currentPage: model.get('page'),
            pageRef: new Array(model.getPageCount()),
            order: model.get('orderDirection')
        };
        this.target.html(this.template(context));
    }
};

window.ReviewView = ReviewView; //export to global namespace

})(Handlebars);