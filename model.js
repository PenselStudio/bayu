Items = new Meteor.Collection('items');
Quickbuttons = new Meteor.Collection('quickbuttons');
Quickcategories = new Meteor.Collection('quickcategories');
Quicknotes = new Meteor.Collection('quicknotes');
Shifts = new Meteor.Collection('shifts');
Transactions = new Meteor.Collection('transactions');
Suppliers = new Meteor.Collection('suppliers');
Categories = new Meteor.Collection('categories');
Units = new Meteor.Collection('units');
Batches = new Meteor.Collection('batches');
Receivings = new Meteor.Collection('receivings');
Adjustments = new Meteor.Collection('adjustments');
Sales = new Meteor.Collection('sales');
Settings = new Meteor.Collection('settings');
Devices = new Meteor.Collection('devices');
Counters = new Meteor.Collection('counters');
Taxes = new Meteor.Collection('taxes');

////////////////////Constraints
if(Meteor.isServer){
  Categories._ensureIndex({'code':1}, {unique:1});
  Quickcategories._ensureIndex({'code':1}, {unique:1});
  Items._ensureIndex({'barcode':1}, {unique:1});
  Quickbuttons._ensureIndex({'item':1},{unique:1});
  Settings._ensureIndex({'key':1},{unique:1});
  Units._ensureIndex({'code':1},{unique:1});
  Devices._ensureIndex({'code':1}, {unique:1});
  Shifts._ensureIndex({'shiftId':1}, {unique:1});
  Sales._ensureIndex({'salesId':1}, {unique:1});
  Adjustments._ensureIndex({'adjustId':1}, {unique:1});
  Receivings._ensureIndex({'receiveId':1}, {unique:1});


  //Allow/Deny
  //Data controls/restrictions from the clientside
  var adminPermission = {
    insert: function(userId, doc){
      var user = Meteor.users.findOne({_id: userId});
      return (userId && user.privilege === 'admin');
    },
    update: function(userId, doc, fields, modifier){
      var user = Meteor.users.findOne({_id: userId});
      return (userId && user.privilege === 'admin');
    },
    remove: function(userId, doc){
      var user = Meteor.users.findOne({_id: userId});
      return (userId && user.privilege === 'admin');
    }
  }

  Items.allow(adminPermission);
  Quickbuttons.allow(adminPermission);
  Quickcategories.allow(adminPermission);
  Quicknotes.allow(adminPermission);
  Shifts.allow(adminPermission);
  Transactions.allow(adminPermission);
  Suppliers.allow(adminPermission);
  Categories.allow(adminPermission);
  Units.allow(adminPermission);
  Batches.allow(adminPermission);
  Receivings.allow(adminPermission);
  Adjustments.allow(adminPermission);
  Sales.allow(adminPermission);
  Settings.allow(adminPermission);
  Devices.allow(adminPermission);
  Counters.allow(adminPermission);
  Taxes.allow(adminPermission);

}
