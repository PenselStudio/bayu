Template.quickButtonView.button = function(){
  var id = Router.current().params['id'];
  Session.set('operatedQuickButton', id);
  return Quickbuttons.find({_id : id});
}

Template.quickButtonOperation.templateHolder = function(){
  var operation = Session.get('quickButtonOperation');
  switch(operation){
    case('edit'):
      return Template['quickButtonForm'];
      break;
    default:
      return null;
      break;
  }
}

////////////////////Created
Template.quickButtonView.created = function(){
  Session.set('formState',null);
  Session.set('quickButtonOperation', null);
  Session.set('operatedQuickButton', null);
}

/////////////////////Rendered
Template.quickButtonView.rendered = function(){
  $('.form').hide();
  $('#veil').hide();
  $('div#itemOperation').hide();
}

////////////////////Destroyed
Template.quickButtonView.destroyed = function(){
  Session.set('formState',null);
  Session.set('quickButtonOperation', null);
  Session.set('operatedQuickButton', null);
}

/////////////////////Events
Template.quickButtonView.events = {
  'click button#deleteButton' : function(event){
    var id = Session.get('operatedQuickButton');
    $('#veil').show();
    if(confirm('Delete this category?')){
      Quickbuttons.remove({_id : id});
      window.close();
    }else{
      $('#veil').hide();
    }
  },

  'click button#editButton' : function(event){
    Session.set('formState','edit');
    Session.set('quickButtonOperation','edit');
    $('div#itemOperation').css('z-index','3');
    $('#veil').show();
    $('div#itemOperation').show();
  }
}
