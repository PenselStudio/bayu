Template.currencyPrefix.rendered = function(){
  var prefix = Settings.findOne({'key' : 'currencyType'});
  var name = Settings.findOne({'key' : 'currencyName'});

  $('#prefix').val(prefix.value);
  $('#name').val(name.value);
}
