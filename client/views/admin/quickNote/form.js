Template.quickNoteForm.insertMode = function(){
  switch(Session.get('formState')){
    case('insert'):
      return true;
      break;
    default:
      return false;
      break;
  }
}

Template.quickNoteForm.categoryFormTitle = function() {
  switch(Session.get('formState')){
    case('insert'):
      return 'Add New Quick Notes';
      break;
    default:
      return 'Edit Existing Quick Notes';
      break;
  }
}

//////////////////////Rendered
Template.quickNoteForm.rendered = function(){
  var id = Session.get('operatedQuickNote');
  if(id){
    var note = Quicknotes.findOne({_id:id});
    //alert(button.displayText);
    if(note){
      //Existing quickbutton for the item
      Session.set('formState', 'exist');

      $('#displayText').val(note.displayText);
      $('#value').val(note.value);
    } else {
      Session.set('formState', 'new');
      //Add new quickbutton
      //alert('Fail to retrieve quick button information');
    }
  }
}

//////////////////////Events
Template.quickNoteForm.events = {
  'click input#cancelButton' : function(event){
    resetForm();

    Session.set('quickNoteOperation','');

    if($('div#itemOperation').length){
      $('div#itemOperation').hide();
    }

    if($('#veil').length){
      $('#veil').hide();
    }
  },

  'click input#saveButton' : function(event){
    var id = Session.get('operatedQuickNote');
    if(!id){
      alert('Fail to retrieve quick note information');
      return;
    }

    var displayText = $('#displayText').val().trim();
    var value = $('#value').val().trim();

    if(displayText === ''){
      alert('Please fill in the display text');
      return;
    }

    if(value === ''){
      alert('Please select the quick category');
      return;
    }else {
      //TODO:Monetize
      if(!parseFloat(value)){
        alert('Value must be a numeric');
        return;
      }
    }

    var note = Quicknotes.findOne({_id : id});
    alert(id);
    Quicknotes.update(
      {_id : note._id},
      {$set:
        {
          displayText : displayText,
          value : parseFloat(value)
        }
      },
      function(error){
        if(error){
          alert(error);
        }else{
          alert('Quick button succesfully registered');
        }

        resetForm();
        Session.set('quickNoteOperation','');

        //Close the dialog
        if($('div#itemOperation').length){
          $('div#itemOperation').hide();
        }

        if($('#veil').length){
          $('#veil').hide();
        }
      }
    );
  },

  'click input#addButton' : function(event){
    var displayText = $('#displayText').val().trim();
    var value = $('#value').val().trim();

    if(displayText === ''){
      alert('Please fill in the display text');
      return;
    }

    if(value === ''){
      alert('Please fill in the value');
      return;
    } else {
      //TODO:Monetize
      if(!parseFloat(value)){
        alert('Value must be a numeric');
        return;
      }
    }

    var obj = {
      'displayText' : displayText,
      'value' : parseFloat(value)
    };

    var id = Quicknotes.insert(obj);
    if(id){
      alert('Quick notes succesfully registered');
      //$('div.form').slideToggle();
      resetForm();

      Session.set('quickNoteOperation','');

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
