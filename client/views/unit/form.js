//////////////////////Data
Template.unitForm.insertMode = function(){
  switch(Session.get('formState')){
    case('insert'):
      return true;
      break;
    default:
      return false;
      break;
  }
}

Template.unitForm.unitFormTitle = function(){
  switch(Session.get('formState')){
    case('insert'):
      return 'Add New Unit';
      break;
    default:
      return 'Edit Existing Unit';
      break;
  }
}

Template.unitForm.units = function(){
  return Units.find({},{sort:{desc:1}});
}

//////////////////////Rendered
Template.unitForm.rendered = function(){
  if(Session.get('formState') =='edit'){
    var id = Session.get('operatedUnit');

    var unit = Units.findOne({_id:id});
    if(unit){
      $('#code').val(unit.code);
      $('#desc').val(unit.desc);
      if(unit.baseUnit){
        $('#baseUnit').val(unit.baseUnit);
        $('#vol').val(unit.volume);
      }
    } else {
      alert('Fail to retrieve unit information');
    }
  }
}
//////////////////////Events
Template.unitForm.events = {
  'click input#cancelButton' : function(event){
     //$('div.form').slideToggle();
     resetForm();
     if(Session.get('formState')==='edit'){
       if($('div#itemOperation').length){
         $('div#itemOperation').hide();
         //Reset the session will reset the template.
         Session.set('unitOperation',null);
       }

       if($('#veil').length){
         $('#veil').hide();
       }
     }
  },

  'click input#addButton' : function(event){
    var code = $('#code').val().trim();
    var desc = $('#desc').val().trim();
    var baseUnit = $('#baseUnit').val().trim();
    var volume = $('#vol').val().trim();

    //validation
    if(code === ''){
      alert('Please fill in the code');
      return;
    }

    if(desc === ''){
      alert('Please fill in the description');
      return;
    }

    if(baseUnit!=''){
      if(!parseInt(volume)){
        alert('Volume for base unit must be an integer');
        return;
      }
    }

    var obj = {
      'code' : code,
      'desc' : desc,
      'baseUnit' : baseUnit,
      'volume' : volume
    }

    var id = Units.insert(obj);
    if(id){
      alert('Unit succesfully registered');
      resetForm();
    }
  },

  'click input#saveButton' : function(event){
    var id = Session.get('operatedUnit');
    if(!id){
      alert('Fail to retrieve unit information');
      return;
    }

    var code = $('#code').val().trim();
    var desc = $('#desc').val().trim();
    var baseUnit = $('#baseUnit').val().trim();
    var volume = $('#vol').val().trim();

    //validation
    if(code === ''){
      alert('Please fill in the code');
      return;
    }

    if(desc === ''){
      alert('Please fill in the description');
      return;
    }

    if(baseUnit!=''){
      if(!parseInt(volume)){
        alert('Volume for base unit must be an integer');
        return;
      }
    }

    var count = Units.update(
      {_id : id},
      {
        $set:{
          'code' : code,
          'desc' : desc,
          'baseUnit' : baseUnit,
          'volume' : volume
        }
      }
    );

    if(count>0){
      alert('Unit succesfully updated');
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
