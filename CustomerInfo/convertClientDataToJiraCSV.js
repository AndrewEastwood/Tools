function customExtractClientInfo () {


}

function covertoJsonToCSV () {


}

function NumberLong(n) { return n; }

function getData (pathToDataFile) {
    
    
    console.log("Using path to data file: " + pathToDataFile);
    
    var p = require("webpage").create();
    
    p.open(pathToDataFile,function(state){
    
        console.log(state);
    
    });
}

/************************/

console.log("hello");

var sys = require("system");
getData(sys.args[1]);

//phantom.exit();