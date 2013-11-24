/**
 * Created by logosprog on 23.11.13.
 */
var util = require('util'),
    db = require('./../db.js');

exports.index = function(req, res){
    res.render('customer/index', {title: 'Customer List',
        customers: db.listCustomers()});
};

exports.create = function (req, res){
    console.log('CREATE!!!');
    res.render('customer/create', {title: 'Create Customer'});
};

exports.createCustomer = function (req, res){
    //req.params -> to get data from URI
    //req.query -> to get data query string (everything that goes after ? in URI)
    //req.body -> to get data from the Form (or HTTP body)

    //console.dir(req.files.picture);
    db.addCustomer({name: req.body.name, email: req.body.email,
        telephone: req.body.telephone, picture: req.files.picture.path});
    res.redirect('/customer');
};

exports.details = function (req, res){
    console.log('DETAILS!!!');
    res.render('customer/details', {title: 'Customer Details',
        customer: db.getCustomerById(req.params.id)});
};

exports.edit = function (req, res){
    res.render('customer/edit', {title: 'Edit Customer',
        customer: db.getCustomerById(req.params.id)});
};

exports.editCustomer = function (req, res){

    db.updateCustomer({id: req.body.id, name: req.body.name,
        email: req.body.email,telephone: req.body.telephone});
    res.redirect('/customer');
};

exports.delete = function (req, res){
    db.deleteCustomer(req.params.id);
    //res.redirect('/customer'); //for some reason it's not working here
};