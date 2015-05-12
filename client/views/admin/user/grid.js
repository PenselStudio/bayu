Template.userGrid.users = function(){
  if(Session.get('isGridFiltered')){
    //alert('filtered');
    var selector = Session.get('filterSelector');
    return Meteor.users.find(selector, {sort : {username : 1}});
  } else {
    //alert('unfiltered');
    return Meteor.users.find({},{sort : {username : 1}});
  }
}

///////////////////////////Rendered
Template.userGrid.rendered = function(){
  Session.set('isGridFiltered',false);
  Session.set('filterSelector', null);
  initializeFilter();
}

//////////////////////////Events
Template.userGrid.events = {
  'click a.link' : function(event){
    var height = $(window).height() * 0.5;
    var width = $(window).width() * 0.5;

    var attr = 'width=960' + //width.toString();
    window.open('/user/' + this._id,'_blank', 'height='+ height.toString() +', width=' +width.toString());
  },

  'click input[name="filterType"]' : function(event){
    var type = getRadioValue("filterType");
    switch(type){
      case('username'):
      case('firstName'):
      case('lastName'):
      case('email'):
        hideAllFilterInput();
        $('#filterKey').show();
        break;
      case('privilege'):
        hideAllFilterInput();
        $('#privilege').show();
        break;
      default:
        break;
    }
  },

  'click button#clearBtn' : function(event){
    Session.set('isGridFiltered', false);
  },

  'click button#filterBtn' : function(event){
    Session.set('isGridFiltered', true);
    Session.set('filterSelector', getFilterSelector());
  }
}


////////////////////////Grid Filter tools
function initializeFilter(){
  //Init input type
  var elements = document.getElementsByName("filterType");
  for (var i = 0, l = elements.length; i < l; i++)
  {
    /*
    if (elements[i].value === 'desc'){
      //alert(elements[i]);
      elements[i].checked = true;
    }*/
    elements[i].checked = false;
  }

  //Init input appearances
  $('#filterKey').show();
  $('#privilege').hide();
}

function hideAllFilterInput(){
  //Init input appearances
  $('#filterKey').hide();
  $('#privilege').hide();
}

function getFilterSelector(){
  var type = getRadioValue("filterType");
  var key = '';
  var selector = {};

  switch(type){
    case('username'):
    case('firstName'):
    case('lastName'):
    case('email'):
      key = $('#filterKey').val().trim();
      selector[type] = {'$regex':key, '$options':'i'};
      break;
    case('privilege'):
      key = $('#privilege').val();
      selector['privilege'] = key;
      break;
    default:
      key = '';
      break;
  }

  return selector;
}
