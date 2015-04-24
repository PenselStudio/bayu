Template.quickNoteView.note = function(){
  var id = Router.current().params['id'];
  Session.set('operatedQuickNote', id);
  return Quicknotes.find({_id : id});
}

Template.quickNoteOperation.templateHolder = function(){
  var operation = Session.get('quickNoteOperation');
  switch(operation){
    case('edit'):
      return Template['quickNoteForm'];
      break;
    default:
      return null;
      break;
  }
}

////////////////////Created
Template.quickNoteView.created = function(){
  Session.set('formState',null);
  Session.set('quickNoteOperation', null);
  Session.set('operatedQuickNote', null);
}

/////////////////////Rendered
Template.quickNoteView.rendered = function(){
  $('.form').hide();
  $('#veil').hide();
  $('div#itemOperation').hide();
}

////////////////////Destroyed
Template.quickNoteView.destroyed = function(){
  Session.set('formState',null);
  Session.set('quickNoteOperation', null);
  Session.set('operatedQuickNote', null);
}

/////////////////////Events
Template.quickNoteView.events = {
  'click button#deleteButton' : function(event){
    var id = Session.get('operatedQuickNote');
    $('#veil').show();
    if(confirm('Delete this quick note?')){
      Quicknotes.remove({_id : id});
      window.close();
    }else{
      $('#veil').hide();
    }
  },

  'click button#editButton' : function(event){
    Session.set('formState','edit');
    Session.set('quickNoteOperation','edit');
    $('div#itemOperation').css('z-index','3');
    $('#veil').show();
    $('div#itemOperation').show();
  }
}
