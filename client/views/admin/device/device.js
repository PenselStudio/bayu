////////////////Data
Template.deviceApp.templateHolder = function() {
  var app = Session.get('currentApp');
  switch(app){
    case('addNew'):
      return Template['deviceForm'];
      break;
    case('grid'):
      return Template['deviceGrid'];
      break;
    default:
      return null;
      break;
  }
}

//////////////Created
Template.deviceAdmin.created = function(){
  Session.set('formState','add');
  Session.set('searchKey', '');
  Session.set('currentApp','');
}

//////////////Rendered
Template.deviceAdmin.rendered = function(){
  //$('div.form').hide();
  $('div.suggestion').hide();

  //calculate the height of the omni
  var omniHeight = $('div.omni').height();
  var naviHeight = $('div.navi').height();

  $('div.app').css('top',(omniHeight+naviHeight).toString() +'px');

}

////////////Events
Template.deviceSubmenu.events = {
  'click button#addNew' : function(event){
     Session.set('formState', 'insert');
     //$('div.form').slideToggle();
     Session.set('currentApp', 'addNew');
  },

  'click button#grid' : function(event){
    //Reset form state
     Session.set('formState', '');
    //$('div.form').slideToggle();
     Session.set('currentApp', 'grid');
  }
}
