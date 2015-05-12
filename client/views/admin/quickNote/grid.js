Template.quickNoteGrid.notes = function(){
  return Quicknotes.find({},{sort : {displayText : 1}});
}

//////////////////////////Events
Template.quickNoteGrid.events = {
  'click a.link' : function(event){
    var height = $(window).height() * 0.5;
    var width = $(window).width() * 0.5;

    var attr = 'width=960' + //width.toString();
    window.open('/quickNote/' + this._id,'_blank', 'height='+ height.toString() +', width=' +width.toString());
  }
}
