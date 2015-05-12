//////////////////////Data
Template.itemForm.insertMode = function(){
  switch(Session.get('formState')){
    case('insert'):
      return true;
      break;
    default:
      return false;
      break;
  }
}

Template.itemForm.itemFormTitle = function(){
  switch(Session.get('formState')){
    case('insert'):
      return 'Add New Item';
      break;
    default:
      return 'Edit Existing Item';
      break;
  }
}

Template.itemForm.categories = function(){
  return Categories.find({},{sort:{desc:1}});
}

Template.itemForm.units = function(){
  return Units.find({}, {sort : {desc : 1}});
}

Template.itemForm.suppliers = function(){
  return Suppliers.find({}, {sort : {desc : 1}});
}

//////////////////////Rendered
Template.itemForm.rendered = function(){
  if(Session.get('formState')=='edit'){
    var id = Session.get('operatedItem');

    var item = Items.findOne({_id:id});
    if(item){
      $('#barcode').val(item.barcode);
      $('#desc').val(item.desc);
      $('#supplier').val(item.supplier);
      $('#category').val(item.category);
      $('#stock').val(item.stockOnHand);
      $('#cost').val(item.cost);
      $('#price').val(item.price);
      $('#unit').val(item.unit);
      $('#leadTime').val(item.leadTime);
    } else {
      alert('Fail to retrieve item information');
    }
  }
}

//////////////////////Events
Template.itemForm.events = {
  'click input#cancelButton' : function(event){
     resetForm();
     //$('div.form').slideToggle();
    if(Session.get('formState')==='edit'){
      if($('div#itemOperation').length){
        $('div#itemOperation').hide();
        //Reset the session will reset the template.
        Session.set('itemOperation',null);
      }

      if($('#veil').length){
        $('#veil').hide();
      }
    }
  },

  'click input#addButton' : function(event){
    var barcode = $('#barcode').val().trim();
    var desc = $('#desc').val().trim();
    var supplier = $('#supplier').val();
    var category = $('#category').val();
    var stockOnHand = $('#stock').val().trim();
    var cost = $('#cost').val().trim();
    var price = $('#price').val().trim();
    var unit = $('#unit').val();
    var leadTime = $('#leadTime').val();

    //validate the form. check for blanks
    if(barcode === ''){
      alert('Please fill in the barcode');
      return;
    }

    if(desc === ''){
      alert('Please fill in the description');
      return;
    }

    if(stockOnHand === ''){
      alert('Please fill in the stock on hand');
      return;
    }else{
      if(!parseInt(stockOnHand)){
        alert('Stock on hand must be an integer value (e.g. 100,200)');
        return;
      }else{
        stockOnHand = parseInt(stockOnHand);
      }
    }

    if(cost === ''){
      alert('Please fill in the cost');
      return;
    }else{
      if(!parseFloat(cost)){
        alert('Cost must be a numeric value');
        return;
      }else{
        cost = parseFloat(cost);
      }
    }

    if(price === ''){
      alert('Please fill in the price');
      return;
    }else{
      if(!parseFloat(cost)){
        alert('Price must be a numeric value');
        return;
      }else{
        cost = parseFloat(cost);
      }
    }

    if(leadTime === ''){
      alert('Please fill in the lead time');
      return;
    }else{
      if(!parseInt(leadTime)){
        alert('Lead time must be an integer value (e.g. 100,200)');
        return;
      }else{
        leadTime = parseInt(leadTime);
      }
    }

    //check the numerical validity
    var obj = {
      'barcode' : barcode,
      'desc' : desc,
      'supplier' : supplier,
      'category' : category,
      'stockOnHand' : stockOnHand,
      'cost' : cost,
      'price' : price,
      'unit' : unit,
      'leadTime' : leadTime
    };

    var id = Items.insert(obj);
    if(id){
      alert('Item succesfully registered');
      //$('div.form').slideToggle();
      resetForm();
    }
  },

  'click input#saveButton' : function(event){
    //edited item has its own id in the session
    var id = Session.get('operatedItem');
    if(!id){
      alert('Fail to retrieve item information');
      return;
    }

    var barcode = $('#barcode').val().trim();
    var desc = $('#desc').val().trim();
    var supplier = $('#supplier').val();
    var category = $('#category').val();
    var stockOnHand = $('#stock').val().trim();
    var cost = $('#cost').val().trim();
    var price = $('#price').val().trim();
    var unit = $('#unit').val();
    var leadTime = $('#leadTime').val();

    //validate the form. check for blanks
    if(barcode === ''){
      alert('Please fill in the barcode');
      return;
    }

    if(desc === ''){
      alert('Please fill in the description');
      return;
    }

    if(stockOnHand === ''){
      alert('Please fill in the stock on hand');
      return;
    }else{
      if(!parseInt(stockOnHand)){
        alert('Stock on hand must be an integer value (e.g. 100,200)');
        return;
      }else{
        stockOnHand = parseInt(stockOnHand);
      }
    }

    if(cost === ''){
      alert('Please fill in the cost');
      return;
    }else{
      if(!parseFloat(cost)){
        alert('Cost must be a numeric value');
        return;
      }else{
        cost = parseFloat(cost);
      }
    }

    if(price === ''){
      alert('Please fill in the price');
      return;
    }else{
      if(!parseFloat(cost)){
        alert('Price must be a numeric value');
        return;
      }else{
        cost = parseFloat(cost);
      }
    }

    if(leadTime === ''){
      alert('Please fill in the lead time');
      return;
    }else{
      if(!parseInt(leadTime)){
        alert('Lead time must be an integer value (e.g. 100,200)');
        return;
      }else{
        leadTime = parseInt(leadTime);
      }
    }

    var count = Items.update(
      {_id : id},
      {
        $set:{
          barcode : barcode,
          desc : desc,
          supplier : supplier,
          category : category,
          stockOnHand : stockOnHand,
          cost : cost,
          price : price,
          unit : unit,
          leadTime : leadTime
        }
      }
    );

    if(count>0){
      alert('Item succesfully updated');
      //Close the dialog
      if($('div#itemOperation').length){
        $('div#itemOperation').hide();
      }

      if($('#veil').length){
        $('#veil').hide();
      }
    }

  }
}

function resetForm(){
  //Clear the form
  $('.form ol li input[type="text"]').val('');
  $('.form ol li input[type="checkbox"]').prop('checked',false);
}
