//////////////////////Data
Template.quickButtonForm.insertMode = function(){
  switch(Session.get('quickButtonStat')){
    case('exist'):
      return true;
      break;
    case('new'):
      return false;
      break;
  }
}

Template.quickButtonForm.formTitle = function(){
  switch(Session.get('quickButtonStat')){
    case('new'):
      return 'Add New Quick Button';
      break;
    case('exist'):
      //var id = Session.get('operatedQuickButton')
      //var button = Quickbuttons.find(id);
      Session.set('quickButtonFormState','edit');
      return 'Edit Existing Quick Button';
      break;
  }
}

Template.quickButtonForm.quickCategories = function(){
  return Quickcategories.find({}, {sort : {desc : 1}});
}

//////////////////////Created
/*
Template.quickButtonForm.rendered = function(){
  var id = Session.get('operatedItem');

  if(id){
    var button = Quickbuttons.findOne({item:id});
    //alert(button.displayText);
    if(button){
      //Existing quickbutton for the item
      Session.set('quickButtonStat', 'exist');

      $('#displayTxt').val(button.displayText);
      $('#quickCategory').val(button.quickCategory);

      //populate the existing items info
    } else {
      Session.set('quickButtonStat', 'new');
      //Add new quickbutton
      //alert('Fail to retrieve quick button information');
    }
  }
}
*/

//////////////////////Rendered
Template.quickButtonForm.rendered = function(){
  //Quickbuttons always attached to item.
  if(Session.get('quickButtonFormState')=='edit'){
    var id = Session.get('operatedQuickButton');

    var button = Quickbuttons.findOne({_id:id});
    if(button){
      $('#displayText').val(button.displayText);
      $('#quickCategory').val(button.quickCategory);
    } else {
      alert('Fail to retrieve item information');
    }
  }
}

//////////////////////Events
Template.quickButtonForm.events = {
  'click input#cancelButton' : function(event){
    resetForm();

    Session.set('quickButtonOperation','');

    if($('div#itemOperation').length){
      $('div#itemOperation').hide();
    }

    if($('#veil').length){
      $('#veil').hide();
    }
  },

  'click input#saveButton' : function(event){
    var id = Session.get('operatedQuickButton');
    if(!id){
      alert('Fail to retrieve quick button information');
      return;
    }

    var displayText = $('#displayText').val().trim();
    var quickCategory = $('#quickCategory').val().trim();

    if(displayText === ''){
      alert('Please fill in the display text');
      return;
    }

    if(quickCategory === ''){
      alert('Please select the quick category');
      return;
    }

    var button = Quickbuttons.findOne({_id:id});
    Quickbuttons.update(
      {_id : button._id},
      {$set:
        {
          displayText : displayText,
          quickCategory : quickCategory
        }
      },
      function(error){
        if(error){
          alert(error);
        }else{
          alert('Quick button succesfully registered');
        }

        resetForm();
        Session.set('quickButtonOperation','');

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
    var quickCategory = $('#quickCategory').val().trim();
    var itemId = Session.get('operatedItem');

    if(displayText === ''){
      alert('Please fill in the display text');
      return;
    }

    if(quickCategory === ''){
      alert('Please select the quick category');
      return;
    }

    if(itemId === ''){
      alert('Failed to retrieve item information');
      return;
    }

    var obj = {
      'displayText' : displayText,
      'item' : itemId,
      'quickCategory' : quickCategory
    };

    var id = Quickbuttons.insert(obj);
    if(id){
      alert('Quick button succesfully registered');
      //$('div.form').slideToggle();
      resetForm();

      Session.set('itemOperation','');

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
