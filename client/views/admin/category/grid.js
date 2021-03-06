Template.categoryGrid.categories = function(){
  if(Session.get('isGridFiltered')){
    //alert('filtered');
    var selector = Session.get('filterSelector');
    return Categories.find(selector, {sort : {desc : 1}});
  } else {
    //alert('unfiltered');
    return Categories.find({},{sort : {desc : 1}});
  }
}

//////////////////////////Events
Template.categoryGrid.events = {
  'click a.link' : function(event){
    var height = $(window).height() * 0.5;
    var width = $(window).width() * 0.5;

    var attr = 'width=960' + //width.toString();
    window.open('/category/' + this._id,'_blank', 'height='+ height.toString() +', width=' +width.toString());
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
Template.categoryGrid.rendered = function(){
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
}

function getFilterSelector(){
  var type = getRadioValue("filterType");
  var key = '';
  var selector = {};

  switch(type){
    case('desc'):
    case('code'):
      key = $('#filterKey').val().trim();
      selector[type] = {'$regex':key, '$options':'i'};
      break;
    default:
      key = '';
      break;
  }

  return selector;
}
