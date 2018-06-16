var Service = require('../models/serviceModel');
var _ = require('underscore');

/********************************************************************************************************************************************************** */
/*                                                              save service data
                                                    Use input:
                                                        service_name = "value"                                                                              */
/********************************************************************************************************************************************************** */
exports.save_services=function(req,res){
    Service.forge({
        service_name: req.body.service_name
    })
    .save()
    .then(function(service){
        res.send('Service added successfully');
    })
    .catch(function(err){
        res.send(err);
    })
}

/********************************************************************************************************************************************************** */
/*                                          Simple get all data from service table                                                                          */
/********************************************************************************************************************************************************** */

exports.get_all_services=function(req,res){
    Service.forge()
    .fetchAll()
    .then(function(service){
        // res.send(service.toJSON());
        res.send(service);
    })
    .catch(function(err){
        res.send(err);
    })
}

/********************************************************************************************************************************************************** */
/*                                                    get service data by id                                                                                */
/********************************************************************************************************************************************************** */

exports.get_service_data_by_id=function(req,res){
    new Service({
        'id' : req.params.service_id
    })
    .fetch()
    .then(function(service){
        // res.send(service.toJSON());
        res.send(service);
    })
    .catch(function(err){
        res.send(err);
    })
}

/********************************************************************************************************************************************************** */
/*                                                              Update service data                                                                         */
/********************************************************************************************************************************************************** */

exports.update_service_data=function(req,res){
    new Service({
        'id' : req.body.service_id
    })
    .save({
        service_name : req.body.service_name
    })
    .then(function(service){
        res.send('Service updated successfully');
    })
    .catch(function(err){
        res.send(err);
    })
}

/********************************************************************************************************************************************************** */
/*                                                              Delete service data                                                                         */
/********************************************************************************************************************************************************** */

exports.delete_service_data=function(req,res){
    new Service({
        'id' : req.params.service_id
    })
    .fetch()
    .then(function(service){
        service.destroy();
        res.send('Service deleted successfully');
    })
    .catch(function(err){
        res.send(err);
    })
}