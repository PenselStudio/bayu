Template.adjustForm.itemDesc = function(){
  var id = Session.get('operatedItem');
  return Items.findOne({_id : id}).desc;
}

Template.adjustForm.currStock = function(){
  var id = Session.get('operatedItem');

  return Items.findOne({_id : id}).stockOnHand;
}

///////////////////////Events
Template.adjustForm.events = {
  'click button#cancelBtn' : function(event){
   clearForm();
   if($('div#itemOperation').length){
     $('div#itemOperation').hide();
   }

   if($('#veil').length){
     $('#veil').hide();
   }
 },

 'click button#saveBtn' : function(event){
   var id = Session.get('operatedItem');
   var item = Items.findOne({_id:id});

   var newStock = parseInt($('#stock').val().trim());
   var prevStock = item.stockOnHand;
   var adjReason = $('#reason').val().trim();

   if(!newStock){
     alert('Stock value must be an integer (e.g. 2, 100, 15)');
     return;
   }

   //Update the stockOnHand field
   Items.update(
     {_id:id},
     {$set : {stockOnHand : newStock}},
     function(error){
       //Record the transaction
       var currDate = new Date();
       var obj = {
         adjustId : getNextSequence('adjustId'),
         itemId : item._id,
         desc : item.desc,
         reason : adjReason,
         prevStock : prevStock,
         newStock : newStock,
         regDate : currDate
       };

       Adjustments.insert(obj);

       alert('Stock adjusted successfully');
       clearForm();

       //Close the dialog
       if($('div#itemOperation').length){
         $('div#itemOperation').hide();
       }

       if($('#veil').length){
         $('#veil').hide();
       }
     }
   );
 }
}

function clearForm(){
  //Clear form
  $('#stock').val('');
  $('#reason').val('');
}
