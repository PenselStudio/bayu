Template.currencyDenom.rendered = function(){
  var settings = Settings.findOne({'key' : 'currencyDenom'});
  $('#denomSelect').val(settings.value);
}
