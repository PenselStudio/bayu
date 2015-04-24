PENSELSTUDIO = {};

PENSELSTUDIO.Money = function(floatVal){
  //this.denom = 100; //fixed for RM. need to parameterize
  this.denom = Settings.findOne({'key':'currencyDenom'})['value'];
  this.realVal = parseInt(floatVal * this.denom);
};


PENSELSTUDIO.Money.prototype = {
  add : function(floatVal){
    var tempVal = parseInt(floatVal * this.denom);
    this.realVal = this.realVal + tempVal;
  },

  substract : function(floatVal){
    var tempVal = parseInt(floatVal * this.denom);
    this.realVal = this.realVal - tempVal;
  },

  multiplyInt : function(val){
    this.realVal = this.realVal * parseInt(val);
  },

  getAsCommon : function(){
    return parseFloat(this.realVal/this.denom);
  },

  getAsReal : function(){
    return this.realVal;
  }
}
