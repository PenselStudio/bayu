Meteor.methods({
  addNewUser : function(username, email, password, firstName, lastName, privilege){
    //assumption : password,email is verified at clientsidev
    var profileObj = {
      firstName : firstName,
      lastName : lastName,
      privilege : privilege
    }

    var obj = {
      username : username,
      email : email,
      password : password,
      profile : profileObj
    };

    Accounts.createUser(obj);
  },

  deleteUser : function(userId){
    Meteor.users.remove({_id : userId});
  },

  changeUserPassword : function(userId, password){
    Accounts.setPassword(userId, password);
  },

  changeUserDetails : function(userId, profile, privilege, email){
    var user = Meteor.users.findOne({_id : userId});
    if(user){
      Meteor.users.update(
        {_id : userId},
        {
          $set : {
            profile : profile,
            privilege : privilege,
            'emails.0.address' : email
          }
        }
      );
    }
  },

  startNewShift : function(shiftObj){
    shiftObj['shiftId'] = getNextSequence('shiftId');
    Shifts.insert(shiftObj);
    return shiftObj['shiftId'];
  },

  endCurrentShift :function(shiftId){
    var date = new Date();
    Shifts.update(
      {'shiftId' : shiftId},
      {
        $set : {'endAt' : date}
      }
    );
  }
});


Accounts.onCreateUser(function(options, user){
  var privilege = options.profile.privilege;
  var newProfile = {
    firstName : options.profile.firstName,
    lastName : options.profile.lastName
  }

  user.privilege = privilege;
  user.profile = newProfile;

  return user;
});
