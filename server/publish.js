Meteor.publish("userData", function() {
  /*
  if(this.userId != null ){
    return Meteor.users.find({}, {fields:{createdAt: true, profile: true, emails: true, username: true}});
  }*/
  return Meteor.users.find({}, {fields:{createdAt: true, profile: true, emails: true, username: true, privilege:true}});
});

Meteor.publish("items", function(argument){
  return Items.find();
});

Meteor.publish("quickbuttons", function(argument){
  return Quickbuttons.find();
});

Meteor.publish("quicknotes", function(argument){
  return Quicknotes.find();
});

Meteor.publish("shifts", function(argument){
  return Shifts.find();
});

Meteor.publish("transactions", function(argument){
  return Transactions.find();
});

Meteor.publish("suppliers", function(argument){
  return Suppliers.find();
});

Meteor.publish("categories", function(argument){
  return Categories.find();
});

Meteor.publish("units", function(argument){
  return Units.find();
});

Meteor.publish("batches", function(argument){
  return Batches.find();
});

Meteor.publish("receivings", function(argument){
  return Receivings.find();
});

Meteor.publish("adjustments", function(argument){
  return Adjustments.find();
});

Meteor.publish("sales", function(argument){
  return Sales.find();
});

Meteor.publish("settings", function(argument){
  return Settings.find();
});

Meteor.publish("devices", function(argument){
  return Devices.find();
});

Meteor.publish("counters", function(argument){
  return Counters.find();
});

Meteor.publish("taxes", function(argument){
  return Taxes.find();
});
