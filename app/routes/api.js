const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const fs = require('fs');
const feedbackData = require('../data/feedback.json');

router.get('/api', (req,res)=>{
  res.json(feedbackData)
})

router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended : false}))
