mongoClient = Npm.require('mongodb').MongoClient;
var Future = Npm.require('fibers/future');

Meteor.methods({
    getDailySalesTrendData : function(startDate, endDate){
        var pipeline =[
            {$match:
                {date : {$gte: startDate, $lte: endDate}}
            },
            {$sort: {
                date: -1
                }
            },
            {$group: {
                _id: {date: {$dayOfMonth: "$date"}, month: {$month: "$date"}, year: {$year: "$date"}},
                totalSales: {$sum: "$grandTotal"},
                count: {$sum: 1}
                 }
            }
        ];

        var results = Sales.aggregate(pipeline);
        //console.log(results);
        return results;
    },

    getMonthlySalesTrendData : function(startDate, endDate){
        var pipeline =[
            {$match:
                {date : {$gte: startDate, $lte: endDate}}
            },
            {$sort:
                {date: -1}
            },
            {$group: {
                _id: {month: {$month: "$date"}, year: {$year: "$date"}},
                totalSales: {$sum: "$grandTotal"},
                count: {$sum: 1}
                }
            }
        ];

        var results = Sales.aggregate(pipeline);
        //console.log(results);
        return results;
    },

    getYearlySalesTrendData : function(startDate, endDate){
        var pipeline =[
            {$match:
            {date : {$gte: startDate, $lte: endDate}}
            },
            {$sort:
            {date: -1}
            },
            {$group: {
                _id: {year: {$year: "$date"}},
                totalSales: {$sum: "$grandTotal"},
                count: {$sum: 1}
                }
            }
        ];

        var results = Sales.aggregate(pipeline);
        console.log(results);
        return results;
    }
});


//Example of wrapAsync function for future reference. do not delete
/*

//Here is from the meteor method
 getDailySalesTrendDataAsync : function(startDate, endDate){
 //TODO: Parameterization of the darned db server
 var asyncDataFunc = Meteor.wrapAsync(getDailySalesTrendData);
 var result = asyncDataFunc(startDate,endDate);
 console.log('SHIT');
 console.log(result);
 return result;
 }

function getDailySalesTrendData(startDate, endDate, callback){
    mongoClient.connect('mongodb://127.0.0.1:27017/posDev', function(err,db){
        if(!err) {
            var sales = db.collection('sales');
            sales.aggregate(
                [
                    {
                        $group: {
                            _id: {month: {$month: "$date"}, year: {$year: "$date"}},
                            totalSales: {$sum: "$grandTotal"},
                            count: {$sum: 1}
                        }
                    }
                ]
            ).toArray(function (err, docs) {
                    console.log(docs);
                    db.close();
                    callback(err, docs);
            });
        }
    });
}
    */