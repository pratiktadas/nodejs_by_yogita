var Rule = require('../models/ruleModel');
var Client = require('../models/clientModel');
var Service = require('../models/serviceModel');
var db = require('../database');
var _ = require('underscore');
exports.get_rules_data=function(req,res){
    Rule.forge()
    .fetchAll()
    .then(function(rule){
        res.send(rule);
    })
    .catch(function(err){
        res.send(err);
    });
}

exports.save_rules_data=function(req,res){
    var rule = new Rule();
    rule.set(req.body.rule_data)
    .save()
    .then(function(rule){
        res.send('Rule added successfully');
    })
    .catch(function(err){
        res.send(err);
    });
}

exports.get_rules_data_by_id = function(req,res){
    // Rule.forge({
    //     id: req.params.rule_id
    // })
    // .fetch()
    // .then(function(rule){
    //     knex('rule')
    //     .join('client','rules.client_id','=','client.id')
    //     .select('rules.*','client.*')
    //     console.log('heyy');
    //     res.send(rule);
    // })
    // .catch(function(err){
    //     console.log('heyy');
    //     res.send(err);
    // });

    // db.knex('rules')
    // .join('client','rules.client_id','=','client.id')
    // //.join('service','rules.service_id','=','service.id')
    // .where('rules.id','=',req.params.rule_id)
    // .select('rules.*','client.*')
    // .then(r => {
    //     r.map((rules) => {
    //         console.log(rules);
    //     })
    // });
    
    Rule.forge({
        id: req.params.rule_id
    })
    .fetch()
    .then(function(rule){
        data = rule.toJSON();
        console.log(data.client_id);
        //res.send(rule);
        if(data){
            Client.forge({
                id: data.client_id
            })
            .fetch()
            .then(function(client){
                data.client = client;
                Service.forge({
                    id: data.service_id
                })
                .fetch()
                .then(function(service){
                    data.service = service;
                    res.send(data);
                })
                //res.send(data);
            })
        }
        
        
    })
    .catch(function(err){
        console.log('heyy');
        res.send(err);
    });
}