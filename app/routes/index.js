let express = require('express');
let router = express.Router();

router.get('/', function(req, res) {
  res.render('index', {
    pageTitle: 'Chat',
    pageID: 'chat'
  });

});

module.exports = router;
