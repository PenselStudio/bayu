Template.supplierView.supplier = function(){
  var id = Router.current().params['id'];
  Session.set('operatedSupplier', id);
  return Suppliers.find({_id : id});
}

Template.supplierOperation.templateHolder = function(){
  var operation = Session.get('supplierOperation');
  switch(operation){
    case('edit'):
      return Template['supplierForm'];
      break;
    default:
      return null;
      break;
  }
}

////////////////////Created
Template.supplierView.created = function(){
  Session.set('formState',null);
  Session.set('supplierOperation', null);
  Session.set('operatedSupplier', null);
}

/////////////////////Rendered
Template.supplierView.rendered = function(){
  $('.form').hide();
  $('#veil').hide();
  $('div#itemOperation').hide();
}

////////////////////Destroyed
Template.supplierView.destroyed = function(){
  Session.set('formState',null);
  Session.set('supplierOperation', null);
  Session.set('operatedSupplier', null);
}

/////////////////////Events
Template.supplierView.events = {
  'click button#deleteButton' : function(event){
    var id = Session.get('operatedSupplier');
    $('#veil').show();
    if(confirm('Delete this supplier?')){
      Suppliers.remove({_id : id});
      window.close();
    }else{
      $('#veil').hide();
    }
  },

  'click button#editButton' : function(event){
    Session.set('formState','edit');
    Session.set('supplierOperation','edit');
    $('div#itemOperation').css('z-index','3');
    $('#veil').show();
    $('div#itemOperation').show();
  }
}
