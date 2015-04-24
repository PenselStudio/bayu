//////////////////////Data
Template.quickCatForm.insertMode = function(){
  switch(Session.get('formState')){
    case('insert'):
      return true;
      break;
    default:
      return false;
      break;
  }
}

Template.quickCatForm.categoryFormTitle = function(){
  switch(Session.get('formState')){
    case('insert'):
      return 'Add New Quick Category';
      break;
    default:
      return 'Edit Existing Quick Category';
      break;
  }
}

//////////////////////Rendered
Template.quickCatForm.rendered = function(){
  if(Session.get('formState') =='edit'){
    var id = Session.get('operatedQuickCat');

    var category = Quickcategories.findOne({_id:id});
    if(category){
      $('#code').val(category.code);
      $('#desc').val(category.desc);
    } else {
      alert('Fail to retrieve quick category information');
    }
  }
}

//////////////////////Events
Template.quickCatForm.events = {
  'click input#cancelButton' : function(event){
    //$('div.form').slideToggle();
    resetForm();
    if(Session.get('formState')==='edit'){
      if($('div#itemOperation').length){
        $('div#itemOperation').hide();
        //Reset the session will reset the template.
        Session.set('quickCatOperation',null);
      }

      if($('#veil').length){
        $('#veil').hide();
      }
    }
  },

  'click input#addButton' : function(event){
    var code = $('#code').val().trim();
    var desc = $('#desc').val().trim();

    //validation
    if(code === ''){
      alert('Please fill in the code');
      return;
    }

    if(desc === ''){
      alert('Please fill in the description');
      return;
    }

    var obj = {
      'code' : code,
      'desc' : desc,
    }

    var id = Quickcategories.insert(obj);
    if(id){
      alert('Quick category succesfully registered');
      resetForm();
    }
  },

  'click input#saveButton' : function(event){
    var id = Session.get('operatedQuickCat');
    if(!id){
      alert('Fail to retrieve quick category information');
      return;
    }

    var code = $('#code').val().trim();
    var desc = $('#desc').val().trim();

    //validate the form. check for blanks
    if(code === ''){
      alert('Please fill in the code');
      return;
    }

    if(desc === ''){
      alert('Please fill in the description');
      return;
    }

    var count = Quickcategories.update(
      {_id : id},
      {
        $set : {
          code : code,
          desc : desc
        }
      }
    );

    if(count>0){
      alert('Quick Category succesfully updated');
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
