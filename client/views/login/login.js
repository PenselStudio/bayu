Template.login.currentTime = function(){
  return Session.get('currentTime');
}

/////////////////Created
Template.login.created = function() {
  registerClockUpdate();
}

/////////////////Rendered
Template.login.rendered = function(){
  var bgHeight = $('#loginBg').height();
  var bgWidth = $('#loginBg').width();

  var height = $(window).height();
  var width = $(window).width();

  var deltaWidth = (width-bgWidth)/2;
  var deltaHeight = (height-bgHeight)/2;

  $('.loginBackground').css({'top' : deltaHeight.toString()+'px', 'left' : deltaWidth.toString()+'px'});
}

Template.login.events = {
  'click button#loginBtn' : function(event){
    var username = $('#username').val().trim();
    var password = $('#password').val().trim();

    if(username === ''){
      alert('Username cannot be empty');
      return
    }

    if(password === ''){
      alert('Password cannot be empty');
      return
    }

    Meteor.loginWithPassword(
      username,
      password,
      function(error){
        if(error){
          alert(error);
        } else {
          var privilege = Meteor.user()['privilege'];
          switch(privilege){
            case('operator'):
              //shift start!
              var date = new Date();
              var obj = {
                'startAt' : date,
                'user' : Meteor.user().username
              };

              Meteor.call(
                'startNewShift',
                obj,
                function(error,shiftId){
                  if(error){
                    alert(error);
                    return;
                  }
                  Session.set('currentShiftId',shiftId);
                  Router.go('/pos');
                }
              );
              break;
            case('admin'):
              Router.go('/admin/item');
              break;
            default:
              alert('User does not have any privilege. Cannot proceed');
              break;
          }
        }
      }
    );
  }
}
