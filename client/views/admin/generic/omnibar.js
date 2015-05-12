Template.omnibar.results = function(){
  var searchKey = Session.get('searchKey');
  if(searchKey){
    //Search from Items collection
    var results = Items.find({barcode :{ '$regex' : searchKey, '$options':'i'}}).fetch();
    var descResults = Items.find({desc :{ '$regex' : searchKey, '$options':'i'}}).fetch();
    var arr = new Array();
    //TODO: do not show results if result size is too large
    var length = results.length;
    for(var i=0; i<length;i++){
      var obj = {};
      obj['keyword'] = results[i].barcode;
      obj['type'] = 'barcode';
      obj['id'] = results[i]._id;
      arr.push(obj);
    }

    length = descResults.length;
    for(var i=0; i<length;i++){
      var obj = {};
      obj['keyword'] = descResults[i].desc;
      obj['type'] = 'description';
      obj['id'] = descResults[i]._id;
      arr.push(obj);
    }

    return arr;
  }
}

/////////////////Events
Template.omnibar.events = {
  'click input.searchBtn' : function(event){
    var input = $('input.searchTxt').val().trim();
    Session.set('searchKey', input);
    if(input != '' && input != null){
      //show the div
      $('div.suggestion').show();
    }
  },

  'click button#closeSuggBtn' : function(event){
     $('div.suggestion').hide();
  },

  'click a.suggLink' : function(event){
     //window.open('/item/' + this.id, '_blank'); //for new tab
     var height = $(window).height() * 0.5;
     var width = $(window).width() * 0.5;
     //alert(height);
     //window.open('/item/' + this.id, 'Item Information', 'height:"' + height.toString() + 'px";width:"' + width.toString() + '"');
     window.open('/item/' + this.id,'_blank', 'height='+ height.toString() +', width=' +width.toString())
  },

  'keyup input.searchTxt' : function(event){
    var input = $('input.searchTxt').val().trim();
    Session.set('searchKey', input);
    if(input != '' && input != null){
      //show the div
      $('div.suggestion').show();
    }else{
      $('div.suggestion').hide();
    }
  }
}
