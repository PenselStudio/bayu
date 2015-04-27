////////////////Data
Template.profitIntelApp.templateHolder = function() {
    var app = Session.get('currentApp');
    switch(app){
        case('report'):
            return Template['profitReport'];
            break;
        case('trend'):
            return Template['profitTrend'];
            break;
        default:
            return null;
            break;
    }
}

//////////////Created
Template.profitIntel.created = function(){
    Session.set('searchKey', '');
    Session.set('currentApp','');
}

//////////////Rendered
Template.profitIntel.rendered = function(){
    //$('div.form').hide();
    $('div.suggestion').hide();

    //calculate the height of the omni
    var omniHeight = $('div.omni').height();
    var naviHeight = $('div.navi').height();

    $('div.app').css('top',(omniHeight+naviHeight).toString() + 'px');
}

Template.profitIntelSubmenu.events = {
    'click button#trendBtn' : function(event){
        Session.set('formState', 'insert');
        //$('div.form').slideToggle();
        Session.set('currentApp', 'trend');
    },

    'click button#reportBtn' : function(event){
        //Reset form state
        Session.set('formState', '');
        //$('div.form').slideToggle();
        Session.set('currentApp', 'report');
    }
}
