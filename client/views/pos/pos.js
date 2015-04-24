Template.awesomeBar.quickButtons = function() {
    return Quickbuttons.find();
}

Template.awesomeBar.inputStream = function() {
    return Session.get('inputStream');
}

Template.quickSelect.quickButtons = function() {
    var quickCat = ''
    if(Session.get('quickCat')==''){
        var obj = Quickcategories.find({},{limit:1, sort : {desc : 1}}).fetch()[0];
        quickCat = obj._id;
    } else {
        quickCat = Session.get('quickCat');
    }
    return Quickbuttons.find({quickCategory:quickCat},{sort : {displayText : 1}});
}

Template.quickSelect.quickCat = function() {
    return Quickcategories.find({},{sort : {desc : 1}});
}

Template.list.itemsList = function() {
    return Items.find();
}

Template.list.bucket = function() {
    return Session.get('bucket');
}

Template.list.grandTotal = function() {
    var arr = Session.get('bucket');
    var grandTotal = 0;

    for(var i=0; i<arr.length; i++){
      var obj = arr[i];
      var total = obj.vol * obj.price;
      grandTotal = grandTotal + total;
    }

    Session.set('posGrandTotal',grandTotal);
    return grandTotal.toFixed(2);
}

Template.payment.totalAmount = function(){
    return Session.get('posGrandTotal').toFixed(2);
}

Template.payment.quickNotes = function(){
  return Quicknotes.find({},{sort : {value : 1}});
}

Template.payment.change = function(){
  //TODO: Monetize trans
  var grandTotal = Session.get('posGrandTotal');
  var givenAmt =Session.get('posGivenAmt');
  var change = givenAmt - grandTotal;

  return change.toFixed(2);
}

Template.itemInBasket.currentQuantity = function(){
	return Session.get('currentQuantity');
}

Template.itemInBasket.itemBarcode = function(){
	return Session.get('currentBarcode');
}

Template.navi.currentTime = function(){
  return Session.get('currentTime');
}

/////////////////Created
Template.navi.created = function() {
  registerClockUpdate();
}

//////////////////// Events
Template.awesomeBar.events = {
    'keydown input#inputTxt' : function(event){
        if(event.which==13){
            var input = $('#inputTxt').val().trim();
            if(input){
                //check the barcode off the db
                var item = Items.findOne({barcode : input});
                if(item){
                    var bucket = Session.get('bucket');
                    var lookup = Session.get('lookup');
                    //check if array exist in lookup or not
                    if(lookup[item._id] === undefined){
                        //item does not exist. insert in the bucket
                        //var item = Items.findOne({_id : this.item});
                        var obj = { barcode : item.barcode, desc : item.desc, vol : 1, price : item.price};
                        bucket.push(obj);

                        //update lookup dict
                        lookup[item._id] = bucket.length-1;
                    } else {
                        //item exist. get location from lookup
                        var pos = lookup[item._id];
                        var obj = bucket[pos];

                        //increase the number by 1!
                        obj.vol = obj.vol + 1;

                        //save it back
                        bucket[pos] = obj;
                    }

                    //update back the session
                    Session.set('bucket', bucket);
                    Session.set('lookup', lookup);
                }else{
                    alert('Item not found');
                }

                $('#inputTxt').val('');
            }
        }
    },

  'click button.button' : function(event) {
    var itemId = this.item; //itemId
    var bucket = Session.get('bucket');
    var lookup = Session.get('lookup');

    //check if array exist in lookup or not
    if(lookup[this.item] === undefined){
      //item does not exist. insert in the bucket
      var item = Items.findOne({_id : this.item});
      var obj = { _id : item._id, barcode : item.barcode, desc : item.desc, vol : 1, price : item.price};
      bucket.push(obj);

      //update lookup dict
      lookup[this.item] = bucket.length-1;
    } else {
      //item exist. get location from lookup
      var pos = lookup[this.item];
      var obj = bucket[pos];

      //increase the number by 1!
      obj.vol = obj.vol + 1;

      //save it back
      bucket[pos] = obj;
    }

    //update back the session
    Session.set('bucket', bucket);
    Session.set('lookup', lookup);
    /*
    var result = $.grep(bucket, function(e){return e.item == this.item});
    if(result.length>0){

    }*/
  },

  'click button.cancel' : function(event){
      Session.set('inputStream','');
      var bucketArr = new Array();
      var lookupArr = {};
      Session.set('bucket', bucketArr);
      Session.set('lookup', lookupArr);
  },

  'click button.confirm' : function(event){
      setPaymentDialog();
      setQuickNotesSize();

      $('.posVeil').show();
      $('.payment').show();
  }
}

Template.quickSelect.events = {
    'click .linkButton' : function(event){
        var catId = this._id;
        Session.set('quickCat', catId);
    }
}

Template.menu.events = {
    'click button#assistBtn' : function(event){
        if($('div.assistDisplay').length){
            $('div.assistDisplay').slideToggle();
        }
    },

    'click button#keypadBtn' : function(){
        if($('#onscreenCtrl').length){
            $('#onscreenCtrl').fadeToggle(500);
        }
    },

    'click button#endShiftBtn' : function(){
      alert('End Shift. TODO:Print Receipt Here!');
      if(confirm('End this shift and logout?')){
        Meteor.logout(function(error){
          if(error){
            alert(error);
          } else {
            Meteor.call(
              'endCurrentShift',
              Session.get('currentShiftId'),
              function(error){
                if(error){
                  alert(error);
                } else {
                  Session.set('currentShiftId',null);
                }
              }
            );
          }
        });
        Router.go('/');
      }
    },
}

Template.list.events = {
  'click div.list div.item' : function(event){
    setItemInBasketDialog();
  	$('.posVeil').show();
  	Session.set('currentQuantity',this.vol);
  	Session.set('currentBarcode', this.barcode);
  	$('.itemInBasket').show();
  }
}

Template.itemInBasket.events = {
	'click button#cancelBtn' : function(event){
		if($('div.itemInBasket').length){
		  //clear the form
		  $('input#newQuantity').val('');

		  //Update the givenAmt Session
		  Session.set('currentQuantity',NaN);
		  Session.set('currentBarcode', null);
		  //hide it
		  $('div.itemInBasket').hide();
		  $('.posVeil').hide();
		}
	},

	'click button#okBtn' : function(event){
		var item = Items.findOne({barcode : Session.get('currentBarcode')});
		var lookup = Session.get('lookup');
		var bucket = Session.get('bucket');
		var pos = lookup[item._id];

		if(parseInt($('#newQuantity').val().trim())){
			bucket[pos]['vol'] = parseInt($('#newQuantity').val().trim());
			Session.set('bucket',bucket);
		} else {
			alert('New quantity must be a numeric');
		}

		if($('div.itemInBasket').length){
		  //clear the form
		  $('input#newQuantity').val('');

		  //Update the givenAmt Session
		  Session.set('currentQuantity',NaN);
		  Session.set('currentBarcode', null);
		  //hide it
		  $('div.itemInBasket').hide();
		  $('.posVeil').hide();
		}
	}
}

Template.keypad.events = {
  'click button.numericPad' : function(event){
    var ele = event.target;
    var text = ele.innerHTML.trim();
    var currentInput = Session.get('inputStream');
    var appendedChar = '';

    switch(text){
      case('9'):
        appendedChar = '9';
        break;
      case('8'):
        appendedChar = '8';
        break;
      case('7'):
        appendedChar = '7';
        break;
      case('6'):
        appendedChar = '6';
        break;
      case('5'):
        appendedChar = '5';
        break;
      case('4'):
        appendedChar = '4';
        break;
      case('3'):
        appendedChar = '3';
        break;
      case('2'):
        appendedChar = '2';
        break;
      case('1'):
        appendedChar = '1';
        break;
      case('0'):
        appendedChar = '0';
        break;
      case('.'):
        appendedChar = '.';
        break;
    }

    currentInput = currentInput + appendedChar;
    Session.set('inputStream', currentInput);
  },

  'click button.delete' : function(event){
    var temp = Session.get('inputStream');
    temp = temp.substr(0, (temp.length -1));
    Session.set('inputStream',temp);
  },

  'click button.clear' : function(event){
    Session.set('inputStream','');
  },

  'click button.hide' : function(event){
    $('#onscreenCtrl').fadeToggle(300);
  }
}

Template.payment.events = {
  'click button#cancelBtn' : function(event){
    if($('div.payment').length){
      //clear the form
      $('input#givenTxt').val('');

      //Update the givenAmt Session
      Session.set('posGivenAmt',NaN);

      //hide it
      $('div.payment').hide();
      $('.posVeil').hide();
    }
  },

  'click button#okBtn' : function(event){
    //Register as sales.

    //Package the items into an object
    var totalItem = 0;
    var amtGiven = parseFloat(Session.get('posGivenAmt'));
    if(!amtGiven){
      alert('Given amount must be a numeric');
      return;
    }
    var grandTotal = parseFloat(Session.get('posGrandTotal'));
    if(!grandTotal){
      alert('Error in calculating grand total');
      return;
    }

    var itemList = Session.get('bucket');

    for(i=0;i<itemList.length;i++){
        totalItem = totalItem + itemList[i]['vol'];
    }

    var obj = {};
    obj['date'] = new Date();
    obj['operator'] = Meteor.user().username;
    obj['shift'] = Session.get('currentShiftId');

    //TODO:Monetize
    obj['amtGiven'] = amtGiven;
    obj['amtChange'] = amtGiven-grandTotal;
    obj['totalItem'] = totalItem;
    obj['grandTotal'] = grandTotal;
    obj['items'] = itemList;


    // register sales and backflush items from inventory
    /*
    Meteor.call(
      'flushInventoryFromSales',
      itemList,
      function(error){
        if(error){
          alert(error);
        }
      }
    );

    var id =Sales.insert(obj);
    if(!id){
      alert('Problem in registering sales');
      return;
    }*/

    Meteor.call(
      'registerSales',
      obj,
      function(error){
        if(error){
          alert(error);
        } else {
          alert('Please issue the receipt to the customer');
        }
      }
    );

    //Clear basket
    Session.set('inputStream','');
    var bucketArr = new Array();
    var lookupArr = {};
    Session.set('bucket', bucketArr);
    Session.set('lookup', lookupArr);

    //clear payment
    if($('div.payment').length){
      //clear the form
      $('input#givenTxt').val('');

      //Update the givenAmt Session
      Session.set('posGivenAmt',NaN);

      //hide it
      $('div.payment').hide();
      $('.posVeil').hide();
    }

  },

  'keydown, keypress, keyup input#givenTxt' : function(event){
    var given = $('#givenTxt').val().trim();
    if(!isNaN(parseFloat(given))){
      //TODO: Monetize
      Session.set('posGivenAmt',parseFloat(given));
      //alert(Session.get('posGivenAmt'));
    } else {
      Session.set('posGivenAmt',NaN);
    }
  },

  'click div.quickNotes button' : function(event){
    var val = $(event.target).attr("value");

    //TODO: Monetize
    if(!isNaN(parseFloat(val))){
      var given = parseFloat(val);
      Session.set('posGivenAmt',given);
      $('#givenTxt').val(given.toFixed(2));
    } else {
      alert('Invalide quick note');
    }
  }
}
//////////////////// Created
Template.posBoard.created = function() {
  Session.set('inputStream','');
  var bucketArr = new Array();
  var lookupArr = {};
  Session.set('bucket', bucketArr);
  Session.set('lookup', lookupArr);
  Session.set('quickCat','');
  Session.set('currentQuantity',NaN);
  Session.set('currentBarcode', null);
}

//////////////////// Rendered
Template.posBoard.rendered = function() {
    $('#onscreenCtrl').hide();
    $('.payment').hide();
    $('.posVeil').hide();
    $('.itemInBasket').hide();
}

Template.list.rendered = function() {
    $('div.assistDisplay').hide();
}

/////////////////// Destroyed
Template.posBoard.destroyed = function() {
  Session.set('inputStream',null);
  Session.set('bucket', null);
  Session.set('lookup', null);
  Session.set('quickCat',null);
}


/////////////////// Misc
function setPaymentDialog(){
  var dialogWidth = $('.payment').width();
  var dialogHeight = $('.payment').height();

  var startTopPos = ($(window).width()/2) - (dialogWidth/2);

  $('.payment').css({'left' : startTopPos.toString() + 'px'});
}

function setQuickNotesSize(){
  var buttonWidth = $('.quickNoteButton').width();

  //TODO:this is a possible bug in jquery. returned value is
  //percentage instead of pixels.
  //Interim solution: hard cord the pixels calculation

  var height = (buttonWidth/100) * $('.payment').width();
  $('.quickNoteButton').css('height',height.toString()+'px');
}

function setItemInBasketDialog(){
  var dialogWidth = $('.itemInBasket').width();
  var dialogHeight = $('.itemInBasket').height();

  var startTopPos = ($(window).width()/2) - (dialogWidth/2);

  $('.itemInBasket').css({'left' : startTopPos.toString() + 'px'});
}
