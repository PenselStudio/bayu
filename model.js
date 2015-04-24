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
}
