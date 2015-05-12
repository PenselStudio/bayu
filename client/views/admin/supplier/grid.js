Template.supplierGrid.suppliers = function(){
  if(Session.get('isGridFiltered')){
    //alert('filtered');
    var selector = Session.get('filterSelector');
    return Suppliers.find(selector, {sort : {desc : 1}});
  } else {
    //alert('unfiltered');
    return Suppliers.find({},{sort : {desc : 1}});
  }
}

///////////////////////////Rendered
Template.supplierGrid.rendered = function(){
  Session.set('isGridFiltered',false);
  Session.set('filterSelector', null);
  initializeFilter();
}

//////////////////////////Events
Template.supplierGrid.events = {
  'click a.link' : function(event){
    var height = $(window).height() * 0.5;
    var width = $(window).width() * 0.5;

    var attr = 'width=960' + //width.toString();
    window.open('/supplier/' + this._id,'_blank', 'height='+ height.toString() +', width=' +width.toString());
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
}

function getFilterSelector(){
  var type = getRadioValue("filterType");
  var key = '';
  var selector = {};

  switch(type){
    case('desc'):
    case('code'):
    case('phone'):
    case('fax'):
    case('email'):
    case('rep'):
      key = $('#filterKey').val().trim();
      selector[type] = {'$regex':key, '$options':'i'};
      break;
    case('address'):
      key = $('#filterKey').val().trim();
      selector['$or'] =[
        {'address1' : {'$regex':key, '$options':'i'}},
        {'address2' : {'$regex':key, '$options':'i'}},
        {'address3' : {'$regex':key, '$options':'i'}},
        {'postcode' : {'$regex':key, '$options':'i'}}
      ];
      break;
      //{'$regex':key, '$options':'i'};
    default:
      key = '';
      break;
  }

  return selector;
}
