////////////////Data
Template.currencyApp.templateHolder = function() {
  var app = Session.get('currentApp');
  switch(app){
    case('prefix'):
      return Template['currencyPrefix'];
      break;
    case('denom'):
      return Template['currencyDenom'];
      break;
    default:
      return null;
      break;
  }
}

//////////////Created
Template.currencyAdmin.created = function(){
  Session.set('formState','add');
  Session.set('searchKey', '');
  Session.set('currentApp','');
}

//////////////Rendered
Template.currencyAdmin.rendered = function(){
  //$('div.form').hide();
  $('div.suggestion').hide();

  //calculate the height of the omni
  var omniHeight = $('div.omni').height();
  var naviHeight = $('div.navi').height();

  $('div.app').css('top',(omniHeight+naviHeight).toString() +'px');

}

////////////Events
Template.currencySubmenu.events = {
  'click button#prefix' : function(event){
     Session.set('formState', 'insert');
     //$('div.form').slideToggle();
     Session.set('currentApp', 'prefix');
  },

  'click button#denom' : function(event){
    //Reset form state
     Session.set('formState', '');
    //$('div.form').slideToggle();
     Session.set('currentApp', 'denom');
  }
}
