Template.quickCatGrid.categories = function(){
  return Quickcategories.find({},{sort : {desc : 1}});
}

//////////////////////////Events
Template.quickCatGrid.events = {
  'click a.link' : function(event){
    var height = $(window).height() * 0.5;
    var width = $(window).width() * 0.5;

    var attr = 'width=960' + //width.toString();
    window.open('/quickCategory/' + this._id,'_blank', 'height='+ height.toString() +', width=' +width.toString());
  }
}
