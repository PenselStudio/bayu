
/////////////////////////////////Created
Template.salesTrend.created = function(){
    Session.set('rangeType', null);
}

/////////////////////////////////Rendered
Template.salesTrend.rendered = function(){
    $('input[name="filterType"][value="date"]').prop('checked',true);

    $('#startDate').datepicker({startView: 0, minViewMode: 0, orientation: "top auto", format: "dd/mm/yyyy"});
    $('#endDate').datepicker({startView: 0, minViewMode: 0, orientation: "top auto", format: "dd/mm/yyyy"});
}

/////////////////////////////////Events
Template.salesTrend.events = {
    'click button#generateBtn' : function(event){
        if(!($('#startDate').val() != '' && $('#endDate').val() != '')){
            alert('Please fill in the date range');
            return;
        }

        var type = getRadioValue("filterType");

        switch(type){
            case('date'):
                drawGraphDailyTrend();
                break;
            case('month'):
                drawGraphMonthlyTrend();
                break;
            case('year'):
                drawGraphYearlyTrend();
                break;
        }
    },

    'click input[name="filterType"]' : function(event) {
        var type = getRadioValue("filterType");

        $('#startDate').datepicker('remove');
        $('#endDate').datepicker('remove');

        $('#startDate').val('');
        $('#endDate').val('');

        switch (type) {
            case('date'):
                $('#startDate').datepicker({startView: 0, minViewMode: 0, orientation: "top auto", format: "dd/mm/yyyy"});
                $('#endDate').datepicker({startView: 0, minViewMode: 0, orientation: "top auto", format: "dd/mm/yyyy"});
                break;
            case('month'):
                $('#startDate').datepicker({startView: 1, minViewMode: 1, orientation: "top auto", format: "mm/yyyy"});
                $('#endDate').datepicker({startView: 1, minViewMode: 1, orientation: "top auto", format: "mm/yyyy"});
                break;
            case('year'):
                $('#startDate').datepicker({startView: 2, minViewMode: 2, orientation: "top auto", format: "yyyy"});
                $('#endDate').datepicker({startView: 2, minViewMode: 2, orientation: "top auto", format: "yyyy"});
            default:
                break;
        }
    }
}

function drawGraphDailyTrend(){
    var startDate = $('#startDate').datepicker('getDate');

    var endDate = new Date(
        $('#endDate').datepicker('getDate').getFullYear(),
        $('#endDate').datepicker('getDate').getMonth(),
        $('#endDate').datepicker('getDate').getDate(),
        23,59,59,999
    );

    var startDateMt = moment(startDate);
    var endDateMt = moment(endDate);

    //using momentjs to find the total amount of days in the range.
    var diffDays = endDateMt.diff(startDateMt,'days')+1;
    var startingDate = $('#startDate').datepicker('getDate').getDate();

    Meteor.call(
        'getDailySalesTrendData',
        startDate,
        endDate,
        function(error, arr){
            if(error){
                alert(error);
            }

            //construct data;
            //labels must be the date from start to end

            var labels = [];
            var dataArr = [];

            //initialize the data tables
            for(var j=startingDate; j<(startingDate + diffDays); j++){
                labels.push(j.toString());
                dataArr.push(0);
            }

            //filling in the data tables
            for(var i=0; i<arr.length; i++){
                var result = $.inArray(arr[i]._id.date.toString(),labels);
                if(result != -1){
                   dataArr[result] =  arr[i].totalSales;
                }
            }

            var data = {
                labels : labels,
                datasets: [
                    {
                        label: "Daily Trend",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: dataArr
                    }
                ]
            };

            //redraw the graph
            var width = $('.dataGraph').width();
            var height = $(window).height() * 0.75;
            var ctx = $("#theChart").get(0).getContext("2d");
            ctx.canvas.width = width;
            ctx.canvas.height = height;
            var myLineChart = new Chart(ctx).Line(data);
            $('.dataGraph').css('background-color','#fdf9d6');
        }
    )

}

function drawGraphMonthlyTrend(){
    var startDate = $('#startDate').datepicker('getDate');

    var endDate = new Date(
        $('#endDate').datepicker('getDate').getFullYear(),
        $('#endDate').datepicker('getDate').getMonth() + 1,
        0,
        23,59,59,999
    );

    var startDateMt = moment(startDate);
    var endDateMt = moment(endDate);

    //using momentjs to find the total amount of days in the range.
    var diffMonths = endDateMt.diff(startDateMt,'months')+1;
    var startingMonth = $('#startDate').datepicker('getDate').getMonth();

    //TODO: retrieve data from a passively collected collection. Cheap and efficient
    Meteor.call(
        'getMonthlySalesTrendData',
        startDate,
        endDate,
        function(error, arr){
            if(error){
                alert(error);
            }

            //construct data;
            //labels must be the date from start to end
            var labels = [];
            var dataArr = [];

            //initialize the data tables
            for(var j=startingMonth; j<(startingMonth + diffMonths); j++){
                labels.push((j+1).toString());
                dataArr.push(0);
            }

            //filling in the data tables
            for(var i=0; i<arr.length; i++){
                var result = $.inArray((arr[i]._id.month).toString(),labels);
                if(result != -1){
                    dataArr[result] =  arr[i].totalSales;
                }
            }

            /*
            for(var i=0; i<arr.length; i++){
                var tempStr = arr[i]._id.month.toString() + '/' + arr[i]._id.year.toString();
                var value = arr[i].totalSales;

                labels.push(tempStr);
                dataArr.push(value);
            }*/

            var data = {
                labels : labels,
                datasets: [
                    {
                        label: "Monthly Trend",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: dataArr
                    }
                ]
            };

            //redraw the graph
            var width = $('.dataGraph').width();
            var height = $(window).height() * 0.75;
            var ctx = $("#theChart").get(0).getContext("2d");
            ctx.canvas.width = width;
            ctx.canvas.height = height;
            var myLineChart = new Chart(ctx).Line(data);
            $('.dataGraph').css('background-color','#fdf9d6');
        }
    )
}

function drawGraphYearlyTrend(){
    var startDate = new Date(
        $('#startDate').datepicker('getDate').getFullYear(),
        0,
        1,
        0,0,0,0
    );

    var endDate = new Date(
        $('#endDate').datepicker('getDate').getFullYear(),
        11,
        31,
        23,59,59,999
    );

    var startDateMt = moment(startDate);
    var endDateMt = moment(endDate);

    //using momentjs to find the total amount of days in the range.
    var diffYears = endDateMt.diff(startDateMt,'years')+1;
    var startingYear = $('#startDate').datepicker('getDate').getFullYear();

    //TODO: retrieve data from a passively collected collection. Cheap and efficient
    Meteor.call(
        'getYearlySalesTrendData',
        startDate,
        endDate,
        function(error, arr){
            if(error){
                alert(error);
            }

            alert(arr.length);

            //construct data;
            //labels must be the date from start to end
            var labels = [];
            var dataArr = [];

            //initialize the data tables
            for(var j=startingYear; j<(startingYear + diffYears); j++){
                labels.push((j).toString());
                dataArr.push(0);
            }

            //filling in the data tables
            for(var i=0; i<arr.length; i++){
                var result = $.inArray((arr[i]._id.year).toString(),labels);
                if(result != -1){
                    dataArr[result] =  arr[i].totalSales;
                }
            }

            var data = {
                labels : labels,
                datasets: [
                    {
                        label: "Yearly Trend",
                        fillColor: "rgba(220,220,220,0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: dataArr
                    }
                ]
            };

            //redraw the graph
            var width = $('.dataGraph').width();
            var height = $(window).height() * 0.75;
            var ctx = $("#theChart").get(0).getContext("2d");
            ctx.canvas.width = width;
            ctx.canvas.height = height;
            var myLineChart = new Chart(ctx).Line(data);
            $('.dataGraph').css('background-color','#fdf9d6');
        }
    )
}