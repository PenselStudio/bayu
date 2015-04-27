Template.changePasswordForm.username = function(){
  var id = Session.get('operatedUser');
  var user = Meteor.users.findOne({_id : id});
  if(user){
    return user.username;
  } else {
    return '';
  }
}


////////////////////////Event
Template.changePasswordForm.events = {
  'click input#saveButton' : function(event){
    var password = $('#password').val().trim();
    var verifyPassword = $('#verifyPassword').val().trim();

    if(password === ''){
      alert('Please fill in the password');
      return;
    }

    if(verifyPassword === ''){
      alert('Please fill in the password verification');
    }

    //Password check
    if(password!=verifyPassword){
      alert('Password and verification do not match. Please re-enter.');
      return;
    }

    Meteor.call(
      'changeUserPassword',
      Session.get('operatedUser'),
      password,
      function(error){
        if(error){
          alert(error);
        } else {
          alert('Password changed successfully');
        }

        if($('div#itemOperation').length){
          $('div#itemOperation').hide();
        }

        if($('#veil').length){
          $('#veil').hide();
        }
      }
    );
  },

  'click input#cancelButton' : function(event){
    resetForm();
     //$('div.form').slideToggle();
    if(Session.get('formState')==='edit'){
      if($('div#itemOperation').length){
        $('div#itemOperation').hide();
        //Reset the session will reset the template.
        Session.set('userOperation',null);
      }

      if($('#veil').length){
        $('#veil').hide();
      }
    }
  },
}

function resetForm(){
  //Clear the form
  $('.form ol li input[type="text"]').val('');
  $('.form ol li input[type="checkbox"]').prop('checked',false);
}
