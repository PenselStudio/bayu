if (Meteor.isServer) {
  Meteor.startup(function() {

    //System settings parameters.
    initCurrency();

    //Create default admin
    createDefaultAdmin();

    //Populate dumb data
    populateDumbData();
  });
}
