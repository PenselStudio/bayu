Template.userView.user = function(){
  var id = Router.current().params['id'];
  Session.set('operatedUser', id);
  return Meteor.users.find({_id : id});
}

Template.userOperation.templateHolder = function(){
  var operation = Session.get('userOperation');
  switch(operation){
    case('edit'):
      return Template['changeDetailsForm'];
      break;
    case('password'):
      return Template['changePasswordForm'];
    default:
      return null;
      break;
  }
}

/////////////////////Rendered
Template.userView.rendered = function(){
  $('.form').hide();
  $('#veil').hide();
  $('div#itemOperation').hide();
}

/////////////////////Events
Template.userView.events = {
  'click button#deleteButton' : function(event){
    var id = Session.get('operatedUser');
    $('#veil').show();
    if(confirm('Delete this user?')){
      Meteor.call(
        'deleteUser',
        id,
        function(error){
          if(error){
            alert(error)
          } else {
            alert('User successfully removed');
            window.close();
          }
        }
      );
    }else{
      $('#veil').hide();
    }
  },

  'click button#editButton' : function(event){
    Session.set('formState','edit');
    Session.set('userOperation','edit');
    $('div#itemOperation').css('z-index','3');
    $('#veil').show();
    $('div#itemOperation').show();
  },

  'click button#changePwdButton' : function(event){
    Session.set('formState','edit');
    Session.set('userOperation','password');
    $('div#itemOperation').css('z-index','3');
    $('#veil').show();
    $('div#itemOperation').show();
  }
}
