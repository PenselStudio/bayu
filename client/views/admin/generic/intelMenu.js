/////////////////Events
Template.intelMenu.events ={
  'click button#inventoryBtn' : function(event){
    Router.go('/analysis/inventory');
  },

  'click button#salesBtn' : function(event){
    Router.go('/analysis/sales');
  }
}
