const requireAll = require('require-all');
const expressRouter = require('express').Router();
const pathType = require('./pathType');
const path = require('path');


module.exports = (app, options = {
    routes:'',
    controllers:''
}) => {
    bind(options);
    app.use('/', expressRouter)
};

function bind(options){
    let controllers = options.controllers;
    let routes = options.routes;

    if(!routes) return;
    if(!controllers) return;

    let cons = {};

    if(Array.isArray(controllers)) {
        for(let i = 0; i < controllers.length; i++) {
            if(pathType(controllers[i]) === 'file') {
                cons[controllers[i]] = require(controllers[i]);
            } else if(pathType(controllers[i]) === 'directory') {
                const nowControllers = requireAll({
                    dirname     : controllers[i],
                    excludeDirs :  /^\.(git|svn)$/,
                    recursive   : true
                });
                copyObject(cons, nowControllers);
            }
        }
    } else if(typeof controllers === 'string') {
        if(controllers === 'file') {
            cons[controllers] = require(controllers);
        } else if(pathType(controllers) === 'directory') {
            const nowControllers = requireAll({
                dirname     : controllers,
                excludeDirs :  /^\.(git|svn)$/,
                recursive   : true
            });
            copyObject(cons, nowControllers);
        }
    }

    loopRoutes(routes, cons);
}


const loopRoutes = (routes, controllers, rootRoute='') => {
    for(let key in routes) {
        const type = getType(routes[key]);
        if(type === 'object') {
            loopRoutes(routes[key], controllers, rootRoute + key);
        } else {
            if(type === 'string') {
                const controller = routes[key].split('.')[0];
                const action = routes[key].split('.')[1];
                if(action) {
                    expressRouter[key](rootRoute, controllers[controller][action]);
                } else if(controller) {
                    expressRouter[key](rootRoute, controllers[controller]);
                }
            }
        }
    }
};

function copyObject(obj, copy) {
    for(let key in copy) {
        obj[key] = copy[key];
    }
}

function getType(ele) {
    return Object.prototype.toString.call(ele).slice(8,-1).toLowerCase();
}