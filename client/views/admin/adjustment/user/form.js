//////////////////////Data
Template.userForm.formTitle = function(){
  return "Add New User";
}


///////////////////////Event
Template.userForm.events = {
  'click input#addButton' : function(event){
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();
    var verifyPassword = $('#verifyPassword').val().trim();
    var email = $('#email').val().trim();
    var firstName = $('#firstName').val().trim();
    var lastName = $('#lastName').val().trim();
    var privilege = $('#privilege').val().trim();

    if(username === ''){
      alert('Please fill in the username');
      return;
    }

    if(password === ''){
      alert('Please fill in the password');
      return;
    }

    if(verifyPassword === ''){
      alert('Please fill in the password verification');
      return;
    }

    if(email === ''){
      alert('Please fill in the email');
      return;
    }

    if(firstName === ''){
      alert('Please fill in the first name');
      return;
    }

    //Password check
    if(password!=verifyPassword){
      alert('Password and verification do not match. Please re-enter.');
      return;
    }

    Meteor.call(
      'addNewUser',
      username,
      email,
      password,
      firstName,
      lastName,
      privilege,
      function(error){
        if(error){
          alert(error);
        } else {
          alert('New user registered successfully');
        }
      }
    );
  },
}

function resetForm(){
  //Clear the form
  $('.form ol li input[type="text"]').val('');
  $('.form ol li input[type="checkbox"]').prop('checked',false);
}
