var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Layout' });
});

router.get('/widget_tank', function(req, res, next) {
  res.render('widget_tank', { title: 'Widget tank' });
});

router.get('/widget_led', function(req, res, next) {
  res.render('widget_led', { title: 'Widget led' });
});

router.get('/system0', function(req, res, next) {
  res.render('system0', { title: 'system-0' });
});

router.get('/system1', function(req, res, next) {
  res.render('system1', { title: 'system-1' });
});

router.get('/widget_tank_thermometer_bar', function(req, res, next) {
  res.render('widget_tank_thermometer_bar', { title: 'Widget Tank/Thermometer/Bar' });
});

router.get('/widget_gauge_meter', function(req, res, next) {
  res.render('widget_gauge_meter', { title: 'Widget Gauge/Meter' });
});

module.exports = router;
