var routeConfig = {
        '/bar': {
            get: 'barController.query',
            post: 'barController.update',
            delete: 'barController.remove'
        },
        '/foo': {
            get: 'fooController.query',
            post: 'fooController.update'
        }
};

module.exports = routeConfig;