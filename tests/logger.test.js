var logger = require('logger');

// anonymous loggers

logger.log('test 11111');

logger.log('test 2222', 'error');

// object loggers

logger.log('A', 'test 3333');

logger.log('B', 'test 4444', 'warn');

// just for fun

logger.log('REQUESTER', 'Are we good?');

logger.log('RESPONDER', 'Yes! Trololo :)');