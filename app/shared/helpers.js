(function(Handlebars){

//incremental helper for pagination
Handlebars.registerHelper('plus1', function(value) {
  return value+1;
});

//equality comparator for values in template
Handlebars.registerHelper('IfEqual', function(v1, v2, options) {
  if(v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

//check if value undefined
Handlebars.registerHelper('IfUndefined', function(v, options) {
  if( typeof v === 'undefined') {
    return options.fn(this);
  }
  return options.inverse(this);
});

Handlebars.registerHelper('times', function(n, block) {
    var accum = '';
    for(var i = 0; i < n; ++i) {
        accum += block.fn(i);     
    }
    return accum;
});

})(Handlebars);