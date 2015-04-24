Template.taxView.tax = function(){
  var id = Router.current().params['id'];
  Session.set('operatedTax', id);
  return Taxes.find({_id : id});
}

Template.taxOperation.templateHolder = function(){
  var operation = Session.get('taxOperation');
  switch(operation){
    case('edit'):
      return Template['taxForm'];
      break;
    default:
      return null;
      break;
  }
}

////////////////////Created
Template.taxView.created = function(){
  Session.set('formState',null);
  Session.set('taxOperation', null);
  Session.set('operatedTax', null);
}

/////////////////////Rendered
Template.taxView.rendered = function(){
  $('.form').hide();
  $('#veil').hide();
  $('div#itemOperation').hide();
}

////////////////////Destroyed
Template.taxView.destroyed = function(){
  Session.set('formState',null);
  Session.set('taxOperation', null);
  Session.set('operatedTax', null);
}

/////////////////////Events
Template.taxView.events = {
  'click button#deleteButton' : function(event){
    var id = Session.get('operatedTax');
    $('#veil').show();
    if(confirm('Delete this tax?')){
      Taxes.remove({_id : id});
      window.close();
    }else{
      $('#veil').hide();
    }
  },

  'click button#editButton' : function(event){
    Session.set('formState','edit');
    Session.set('taxOperation','edit');
    $('div#itemOperation').css('z-index','3');
    $('#veil').show();
    $('div#itemOperation').show();
  }
}
