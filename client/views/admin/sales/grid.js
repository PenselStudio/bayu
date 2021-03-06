Template.salesGrid.transactions = function(){
  if(Session.get('isGridFiltered')){
    //alert('filtered');
    var selector = Session.get('filterSelector');
    return Sales.find(selector, {sort : {date : -1}});
  } else {
    //alert('unfiltered');
    return Sales.find({},{sort : {date : -1}});
  }
}

Template.salesGrid.years = function(){
  var startYear = 2015;
  var obj = {};
  var arr = [];

  var date = new Date();
  for(i=startYear;i<=date.getFullYear();i++){
    obj = {year:i};
    arr.push(obj);
  }

  return arr;
}

///////////////////////////Events
Template.salesGrid.events = {
  'click a.link' : function(event){
    var height = $(window).height() * 0.5;
    var width = $(window).width() * 0.5;

    //var attr = 'width=960' + //width.toString();
    window.open('/sales/' + this._id,'_blank', 'height='+ height.toString() +', width=' +width.toString());
  },

  'click input[name="filterType"]' : function(event){
    var type = getRadioValue("filterType");
    switch(type){
      case('date'):
        hideAllFilterInput();
        $('#range').show();
        break;
      case('month'):
        hideAllFilterInput();
        $('#months').show();
        $('#years').show();
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

///////////////////////////Rendered
Template.salesGrid.rendered = function(){
  Session.set('isGridFiltered',false);
  Session.set('filterSelector', null);
  initializeFilter();
  setThisYearActive();
  $('#startDate').datepicker({format: "dd/mm/yyyy",orientation: "top auto"});
  $('#endDate').datepicker({format: "dd/mm/yyyy",orientation: "top auto"});
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
  $('#range').hide();
  $('#months').hide();
  $('#years').hide();
}

function setThisYearActive(){
  var date = new Date();
  var thisYear = date.getFullYear();

  $('#years').val(thisYear.toString());
}


function hideAllFilterInput(){
  //Init input appearances
  $('#range').hide();
  $('#months').hide();
  $('#years').hide();
}

function getFilterSelector(){
  var type = getRadioValue("filterType");
  var key = '';
  var selector = {};

  switch(type){
    case('date'):
      var startDate = $('#startDate').datepicker('getDate');
      var endDate = $('#endDate').datepicker('getDate');
      var lowerDate = new Date( startDate.getFullYear(),
                                startDate.getMonth(),
                                startDate.getDate(),
                                0,0,0,0);
      var upperDate = new Date( endDate.getFullYear(),
                                endDate.getMonth(),
                                endDate.getDate(),
                                23,59,59,999);
      selector[type] = {'$gte':lowerDate, '$lte':upperDate};
      break;
    case('month'):
      key = $('#months').val();

      var date = new Date();
      var month = parseInt(key) - 1;
      var start = new Date(parseInt($('#years').val()), month, 1);
      var end = new Date(parseInt($('#years').val()), month+1, 0);

      selector['date'] = {$gte : start, $lte : end};
      break;
    default:
      key = '';
      break;
  }

  return selector;
}
