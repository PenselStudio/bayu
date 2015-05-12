Template.deviceView.device = function(){
  var id = Router.current().params['id'];
  Session.set('operatedDevice', id);
  return Devices.find({_id : id});
}

Template.deviceOperation.templateHolder = function(){
  var operation = Session.get('deviceOperation');
  switch(operation){
    case('edit'):
      return Template['deviceForm'];
      break;
    default:
      return null;
      break;
  }
}

////////////////////Created
Template.deviceView.created = function(){
  Session.set('formState',null);
  Session.set('deviceOperation', null);
  Session.set('operatedDevice', null);
}

/////////////////////Rendered
Template.deviceView.rendered = function(){
  $('.form').hide();
  $('#veil').hide();
  $('div#itemOperation').hide();
}

////////////////////Destroyed
Template.deviceView.destroyed = function(){
  Session.set('formState',null);
  Session.set('deviceOperation', null);
  Session.set('operatedDevice', null);
}

/////////////////////Events
Template.deviceView.events = {
  'click button#deleteButton' : function(event){
    var id = Session.get('operatedDevice');
    $('#veil').show();
    if(confirm('Delete this category?')){
      Devices.remove({_id : id});
      window.close();
    }else{
      $('#veil').hide();
    }
  },

  'click button#editButton' : function(event){
    Session.set('formState','edit');
    Session.set('deviceOperation','edit');
    $('div#itemOperation').css('z-index','3');
    $('#veil').show();
    $('div#itemOperation').show();
  }
}
