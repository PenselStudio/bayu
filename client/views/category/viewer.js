Template.categoryView.category = function(){
  var id = Router.current().params['id'];
  Session.set('operatedCategory', id);
  return Categories.find({_id : id});
}

Template.categoryOperation.templateHolder = function(){
  var operation = Session.get('categoryOperation');
  switch(operation){
    case('edit'):
      return Template['categoryForm'];
      break;
    default:
      return null;
      break;
  }
}

////////////////////Created
Template.categoryView.created = function(){
  Session.set('formState',null);
  Session.set('categoryOperation', null);
  Session.set('operatedCategory', null);
}

/////////////////////Rendered
Template.categoryView.rendered = function(){
  $('.form').hide();
  $('#veil').hide();
  $('div#itemOperation').hide();
}

////////////////////Destroyed
Template.categoryView.destroyed = function(){
  Session.set('formState',null);
  Session.set('categoryOperation', null);
  Session.set('operatedCategory', null);
}

/////////////////////Events
Template.categoryView.events = {
  'click button#deleteButton' : function(event){
    var id = Session.get('operatedCategory');
    $('#veil').show();
    if(confirm('Delete this category?')){
      Categories.remove({_id : id});
      window.close();
    }else{
      $('#veil').hide();
    }
  },

  'click button#editButton' : function(event){
    Session.set('formState','edit');
    Session.set('categoryOperation','edit');
    $('div#itemOperation').css('z-index','3');
    $('#veil').show();
    $('div#itemOperation').show();
  }
}
