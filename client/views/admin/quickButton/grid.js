Template.quickButtonGrid.buttons = function(){
  return Quickbuttons.find({},{sort : {displayText : 1}});
}

//////////////////////////Events
Template.quickButtonGrid.events = {
  'click a.link' : function(event){
    var height = $(window).height() * 0.5;
    var width = $(window).width() * 0.5;

    var attr = 'width=960' + //width.toString();
    window.open('/quickButton/' + this._id,'_blank', 'height='+ height.toString() +', width=' +width.toString());
  }
}
