//////////////////////Data
Template.deviceForm.insertMode = function(){
  switch(Session.get('formState')){
    case('insert'):
      return true;
      break;
    default:
      return false;
      break;
  }
}

Template.deviceForm.formTitle = function(){
  switch(Session.get('formState')){
    case('insert'):
      return 'Add New Device';
      break;
    default:
      return 'Edit Existing Device';
      break;
  }
}

//////////////////////Rendered
Template.deviceForm.rendered = function(){
  if(Session.get('formState')=='edit'){
    var id = Session.get('operatedDevice');

    var device = Devices.findOne({_id:id});
    if(device){
      $('#code').val(device.code);
      $('#desc').val(device.desc);
      $('#type').val(device.type);
      $('#ipAddress').val(device.ipAddress);
    } else {
      alert('Fail to retrieve item information');
    }
  }
}

//////////////////////Events
Template.deviceForm.events = {
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
    var code = $('#code').val().trim();
    var desc = $('#desc').val().trim();
    var type = $('#type').val().trim();
    var ipAddress = $('#ipAddress').val().trim();

    if(code === ''){
      alert('Please fill in the code');
      return;
    }

    if(desc === ''){
      alert('Please fill in the description');
      return;
    }

    if(ipAddress === ''){
      alert('Please fill in the device IP address');
      return;
    }

    var obj = {
      'code' : code,
      'desc' : desc,
      'type' : type,
      'ipAddress' : ipAddress
    };

    var id = Devices.insert(obj);
    if(id){
      alert('Device succesfully registered');
      //$('div.form').slideToggle();
      resetForm();
    }
  },

  'click input#saveButton' : function(event){
    var id = Session.get('operatedDevice');
    if(!id){
      alert('Fail to retrieve device information');
      return;
    }

    var code = $('#code').val().trim();
    var desc = $('#desc').val().trim();
    var type = $('#type').val().trim();
    var ipAddress = $('#ipAddress').val().trim();

    //validation
    if(code === ''){
      alert('Please fill in the code');
      return;
    }

    if(desc === ''){
      alert('Please fill in the description');
      return;
    }

    if(ipAddress === ''){
      alert('Please fill in the device IP address');
      return;
    }

    //update
    var count = Devices.update(
      {_id : id},
      {
        $set : {
          code : code,
          desc : desc,
          type : type,
          ipAddress : ipAddress
        }
      }
    );

    if(count>0){
      alert('Device succesfully updated');
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
