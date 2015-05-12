//////////////////////Data
Template.supplierForm.insertMode = function(){
  switch(Session.get('formState')){
    case('insert'):
      return true;
      break;
    default:
      return false;
      break;
  }
}

Template.supplierForm.supplierFormTitle = function(){
  switch(Session.get('formState')){
    case('insert'):
      return 'Add New Supplier';
      break;
    default:
      return 'Edit Existing Supplier';
      break;
  }
}


//////////////////////Rendered
Template.supplierForm.rendered = function(){
  if(Session.get('formState')=='edit'){
    var id = Session.get('operatedSupplier');

    var supplier = Suppliers.findOne({_id:id});
    if(supplier){
      $('#code').val(supplier.code);
      $('#desc').val(supplier.desc);
      $('#address1').val(supplier.address1);
      $('#address2').val(supplier.address2);
      $('#address3').val(supplier.address3);
      $('#postcode').val(supplier.postcode);
      $('#city').val(supplier.city);
      $('#country').val(supplier.country);
      $('#state').val(supplier.state);
      $('#phone').val(supplier.phone);
      $('#fax').val(supplier.fax);
      $('#email').val(supplier.email);
      $('#representative').val(supplier.representative);
    } else {
      alert('Fail to retrieve supplier information');
    }
  }
}

//////////////////////Events
Template.supplierForm.events = {
  'click input#cancelButton' : function(event){
     //$('div.form').slideToggle();
     resetForm();
     if(Session.get('formState')==='edit'){
       if($('div#itemOperation').length){
         $('div#itemOperation').hide();
         //Reset the session will reset the template.
         Session.set('supplierOperation',null);
       }

       if($('#veil').length){
         $('#veil').hide();
       }
     }
  },

  'click input#addButton' : function(event){
    var code = $('#code').val().trim();
    var desc = $('#desc').val().trim();
    var address1 = $('#address1').val().trim();
    var address2 = $('#address2').val().trim();
    var address3 = $('#address3').val().trim();
    var postcode = $('#postcode').val().trim();
    var city = $('#city').val().trim();
    var country = $('#country').val().trim();
    var state = $('#state').val().trim();
    var phone = $('#phone').val().trim();
    var fax = $('#fax').val().trim();
    var email = $('#email').val().trim();
    var rep = $('#representative').val().trim();

    //validation
    if(code === ''){
      alert('Please fill in the code');
      return;
    }

    if(desc === ''){
      alert('Please fill in the description');
      return;
    }

    if(address1 === ''){
      alert('Please fill in the address');
      return;
    }

    if(postcode === ''){
      alert('Please fill in the postcode');
      return;
    }

    if(city === ''){
      alert('Please fill in the city');
      return;
    }

    if(state === ''){
      alert('Please fill in the state');
      return;
    }

    if(country === ''){
      alert('Please fill in the country');
      return;
    }

    if(phone === ''){
      alert('Please fill in the phone');
      return;
    }

    if(rep === ''){
      alert('Please fill in the representative');
      return;
    }

    //Insert data
    var currentTime = new Date();
    var obj = {
      'code' : code,
      'desc' : desc,
      'address1' : address1,
      'address2' : address2,
      'address3' : address3,
      'postcode' : postcode,
      'city' : city,
      'state' : state,
      'country' : country,
      'phone' : phone,
      'fax' : fax,
      'email' : email,
      'representative' : rep,
      'regDate' :  currentTime
    };

    var id = Suppliers.insert(obj);
    if(id){
       alert('Supplier succesfully registered');
      //$('div.form').slideToggle();
      resetForm();
    }
  },

  'click input#saveButton' : function(event){
    //edited item has its own id in the session
    var id = Session.get('operatedSupplier');
    if(!id){
      alert('Fail to retrieve supplier information');
      return;
    }

    var code = $('#code').val().trim();
    var desc = $('#desc').val().trim();
    var address1 = $('#address1').val().trim();
    var address2 = $('#address2').val().trim();
    var address3 = $('#address3').val().trim();
    var postcode = $('#postcode').val().trim();
    var city = $('#city').val().trim();
    var country = $('#country').val().trim();
    var state = $('#state').val().trim();
    var phone = $('#phone').val().trim();
    var fax = $('#fax').val().trim();
    var email = $('#email').val().trim();
    var rep = $('#representative').val().trim();

    //validation
    if(code === ''){
      alert('Please fill in the code');
      return;
    }

    if(desc === ''){
      alert('Please fill in the description');
      return;
    }

    if(address1 === ''){
      alert('Please fill in the address');
      return;
    }

    if(postcode === ''){
      alert('Please fill in the postcode');
      return;
    }

    if(city === ''){
      alert('Please fill in the city');
      return;
    }

    if(state === ''){
      alert('Please fill in the state');
      return;
    }

    if(country === ''){
      alert('Please fill in the country');
      return;
    }

    if(phone === ''){
      alert('Please fill in the phone');
      return;
    }

    if(rep === ''){
      alert('Please fill in the representative');
      return;
    }

    var currentTime = new Date();
    var count = Suppliers.update(
      {_id : id},
      {
        $set:{
          'code' : code,
          'desc' : desc,
          'address1' : address1,
          'address2' : address2,
          'address3' : address3,
          'postcode' : postcode,
          'city' : city,
          'state' : state,
          'country' : country,
          'phone' : phone,
          'fax' : fax,
          'email' : email,
          'representative' : rep,
          'editDate' : currentTime
        }
      }
    );

    if(count>0){
      alert('Supplier succesfully updated');
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
