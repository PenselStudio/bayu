Meteor.methods({
  flushInventoryFromSales : function(itemArr){
    /**Item Array
    Contains Barcode, Desc, Volume, Price
    **/
    for(var i=0;i<itemArr.length;i++){
      var barcode = itemArr[i]['barcode'];
      var vol = itemArr[i]['vol'] * -1;

      Items.update(
        {'barcode' : barcode},
        { $inc : {stockOnHand : vol}}
      );
    }
  },

  registerSales : function(salesObj){
    salesObj['salesId'] = getNextSequence('salesId');
    var id = Sales.insert(salesObj);
    if(id){
      var itemArr = salesObj['items'];

      //Flush items from inventory
      for(i=0;i<itemArr.length;i++){
        var barcode = itemArr[i]['barcode'];
        //vol should be in negative form as we're
        //deducting from the inventory
        var vol = itemArr[i]['vol'] * -1;

        Items.update(
          {'barcode' : barcode},
          { $inc : {stockOnHand : vol}}
        );
      }
    }
  }
});
