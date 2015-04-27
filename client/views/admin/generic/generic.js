/////////////////Events
Template.moduleMenu.events ={
  'click button#itemBtn' : function(event){
    Router.go('/admin/item');
  },

  'click button#supplierBtn' : function(event){
    Router.go('/admin/supplier');
  },

  'click button#unitBtn' : function(event){
    Router.go('/admin/unit');
  },

  'click button#categoryBtn' : function(event){
    Router.go('/admin/category');
  },

  'click button#salesBtn' : function(event){
    Router.go('/admin/sales');
  },

  'click button#adjustBtn' : function(event){
    Router.go('/admin/adjust');
  },

  'click button#receiveBtn' : function(event){
    Router.go('/admin/receive');
  },

  'click button#quickCatBtn' : function(event){
    Router.go('/admin/quickCategory');
  },

  'click button#quickButtonBtn' : function(event){
    Router.go('/admin/quickButton');
  },

  'click button#quickNoteBtn' : function(event){
    Router.go('/admin/quickNote');
  },

  'click button#taxBtn' : function(event){
    Router.go('/admin/tax');
  },

  'click button#deviceBtn' : function(event){
    Router.go('/admin/device');
  },

  'click button#userBtn' : function(event){
    Router.go('/admin/user');
  }
}
