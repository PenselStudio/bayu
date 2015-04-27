////////////////Data
Template.categoryApp.templateHolder = function() {
  var app = Session.get('currentApp');
  switch(app){
    case('addNew'):
      return Template['categoryForm'];
      break;
    case('grid'):
      return Template['categoryGrid'];
      break;
    default:
      return null;
      break;  
  }
}

//////////////Created
Template.categoryAdmin.created = function(){
  Session.set('formState','add');
  Session.set('searchKey', '');
  Session.set('currentApp','');
}

//////////////Rendered
Template.categoryAdmin.rendered = function(){
  //$('div.form').hide();	
  $('div.suggestion').hide();
  
  //calculate the height of the omni
  var omniHeight = $('div.omni').height();
  var naviHeight = $('div.navi').height();
  
  $('div.app').css('top',(omniHeight+naviHeight).toString() + 'px');  
}

Template.categorySubmenu.events = {
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
