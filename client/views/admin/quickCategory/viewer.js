Template.quickCatView.category = function(){
  var id = Router.current().params['id'];
  Session.set('operatedQuickCat', id);
  return Quickcategories.find({_id : id});
}

Template.quickCatOperation.templateHolder = function(){
  var operation = Session.get('quickCatOperation');
  switch(operation){
    case('edit'):
      return Template['quickCatForm'];
      break;
    default:
      return null;
      break;
  }
}

////////////////////Created
Template.quickCatView.created = function(){
  Session.set('formState',null);
  Session.set('quickCatOperation', null);
  Session.set('operatedQuickCat', null);
}

/////////////////////Rendered
Template.quickCatView.rendered = function(){
  $('.form').hide();
  $('#veil').hide();
  $('div#itemOperation').hide();
}

////////////////////Destroyed
Template.quickCatView.destroyed = function(){
  Session.set('formState',null);
  Session.set('quickCatOperation', null);
  Session.set('operatedQuickCat', null);
}

/////////////////////Events
Template.quickCatView.events = {
  'click button#deleteButton' : function(event){
    var id = Session.get('operatedQuickCat');
    $('#veil').show();
    if(confirm('Delete this category?')){
      Quickcategories.remove({_id : id});
      window.close();
    }else{
      $('#veil').hide();
    }
  },

  'click button#editButton' : function(event){
    Session.set('formState','edit');
    Session.set('quickCatOperation','edit');
    $('div#itemOperation').css('z-index','3');
    $('#veil').show();
    $('div#itemOperation').show();
  }
}
