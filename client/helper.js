

UI.registerHelper("calculateTotal",function(vol,price){
  return (vol * price).toFixed(2);
});

UI.registerHelper("getSupplierName", function(id){
  return Suppliers.findOne({_id : id}).desc;
});

UI.registerHelper("getCategoryName", function(id){
  return Categories.findOne({_id : id}).desc;
});

UI.registerHelper("getUnitName", function(id){
  return Units.findOne({_id : id}).desc;
});

UI.registerHelper("getItemName", function(id){
  return Items.findOne({_id : id}).desc;
});


UI.registerHelper("getQuickCatName", function(id){
  return Quickcategories.findOne({_id : id}).desc;
});


////////////////Time-based helper functions
UI.registerHelper("formatDate", function(datetime) {
  if(datetime) {
    var day = datetime.getDate().toString();
    var month = (datetime.getMonth() + 1).toString();
    var year = datetime.getFullYear().toString();

    var hour = datetime.getHours().toString();
    var min = datetime.getMinutes().toString();
    if(min.length<=1) {
      min = "0" + min;
    }

    var sec = datetime.getSeconds().toString();
    if(sec.length<=1) {
      sec = "0" + sec;
    }

    return hour + ':' + min + ':' + sec + ', ' + day + '/' + month + '/' + year;
  }
});
