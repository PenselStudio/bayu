Template.salesView.sale = function(){
  var id = Router.current().params['id'];
  Session.set('operatedItem', id);
  return Sales.find({_id : id});
}


/////////////////////Rendered
Template.salesView.rendered = function(){
  $('.form').hide();
  $('#veil').hide();
  $('div#itemOperation').hide();
}
