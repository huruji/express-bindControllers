module.exports = {
    query: function(req, res) {
        res.send('to display the info of foo').end();
    },
    update: function(req, res) {
        res.send('to update the info of bar').end();
    }
};