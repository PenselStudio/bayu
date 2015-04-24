Meteor.publish("userData", function() {
  /*
  if(this.userId != null ){
    return Meteor.users.find({}, {fields:{createdAt: true, profile: true, emails: true, username: true}});
  }*/
  return Meteor.users.find({}, {fields:{createdAt: true, profile: true, emails: true, username: true, privilege:true}});
});
