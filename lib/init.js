getNextSequence = function getNextSequence(name) {
  var counter = Counters.findOne({_id : name});
  if(counter){
    var nextSeq = counter.seq + 1;
    Counters.update(
      {_id : name},
      {
        $inc : {seq : 1}
      }
    );

    return nextSeq;

  } else {
    var nextSeq = 1;
    Counters.insert(
      {
        _id : name,
        seq : 1
      }
    );

    return nextSeq;
  }
}

createDefaultAdmin = function createDefaultAdmin(){
  if(Meteor.users.find().count()<=0){
    var profile = {
      firstName : 'Super',
      lastName : 'Administrator',
      privilege : 'admin'
    };

    var options = {
      username : 'admin',
      email : 'admin@admin.admin',
      password : 'password',
      profile : profile
    };

    Accounts.createUser(options);
  }

}
