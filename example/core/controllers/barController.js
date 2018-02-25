module.exports = {
    query: function(req, res) {
        res.send('to display the info of bar').end();
    },
    update: function(req, res) {
        res.send('to update the info of bar').end();
    },
    remove: function(req, res) {
        res.send('to remove the info of bar').end();
    }
};