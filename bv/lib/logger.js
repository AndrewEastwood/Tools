var _loggers = {
	anonymous: {logdata : "", cache : true}
};
var _currentOwner = false;


function logger (name) {
    var _cache = "";
    var _name = name || "anonymous";

    this.getName = function() { return this._name; }
    this.log = function  () {}
    this.save = function () {}
}

exports.setup = function (owner, useCaching) {
	_currentOwner = this.getCurrentOwner(owner);
	if (typeof(_loggers[_currentOwner]) == "undefined")
		_loggers[_currentOwner] = {logdata : "", cache : true};
	else
		_loggers[_currentOwner].cache = useCaching;
    return exports;
}

exports.getCurrentOwner = function (owner) { return owner || this._currentOwner || "anonymous"; }

exports.export = function (owner) {
	if (_loggers[owner || _currentOwner] && _loggers[owner || _currentOwner].cache)
		return _loggers[owner || _currentOwner].logdata;
	return "";
}

exports.getAllLoggers()

exports.save = function (owner) {
    //var log = _loggers[this.getCurrentOwner(owner)]
}

exports.log = function (msg, level, owner) {
	//console.log(msg);
    var sign = " ";
    level = level || "info";
    // show short signs with messages
    if (level === 'warn') sign = "!";
    if (level === 'error') sign = "*";
    if (level === 'fail') sign = "X";
    // log message
    var message = "[" + level.toUpperCase() + "] " + (()) + new Date().toLocaleTimeString() + " " + sign + " : " + msg;
    console.log(message);
    // will be stored into the file
    //this.cache += "\n" + message;
    if (typeof(_loggers[owner || _currentOwner]) !== "undefined" && _loggers[owner || _currentOwner].cache)
    	_loggers[owner || _currentOwner].logdata += message;
}