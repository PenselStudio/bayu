Template.deviceGrid.devices = function(){
  if(Session.get('isGridFiltered')){
    //alert('filtered');
    var selector = Session.get('filterSelector');
    return Devices.find(selector, {sort : {code : 1}});
  } else {
    //alert('unfiltered');
    return Devices.find({},{sort : {code : 1}});
  }
}

///////////////////////////Rendered
Template.deviceGrid.rendered = function(){
  Session.set('isGridFiltered',false);
  Session.set('filterSelector', null);
  initializeFilter();
}

//////////////////////////Events
Template.deviceGrid.events = {
  'click a.link' : function(event){
    var height = $(window).height() * 0.5;
    var width = $(window).width() * 0.5;

    var attr = 'width=960' + //width.toString();
    window.open('/device/' + this._id,'_blank', 'height='+ height.toString() +', width=' +width.toString());
  },

  'click input[name="filterType"]' : function(event){
    var type = getRadioValue("filterType");
    switch(type){
      case('desc'):
      case('code'):
      case('ipAddress'):
        hideAllFilterInput();
        $('#filterKey').show();
        break;
      case('type'):
        hideAllFilterInput();
        $('#type').show();
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
  $('#type').hide();
}

function hideAllFilterInput(){
  //Init input appearances
  $('#filterKey').hide();
  $('#type').hide();
}

function getFilterSelector(){
  var type = getRadioValue("filterType");
  var key = '';
  var selector = {};

  switch(type){
    case('desc'):
    case('code'):
    case('ipAddress'):
      key = $('#filterKey').val().trim();
      selector[type] = {'$regex':key, '$options':'i'};
      break;
    case('type'):
      key = $('#type').val();
      selector['type'] = key;
      break;
    default:
      key = '';
      break;
  }

  return selector;
}
