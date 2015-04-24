Template.adminNavi.currentTime = function(){
  return Session.get('currentTime');
}

/////////////////Created
Template.adminNavi.created = function() {
  registerClockUpdate();
}

////////////////Event
Template.adminNavi.events = {
  'click a#logoutBtn' : function(event){
    Meteor.logout(function(){
      Router.go('/');
    });
  }
}
