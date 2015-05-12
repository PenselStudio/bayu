////////////////// Initialization of the System Settings ///////////////////////
//
// Check if the settings/criterion before starting the server
// If the settings parameters do not exist, create it and assign default value
//
// This is also the library to put some testing data

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

initCurrency = function initCurrency(){
  //System settings parameters
  var result = Settings.findOne({'key' : 'currencyDenom'});
  if(!result){
    var obj = {
      'key' : 'currencyDenom',
      'value' : 100
    };
    Settings.insert(obj);
  }

  result = Settings.findOne({'key' : 'currencyPrefix'});
  if(!result){
    var obj = {
      'key' : 'currencyPrefix',
      'value' : 'RM'
    };
    Settings.insert(obj);
  }

  result = Settings.findOne({'key' : 'currencyName'});
  if(!result){
    var obj = {
      'key' : 'currencyName',
      'value' : 'Ringgit Malaysia'
    };
    Settings.insert(obj);
  }
  /*
  if(Settings.find().count()<=0){

    //For money denominator
    var obj = {
      'key' : 'currencyDenom',
      'value' : 100
    };
    Settings.insert(obj);

    //Currency type
    var obj = {
      'key' : 'currencyPrefix',
      'value' : 'RM'
    };
    Settings.insert(obj);
    //lala

    var obj = {
      'key' : 'currencyName',
      'value' : 'Ringgit Malaysia'
    };
    Settings.insert(obj);
  }*/
}

populateDumbData = function populateDumbData(){
  //Test data
  //*****START****
  //////////Supplier
    if(Suppliers.find().count()<=0){
      var suppA = {
        code : 'SUPPA',
        desc : 'Supplier A'
      };

      Suppliers.insert(suppA);

      var suppB = {
        code : 'SUPPB',
        desc : 'Supplier B'
      };

      Suppliers.insert(suppB);
  }

  ////////////////Category
  if(Categories.find().count()<=0){
    var catA = {
      code : 'testCat1',
      desc : 'test category 1'
    };
    Categories.insert(catA);

    var catB = {
      code : 'testCat2',
      desc : 'test category 2'
    };
    Categories.insert(catB);
  }

  ///////////////Item
  if(Items.find().count()<=0){
    var cat1 = Categories.findOne({name:'testCat1'});
    var cat2 = Categories.findOne({name:'testCat2'});

    var itemA = {
    barcode : '111',
    desc : 'item A',
    supplier : 'SUPPA',
    category: 'testCat1',
    stockOnHand : 10,
    cost : 0.8,
    price : 1.00,
    unit : 'PC',
    leadTime : 7
    };
    Items.insert(itemA);

    var itemB = {
    barcode : '222',
    desc : 'item B',
    supplier : 'SUPPB',
    category: 'testCat2',
    stockOnHand : 10,
    cost : 0.8,
    price : 1.00,
    unit : 'pc',
    leadTime : 7
    };
    Items.insert(itemB);
  }

  /////////////Quick Category
  if(Quickcategories.find().count()<=0){
    var qCatA = {
    code : 'quickCatA',
    desc : 'quick category A'
    };
    Quickcategories.insert(qCatA);

    var qCatB = {
    code : 'quickCatB',
    desc : 'quick category B'
    };
    Quickcategories.insert(qCatB);
  }

  ////////////Quick Button
  if(Quickbuttons.find().count()<=0){
    var qcatA = Quickcategories.findOne({code : 'quickCatA'});
    var qcatB = Quickcategories.findOne({code : 'quickCatB'});
    var item1 = Items.findOne({barcode : '111'});
    var item2 = Items.findOne({barcode : '222'});
    //alert(itemX._id);
    //alert(itemM._id);
    var qButtonA = {
    item : item1._id,
    displayText : 'Item A',
    quickCategory : qcatA._id
    };
    Quickbuttons.insert(qButtonA);

    var qButtonB = {
    item : item2._id,
    displayText : 'Item B',
    quickCategory : qcatB._id
    };
    Quickbuttons.insert(qButtonB);
  }

  ///////////Unit
  if(Units.find().count()<=0){
    var unitA = {
      code : 'pc',
      desc : 'piece'
    };
    Units.insert(unitA);
  }
  //****END***
}
