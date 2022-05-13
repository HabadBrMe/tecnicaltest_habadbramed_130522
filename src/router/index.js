const fetch = require('node-fetch');
var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {

    res.render('pages/index', {location:false, forecasts:false, errors:false});

});

router.post('/', async (req, res) => {

    const search = req.body.search;
    if (!search) return res.render('pages/index', {location:false, forecasts:false,errors:"Error location not entered"});

    const response1 = await fetch('https://www.metaweather.com/api/location/search/?query='+search);
    const location = await response1.json();
    if (location.length === 0) return res.render('pages/index', {location:false, forecasts:false, errors:"Error connecting to api or location not found"});
    
    const response2 = await fetch(`https://www.metaweather.com/api/location/${location[0].woeid}/`);
    const forecasts = await response2.json();
    if (forecasts.length === 0) return res.render('pages/index', {location, forecasts:false, errors:"Error when looking for the forecast of the location"});
    
    res.render('pages/index', {location, forecasts, errors:false});

});

module.exports = router;
