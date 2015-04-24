///////////Data
Template.test.category = function(){
  return Categories.find();
}

Template.test.quickCategory = function(){
  return Quickcategories.find();	
}

///////////Events
Template.test.events = {
  'click input#catBtn' : function(event) {
    var obj = {
      name : $('#catNameTxt').val().trim(),
      desc : $('#catDesc').val().trim()
      /*
      barcode : $('#itemBarcodeTxt').val().trim(),
      desc : $('#itemDescTxt').val().trim(),
      price : $('#itemPriceTxt').val().trim(),
      category : $('#itemCatTxt').val().trim()	
      */
    };
    
    var count = Categories.insert(obj);
  },
  
  'click input#itemBtn' : function(event) {
  	var obj = {
  	  barcode : $('#itemBarcodeTxt').val().trim(),
      desc : $('#itemDescTxt').val().trim(),
      price : $('#itemPriceTxt').val().trim(),
      category : $('#itemCat').val().trim()
  	};
  	
  	var count = Items.insert(obj);
  },
  
  'click input#quickCatBtn' : function(event) {
    var obj = {
      name : $('#quickCatNameTxt').val().trim(),
      desc : $('#quickCatDesc').val().trim()
    };
    
    var count = Quickcategories.insert(obj);
  },
  
  'click input#quickDispBtn' : function(event) {
    var obj = {
      item : $('#quickItemTxt').val().trim(),
      displayText : $('#quickDispTxt').val().trim(),
      quickCategory : $('#quickBtnCat').val().trim()
    };
    
    var count = Quickbuttons.insert(obj);
  } 	
}
