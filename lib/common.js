getRadioValue = function getRadioValue(name){
  var elements = document.getElementsByName(name);
  for (var i = 0, l = elements.length; i < l; i++)
  {
    if (elements[i].checked)
    {
      return elements[i].value;
    }
  }

  return null;
}

registerClockUpdate = function registerClockUpdate() {
  Meteor.setInterval(function() {
    Session.set('currentTime', getSimpleCurrentTime());
  },1000);

  return null;
}

getCurrentTime = function getCurrentTime() {
  var monthNames = [ "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December" ];

  var date = new Date();

  var day = date.getDate().toString();
  var month =  monthNames[date.getMonth()];
  var year = date.getFullYear().toString();

  var hour = date.getHours().toString();
  var min = date.getMinutes().toString();
  if(min.length<=1) {
    min = "0" + min;
  }

  var sec = date.getSeconds().toString();

  return hour + ':' + min + ', ' + day + ' ' + month + ' ' + year;
}

getSimpleCurrentTime = function getSimpleCurrentTime() {
  var date = new Date();
  var hour = date.getHours().toString();
  var min = date.getMinutes().toString();
  if(min.length<=1) {
    min = "0" + min;
  }

  return hour + ':' + min;
}
