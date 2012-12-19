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
    this.getID = function() { return this._name == "anonymous" ? "" : this._name.toUpperCase(); }
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
        level = level || "info";
        // show short signs with messages
        if (level === 'warn') sign = "!";
        if (level === 'error') sign = "*";
        if (level === 'fail') sign = "X";
        return glUtil.format(this._msgFmt,
            level.toUpperCase(),
            this.getID(),
            new Date().toLocaleTimeString(),
            sign,
            msg
        );
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

exports.log = function (msg, level, loggerName) {
    console.log(__filename);
    //if (typeof(lo))
}

exports.geLogger = function (loggerName) {
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