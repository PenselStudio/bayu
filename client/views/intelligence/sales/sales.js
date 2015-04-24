////////////////Data
Template.salesIntelApp.templateHolder = function() {
    var app = Session.get('currentApp');
    switch(app){
        case('report'):
            return Template['salesReport'];
            break;
        case('trend'):
            return Template['salesTrend'];
            break;
        default:
            return null;
            break;
    }
}

//////////////Created
Template.salesIntel.created = function(){
    Session.set('searchKey', '');
    Session.set('currentApp','');
}

//////////////Rendered
Template.salesIntel.rendered = function(){
    //$('div.form').hide();
    $('div.suggestion').hide();

    //calculate the height of the omni
    var omniHeight = $('div.omni').height();
    var naviHeight = $('div.navi').height();

    $('div.app').css('top',(omniHeight+naviHeight).toString() + 'px');
}

Template.salesIntelSubmenu.events = {
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
