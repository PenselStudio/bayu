Template.itemGrid.items = function(){
  if(Session.get('isGridFiltered')){
    //alert('filtered');
    var selector = Session.get('filterSelector');
    return Items.find(selector, {sort : {desc : 1}});
  } else {
    //alert('unfiltered');
    return Items.find({},{sort : {desc : 1}});
  }
}

Template.itemGrid.categories = function(){
  return Categories.find({},{sort:{desc:1}});
}

Template.itemGrid.units = function(){
  return Units.find({}, {sort : {desc : 1}});
}

Template.itemGrid.suppliers = function(){
  return Suppliers.find({}, {sort : {desc : 1}});
}

///////////////////////////Rendered
Template.itemGrid.rendered = function(){
  Session.set('isGridFiltered',false);
  Session.set('filterSelector', null);
  initializeFilter();
}

//////////////////////////Events
Template.itemGrid.events = {
  'click a.link' : function(event){
    var height = $(window).height() * 0.5;
    var width = $(window).width() * 0.5;

    var attr = 'width=960' + //width.toString();
    window.open('/item/' + this._id,'_blank', 'height='+ height.toString() +', width=' +width.toString());
  },

  'click input[name="filterType"]' : function(event){
    var type = getRadioValue("filterType");
    switch(type){
      case('desc'):
      case('barcode'):
      case('price'):
      case('cost'):
        hideAllFilterInput();
        $('#filterKey').show();
        break;
      case('category'):
        hideAllFilterInput();
        $('#category').show();
        break;
      case('supplier'):
        hideAllFilterInput();
        $('#supplier').show();
        break;
      case('unit'):
        hideAllFilterInput();
        $('#unit').show();
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
  $('#supplier').hide();
  $('#category').hide();
  $('#unit').hide();
}

function hideAllFilterInput(){
  //Init input appearances
  $('#filterKey').hide();
  $('#supplier').hide();
  $('#category').hide();
  $('#unit').hide();
}

function getFilterSelector(){
  var type = getRadioValue("filterType");
  var key = '';
  var selector = {};

  switch(type){
    case('desc'):
    case('barcode'):
    case('price'):
    case('cost'):
      key = $('#filterKey').val().trim();
      selector[type] = {'$regex':key, '$options':'i'};
      break;
    case('category'):
      key = $('#category').val();
      selector['category'] = key;
      break;
    case('supplier'):
      key = $('#supplier').val();
      selector['supplier'] = key;
      break;
    case('unit'):
      key = $('#unit').val();
      selector['unit'] = key;
      break;
    default:
      key = '';
      break;
  }

  return selector;
}
