var glLoggers = {};
var glUtil = require('util');

function loggerClass (name) {

    // logger internal default settings
    var _cache = "";
    var _name = "anonymous";
    var _cacheMode = false;
    var _msgFmt = "[%s] %s %s %s %s";
    var _fileNamePattern = "%s.log";

    if (Array.isArray(name))
        this.setup(name);
    if (typeof(name) === 'string')
        this._name = name;

    this.setup = function (config) {
        for (var p in config)
            this['_' + p] = config[p];
        return this;
    }
    this.getName = function () { return this._name; }
    this.getID = function () { return this._name == "anonymous" ? "" : this._name.toUpperCase(); }
    this.log = function  (text, level) {
        var message = this.getMessage(text, level);
        console.log(message);
        // will be stored into the file
        if (this.getCacheMode)
            this._cache += message;
        return this;
    }
    this.getMessage = function (text, level) {
        var sign = " ";
        level = this.getLevel(level);
        // show short signs with messages
        if (level === 'warn') sign = "!";
        if (level === 'error') sign = "*";
        if (level === 'fail') sign = "X";
        return glUtil.format("[%s] %s %s %s %s",
            level.toUpperCase(),
            this.getID(),
            new Date().toLocaleTimeString(),
            sign,
            text
        );
    }
    this.getLevels = function () { return ['info', 'warn', 'error', 'fatal']; }
    this.getLevel = function (level) {
        var _logLevel = 0;
        var _levels = this.getLevels();
        if(typeof(level) === 'number' && level >= 0 && level < _levels.length)
            _logLevel = level;
        if(typeof(level) === 'string')
            _logLevel = _levels.indexOf(level);
        return _levels[_logLevel] ? _levels[_logLevel] : _levels[0];
    }
    this.getCacheMode = function (mode) { return this._saveMessages; }
    this.setCacheMode = function (mode) { this._saveMessages = mode; }
    this.getFileName = function () {
        return glUtil.format(this._fileNamePattern, this.getName);
    }
    this.close = function () {
        if (!this.getCacheMode())
            return false;
        var fs = require('fs');
        fs.writeFile(this.getFileName(), this._cache);
        return true;
    }
}


/******** module implementation ********/

exports.log = function (loggerName, text, level) {
    if (typeof(text) === "undefined")
        exports.getLogger("").log(loggerName, text);
    else
        exports.getLogger(loggerName).log(text, level);
}

exports.getLogger = function (loggerName) {
    var logger = false;
    loggerName = loggerName.toUpperCase();
    if (glLoggers.hasOwnProperty(loggerName))
        logger = glLoggers[loggerName];
    else {
        logger = new loggerClass(loggerName);
        glLoggers[loggerName] = logger;
    }
    return logger;
}