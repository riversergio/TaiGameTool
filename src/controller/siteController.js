const user = [];
module.exports = {
    home: function(req,res) {
        res.status(200).render('index');
    }
}