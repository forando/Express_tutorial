/**
 * Created by logosprog on 23.11.13.
 */
var customerDb = {};
var id_inc = 0;

exports.listCustomers = function(){
    return customerDb;
};

exports.addCustomer = function(customer){
    id_inc ++;
    customer.id = id_inc;
    customerDb[id_inc] = customer;
};

exports.getCustomerById = function(id){
    return customerDb[id];
};

exports.deleteCustomer = function(id){
    console.log(customerDb);
    delete customerDb[id];
    console.log(customerDb);
};

exports.updateCustomer = function(customer){
    customerDb[customer.id] = customer;
};