Template.receiveForm.itemDesc = function(){
  var id = Session.get('operatedItem');
  return Items.findOne({_id : id}).desc;
}

Template.receiveForm.currStock = function(){
  var id = Session.get('operatedItem');
  return Items.findOne({_id : id}).stockOnHand;
}

///////////////////////Events
Template.receiveForm.events = {
  'click button#cancelBtn' : function(event){

   //var obj =  $('#cancelBtn').parent();
   //obj.hide();
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
   var item = Items.findOne({_id : id});

   var receivedStock = parseInt($('#stock').val().trim());
   var prevStock = item.stockOnHand;

   if(!receivedStock){
     alert('Stock value must be an integer (e.g. 2, 100, 15)');
     return;
   }

   //Update the stockOnHand field
   Items.update(
     {_id:id},
     {$inc : {stockOnHand : receivedStock}},
     function(error){
       //Record the transaction
       var currDate = new Date();
       var obj = {
         receiveId : getNextSequence('receiveId'),
         itemId : item._id,
         desc : item.desc,
         prevStock : prevStock,
         receivedStock : receivedStock,
         newStock : (prevStock + receivedStock),
         regDate : currDate
       };

       Receivings.insert(obj);

       alert('Item received successfully');
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
  //$('#reason').val('');
}
