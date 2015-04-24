//////////////////////Data
Template.categoryForm.insertMode = function(){
  switch(Session.get('formState')){
    case('insert'):
      return true;
      break;
    default:
      return false;
      break;
  }
}

Template.categoryForm.categoryFormTitle = function(){
  switch(Session.get('formState')){
    case('insert'):
      return 'Add New Category';
      break;
    default:
      return 'Edit Existing Category';
      break;
  }
}

//////////////////////Rendered
Template.categoryForm.rendered = function(){
  if(Session.get('formState') =='edit'){
    var id = Session.get('operatedCategory');

    var category = Categories.findOne({_id:id});
    if(category){
      $('#code').val(category.code);
      $('#desc').val(category.desc);
    } else {
      alert('Fail to retrieve category information');
    }
  }
}

//////////////////////Events
Template.categoryForm.events = {
  'click input#cancelButton' : function(event){
     //$('div.form').slideToggle();
     resetForm();
     if(Session.get('formState')==='edit'){
       if($('div#itemOperation').length){
         $('div#itemOperation').hide();
         //Reset the session will reset the template.
         Session.set('categoryOperation',null);
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

    var id = Categories.insert(obj);
    if(id){
      alert('Category succesfully registered');
      resetForm();
    }
  },

  'click input#saveButton' : function(event){
    var id = Session.get('operatedCategory');
    if(!id){
      alert('Fail to retrieve category information');
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

    var count = Categories.update(
      {_id : id},
      {
        $set : {
          code : code,
          desc : desc
        }
      }
    );

    if(count>0){
      alert('Category succesfully updated');
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
