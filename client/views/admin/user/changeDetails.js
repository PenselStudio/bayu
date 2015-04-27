Template.changeDetailsForm.user = function(){
  var id = Session.get('operatedUser');
  return Meteor.users.findOne({_id : id});
}

////////////////////////Rendered
Template.changeDetailsForm.rendered = function(){
  var id = Session.get('operatedUser');
  var user = Meteor.users.findOne({_id : id});

  $('#privilege').val(user.privilege);
}

////////////////////////Event
Template.changeDetailsForm.events = {
  'click input#saveButton' : function(event){
    var email = $('#email').val().trim();
    var firstName = $('#firstName').val().trim();
    var lastName = $('#lastName').val().trim();
    var privilege = $('#privilege').val().trim();

    if(email === ''){
      alert('Please fill in the email');
      return;
    }

    if(firstName === ''){
      alert('Please fill in the first name');
      return;
    }

    var profile = {
      firstName : firstName,
      lastName : lastName
    }

    Meteor.call(
      'changeUserDetails',
      Session.get('operatedUser'),
      profile,
      privilege,
      email,
      function(error){
        if(error){
          alert(error);
        } else {
          alert('User details successfully updated');
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
