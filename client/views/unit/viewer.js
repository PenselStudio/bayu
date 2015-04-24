Template.unitView.unit = function(){
  var id = Router.current().params['id'];
  Session.set('operatedUnit', id);
  return Units.find({_id : id});
}

Template.unitOperation.templateHolder = function(){
  var operation = Session.get('unitOperation');
  switch(operation){
    case('edit'):
      return Template['unitForm'];
      break;
    default:
      return null;
      break;
  }
}

////////////////////Created
Template.unitView.created = function(){
  Session.set('formState',null);
  Session.set('unitOperation', null);
  Session.set('operatedUnit', null);
}

/////////////////////Rendered
Template.unitView.rendered = function(){
  $('.form').hide();
  $('#veil').hide();
  $('div#itemOperation').hide();
}

////////////////////Destroyed
Template.unitView.destroyed = function(){
  Session.set('formState',null);
  Session.set('unitOperation', null);
  Session.set('operatedUnit', null);
}

/////////////////////Events
Template.unitView.events = {
  'click button#deleteButton' : function(event){
    var id = Session.get('operatedUnit');
    $('#veil').show();
    if(confirm('Delete this category?')){
      Units.remove({_id : id});
      window.close();
    }else{
      $('#veil').hide();
    }
  },

  'click button#editButton' : function(event){
    Session.set('formState','edit');
    Session.set('unitOperation','edit');
    $('div#itemOperation').css('z-index','3');
    $('#veil').show();
    $('div#itemOperation').show();
  }
}
