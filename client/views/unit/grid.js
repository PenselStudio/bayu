Template.unitGrid.units = function(){
  if(Session.get('isGridFiltered')){
    //alert('filtered');
    var selector = Session.get('filterSelector');
    return Units.find(selector, {sort : {desc : 1}});
  } else {
    //alert('unfiltered');
    return Units.find({},{sort : {desc : 1}});
  }
}

Template.unitGrid.bases = function(){
  return Units.find({},{sort : {desc : 1}});
}

//////////////////////////Events
Template.unitGrid.events = {
  'click a.link' : function(event){
    var height = $(window).height() * 0.5;
    var width = $(window).width() * 0.5;

    var attr = 'width=960' + //width.toString();
    window.open('/unit/' + this._id,'_blank', 'height='+ height.toString() +', width=' +width.toString());
  },

  'click input[name="filterType"]' : function(event){
    var type = getRadioValue("filterType");
    switch(type){
      case('baseUnit'):
        hideAllFilterInput();
        $('#baseUnit').show();
        break;
      default:
        hideAllFilterInput();
        $('#filterKey').show();
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

///////////////////////////Rendered
Template.unitGrid.rendered = function(){
  Session.set('isGridFiltered',false);
  Session.set('filterSelector', null);
  initializeFilter();
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
  $('#baseUnit').hide();
}

function hideAllFilterInput(){
  //Init input appearances
  $('#filterKey').hide();
  $('#baseUnit').hide();
}

function getFilterSelector(){
  var type = getRadioValue("filterType");
  var key = '';
  var selector = {};

  switch(type){
    case('baseUnit'):
      key = $('#bases').val().trim();
      selector[type] = key;
      break
    default:
      key = $('#filterKey').val().trim();
      selector[type] = {'$regex':key, '$options':'i'};
      break;
  }

  return selector;
}
