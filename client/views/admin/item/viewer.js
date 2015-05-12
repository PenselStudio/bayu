Template.itemView.item = function(){
  var id = Router.current().params['id'];
  Session.set('operatedItem', id);
  return Items.find({_id : id});
}

Template.itemOperation.templateHolder = function(){
  var operation = Session.get('itemOperation');
  switch(operation){
    case('adjust'):
      return Template['adjustForm'];
      break;
    case('receive'):
      return Template['receiveForm'];
      break;
    case('edit'):
      return Template['itemForm'];
      break;
    case('quickButton'):
      return Template['quickButtonForm'];
      break;
    default:
      return null;
      break;
  }
}

/////////////////////Rendered
Template.itemView.rendered = function(){
  $('.form').hide();
  $('#veil').hide();
  $('div#itemOperation').hide();
}

/////////////////////Events
Template.itemView.events = {
  'click button#receiveButton' : function(event){
    Session.set('itemOperation','receive');
    $('div#itemOperation').css('z-index','3');
    $('#veil').show();
    $('div#itemOperation').show();
  },

  'click button#adjustButton' : function(event){
    if(Session.get('itemOperation') === 'adjust'){
      Session.set('itemOperation','');
    }

    Session.set('itemOperation','adjust');
    $('div#itemOperation').css('z-index','3');
    $('#veil').show();
    $('div#itemOperation').show();
  },

  'click button#quickButton' : function(event){
    //if(Session.get('itemOperation') === 'quickButton'){
    //  Session.set('itemOperation','');
    //}

    Session.set('itemOperation', 'quickButton');

    $('div#itemOperation').css('z-index','3');
    $('#veil').show();
    $('div#itemOperation').show();
  },

  'click button#deleteButton' : function(event){
    var id = Session.get('operatedItem');
    $('#veil').show();
    if(confirm('Delete this item?')){
      Items.remove({_id : id});
      window.close();
    }else{
      $('#veil').hide();
    }
  },

  'click button#editButton' : function(event){
    Session.set('formState','edit');
    Session.set('itemOperation','edit');
    $('div#itemOperation').css('z-index','3');
    $('#veil').show();
    $('div#itemOperation').show();
  }
}
