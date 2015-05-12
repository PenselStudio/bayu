////////////////Data
Template.itemApp.templateHolder = function() {
  var app = Session.get('currentApp');
  switch(app){
    case('addNew'):
      return Template['itemForm'];
      break;
    case('grid'):
      return Template['itemGrid'];
      break;
    default:
      return null;
      break;  
  }
}

//////////////Created
Template.itemAdmin.created = function(){
  Session.set('formState','add');
  Session.set('searchKey', '');
  Session.set('currentApp','');
}

//////////////Rendered
Template.itemAdmin.rendered = function(){
  //$('div.form').hide();	
  $('div.suggestion').hide();
  
  //calculate the height of the omni
  var omniHeight = $('div.omni').height();
  var naviHeight = $('div.navi').height();
  
  $('div.app').css('top',(omniHeight+naviHeight).toString() +'px');
  
}

////////////Events
Template.itemSubmenu.events = {
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


