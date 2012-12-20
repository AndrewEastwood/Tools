var logger1 = require('../lib/logger.js').getLogger("demo1");
var logger2 = require('../lib/logger.js').getLogger("demo2");
var loggerAn = require('../lib/logger.js');



logger1.log('xxxxxx');
logger2.log('yyyyyyyy');
loggerAn.log('zzzzzzzzz');