//use url :http://127.0.0.1:3000/login/API NAME

var Client = require('../models/clientModel');
var _ =require('underscore');

/********************************************************************************************************************************************************** */
/*                                          Simple get all data from client table                                                                        */
/********************************************************************************************************************************************************** */
exports.get_client_data=function(req,res){
    Client.forge()
    .fetchAll()
    .then(function(client){
        res.send(client.toJSON());
    })
    .catch(function(err){
        res.send(err);
    })
}

/********************************************************************************************************************************************************** */
/*                                           save client data with auto generating client code and data without object
                                                    Use input:
                                                                client_name = "value"
                                                                city = "value"
                                                                country = "value"                                                                            */
/********************************************************************************************************************************************************** */
exports.save_client_data=function(req,res){
    var last_client_code;
    Client.forge()
    .orderBy('id','DESC')
    .fetch()
    .then(function(client){
        let client_data = client.toJSON();
        var last_client_code=(client_data.client_code).substr(1);
        console.log(last_client_code);
        var series = parseInt(last_client_code) + 1;
        series = String(series);
        console.log(series.length);
        if(series.length == 1){
            console.log('length 1');
            series = 'C000' + series;
        }else if(series.length == 2){
            console.log('length 2');
            series = 'C00' + series;
        }else if(series.length == 3){
            console.log('length 3');
            series = 'C0' + series;
        }

        Client.forge({
            client_code: series,
            client_name: req.body.client_name,
            city: req.body.city,
            country: req.body.country
        })
        .save()
        .then(function(client){
            res.send('Client Added Successfully');
        })
        .catch(function(err){
            res.send('Something Went Wrong, Please Try Again...!!');
        })
    });
}

/********************************************************************************************************************************************************** */
/*                                           get last inserted row frpm client table                                                                        */
/********************************************************************************************************************************************************** */
exports.get_last_client_code=function(req,res){
    Client.forge()
    .orderBy('id','DESC')
    .fetch()
    .then(function(client){
        let client_data = client.toJSON();
        var last_client_code=(client_data.client_code).substr(1);
        console.log(last_client_code);
        var series = parseInt(last_client_code) + 1;
        series = String(series);
        console.log(series.length);
        if(series.length == 1){
            console.log('length 1');
            series = 'C000' + series;
        }else if(series.length == 2){
            console.log('length 2');
            series = 'C00' + series;
        }else if(series.length == 3){
            console.log('length 3');
            series = 'C0' + series;
        }
        console.log(series);
        res.send(client.toJSON());
    });
}

/********************************************************************************************************************************************************** */
/*                                           save client data, data in the form of object (mentioning all columns individually)
                                                    Use input:
                                                                {
                                                                    "client_data": {
                                                                        "client_name" : "iram",
                                                                        "city": "bangalore",
                                                                        "country":"india"
                                                                    }
                                                                }                                                                                           */
/********************************************************************************************************************************************************** */
exports.save_client_data_by_object=function(req,res){
    client_data = req.body.client_data;
    console.log(client_data);
    Client.forge({
        client_code: 'C0006',
        client_name: client_data.client_name,
        city: client_data.city,
        country: client_data.country
    })
    .save()
    .then(function(client){
        res.send('Client Added Successfully');
    })
    .catch(function(err){
        res.send('Something Went Wrong... Please Try Again...!!');
    })
}
/********************************************************************************************************************************************************** */
/*                                                                save multiple client data 
                                                                Use input:
                                                                {
                                                                    "client_data": [
                                                                        {
                                                                            "client_name" : "a",
                                                                            "city": "b",
                                                                            "country" : "c"
                                                                        },
                                                                        {
                                                                            "client_name" : "aa",
                                                                            "city" : "bb",
                                                                            "country" : "cc"
                                                                        }
                                                                    ]
                                                                }                                                                                           */
/********************************************************************************************************************************************************** */
exports.save_multiple_client_data_by_object=function(req,res){
    client_data = req.body.client_data;
    console.log(client_data);
    for(var i=0;i<client_data.length;i++){
        Client.forge({
            //client_code: 'C0004',
            client_name: client_data[i].client_name,
            city: client_data[i].city,
            country: client_data[i].country
        })
        .save()
        .then(function(client){
            res.send('Client Added Successfully');
        })
        .catch(function(err){
            res.send('Something Went Wrong... Please Try Again...!!');
        })
    }
}

/********************************************************************************************************************************************************** */
/*                                           save client data through direct object (without mentioning columns)
                                                    Use input:
                                                                {
                                                                    "client_data": {
                                                                        "client_name" : "iram",
                                                                        "city": "bangalore",
                                                                        "country":"india"
                                                                    }
                                                                }                                                                                          */
/********************************************************************************************************************************************************** */
exports.save_client_data_through_direct_object=function(req,res){
    client_data=req.body.client_data;
    var client = new Client();
    client.set(client_data)
    .save()
    .then(function(client){
        res.send(client);
    })
    .catch(function(err){
        res.send(err);
    })
}