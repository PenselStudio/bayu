//////////////////////Data
Template.taxForm.insertMode = function(){
  switch(Session.get('formState')){
    case('insert'):
      return true;
      break;
    default:
      return false;
      break;
  }
}

Template.taxForm.taxFormTitle = function(){
  switch(Session.get('formState')){
    case('insert'):
      return 'Add New Tax';
      break;
    default:
      return 'Edit Existing Tax';
      break;
  }
}

//////////////////////Rendered
Template.taxForm.rendered = function(){
  if(Session.get('formState') =='edit'){

    var id = Session.get('operatedTax');
    //alert(id);
    var tax = Taxes.findOne({_id:id});
    if(tax){
      $('#code').val(tax.code);
      $('#desc').val(tax.desc);
      $('#value').val(tax.value);

    } else {
      alert('Fail to retrieve tax information');
    }
  }
}

//////////////////////Events
Template.taxForm.events = {
  'click input#cancelButton' : function(event){
     //$('div.form').slideToggle();
     resetForm();
     if(Session.get('formState')==='edit'){
       if($('div#itemOperation').length){
         $('div#itemOperation').hide();
         //Reset the session will reset the template.
         Session.set('taxOperation',null);
       }

       if($('#veil').length){
         $('#veil').hide();
       }
     }
  },

  'click input#addButton' : function(event){
    var code = $('#code').val().trim();
    var desc = $('#desc').val().trim();
    var value = $('#value').val().trim();

    //validation
    if(code === ''){
      alert('Please fill in the code');
      return;
    }

    if(desc === ''){
      alert('Please fill in the description');
      return;
    }

    if(value === ''){
      alert('Please fill in the value');
      return;
    } else {
      if(!parseFloat(value)) {
        alert('Value must be an numeric value');
        return;
      }else{
        value = parseFloat(value);
      }
    }

    var obj = {
      'code' : code,
      'desc' : desc,
      'value' : value
    }

    var id = Taxes.insert(obj);
    if(id){
      alert('Tax succesfully registered');
      resetForm();
    }
  },

  'click input#saveButton' : function(event){
    var id = Session.get('operatedTax');
    if(!id){
      alert('Fail to retrieve tax information');
      return;
    }

    var code = $('#code').val().trim();
    var desc = $('#desc').val().trim();
    var value = $('#value').val().trim();

    //validate the form. check for blanks
    if(code === ''){
      alert('Please fill in the code');
      return;
    }

    if(desc === ''){
      alert('Please fill in the description');
      return;
    }

    if(value === ''){
      alert('Please fill in the value');
      return;
    } else {
      if(!parseFloat(value)) {
        alert('Value must be an integer value (7,25)');
        return;
      }else{
        value = parseFloat(value);
      }
    }

    var count = Taxes.update(
      {_id : id},
      {
        $set : {
          code : code,
          desc : desc,
          value : value
        }
      }
    );

    if(count>0){
      alert('Tax succesfully updated');
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
