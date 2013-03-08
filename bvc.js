exports.BvClient = function (options) {

    /**
     * Module dependencies.
     */
    var async    = require('async'),
        fs       = require('fs'),
        util     = require('util'),
        _        = require('underscore'),
        program  = require('commander'),
        logger   = require('logger'),
        mysql    = require('db-mysql'),
        mongo    = require('mongoskin');

    var self = this;
    var MODULE_CONFIG = {
        mysqldb : function (cluster) {
            var type = 'a';
            var servers = {
                prod: {
                    host: 'localhost',
                    port: 3306,
                    user: "test",
                    pwd: "test",
                    db: 'local'
                },
                bi: {
                    host: 'localhost',
                    port: 5029,
                    user: "test",
                    pwd:  "test",
                    db: "local_bi"
                },
                nightly: {
                    host: 'localhost',
                    port: 3306,
                    user: "test",
                    pwd: "test",
                    db: 'local'
                }};

            if (cluster.indexOf(':') > 0) {
                var clusterServer = cluster.split(":");
                cluster = clusterServer[0];
                type = clusterServer[1];
            }

            var server = servers[type];

            // specific server for c7
            if (cluster == "none" && type == "b") {
                server.host = "localhost-new";
                server.user = "test2";
                server.pwd = "test2";
            }

            server.host = self.getCommand(server.host, {CLUSTER : cluster});
            server.cluster = cluster;
            return server;
        },
        mongodb : function (aliasName) {
            var servers = {
                local: {
                    host: 'localhost',
                    port: 0,
                    db: 'test'
                }
            };

            if (aliasName.indexOf(':') > 0) {
                var serverEntry = aliasName.split(":");
                return {
                    host: serverEntry[0],
                    port: 27017,
                    db: serverEntry[1]
                };
            }

            return servers[aliasName || 'local'];
        }
    };
    var CONFIG = {
        mysqlProductPageLinksLimit: 10,
        emailsActivetime:  '2012-10-10',
        mysqlClientRecordsLimit: 0,
        mongoSelectCondition: {},
        mongoFiledsToSelect: false, // default fields: _id:0,name:1,bundle:1
        mongoRecordsSkip: 0,
        mongoRecordsLimit: 0,
        mongoClientListType: "array",
        showLogMessages : true,
        tempPath: "/tmp/clients",
    };

    var mySqlCommands = {};

    // keep connected db objects
    // to avoid making multiple connections
    var clusterConnections = {};
    var mongoDbConnections = {};

    this.setup = function (config) {
        CONFIG = _.extend(CONFIG, config);
        return self;
    };

    this.getCollectionData = function (uri, collectionName, callback) {
        _getMongoDBLink(MODULE_CONFIG.mongodb(uri), function(error, client) {
            var collection = new mongo.Collection(client, collectionName);

            // setup selectors
            var _condition = (CONFIG.mongoSelectCondition || {});
            var _filedsToSelect = (CONFIG.mongoFiledsToSelect || {_id:0, name:1});

            _innerLogger("Mongo fields to select: %s", JSON.stringify(_filedsToSelect));
            _innerLogger("Mongo condition: %s", JSON.stringify(_condition));
            _innerLogger("Mongo skip records: %s", CONFIG.mongoRecordsSkip);
            _innerLogger("Mongo data limit: %s", CONFIG.mongoRecordsLimit);
            _innerLogger("Mongo data return type: %s", CONFIG.mongoClientListType);

            collection
                .find(_condition, _filedsToSelect)
                .skip((CONFIG.mongoRecordsSkip)? CONFIG.mongoRecordsSkip : 0)
                .limit(((CONFIG.mongoRecordsLimit)? CONFIG.mongoRecordsLimit : 0))
                .toArray(callback);
        });
    };

    this.getClientCount = function (callback) {

        if (CONFIG.clientRecordsLimit) {
            callback(CONFIG.clientRecordsLimit);
            return;
        }

        _getMongoDBLink(MODULE_CONFIG.mongodb('qa'), function(error, client) {
            if (error) throw error;
            var collectionClients = new mongo.Collection(client, "clients");
            collectionClients.count(function(err, count){
                if (typeof(callback) === 'function')
                    callback(count);
                else
                    self.log("Client count: " + count);
            });
        });
    };

    this.getClientObjects = function (name, callback) {
        _getMongoDBLink(MODULE_CONFIG.mongodb('qa'), function(error, client) {
            if (error) throw error;

            // collections
            var collectionClients = new mongo.Collection(client, "clients");
            var collectionClientBundles = new mongo.Collection(client, "bundles");
            
            // setup selectors
            var _clientSelector = {};
            if (!!name && name !== "*")
                _clientSelector = {name:name};
            if (name.split(",").length > 1) {

                var _names = name.split(",");
                var _nameSelector = [];
                for (var i = 0; i < _names.length; i++)
                    _nameSelector.push({name:_names[i]});
                _clientSelector = {$or:_nameSelector};
            }
            var _filedsToSelect = (CONFIG.mongoFiledsToSelect || {_id:0, name:1,bundle:1});

            _innerLogger("Mongo fields to select: %s", JSON.stringify(_filedsToSelect));
            _innerLogger("Mongo client selector: %s", JSON.stringify(_clientSelector));
            _innerLogger("Mongo skip records: %s", CONFIG.mongoRecordsSkip);
            _innerLogger("Mongo data limit: %s", CONFIG.mongoRecordsLimit);
            _innerLogger("Mongo data return type: %s", CONFIG.mongoClientListType);

            // get clients data
            collectionClients
                .find(_clientSelector, _filedsToSelect)
                .skip((CONFIG.mongoRecordsSkip)? CONFIG.mongoRecordsSkip : 0)
                .limit(((CONFIG.mongoRecordsLimit)? CONFIG.mongoRecordsLimit : 0))
                .toArray(function(errrClient, clientRecords) {
                    if (errrClient) throw errrClient;

                    //console.dir(clientRecords);
                    if (clientRecords.length == 0)
                        callback("Can't find client record", null);

                    // get client name and bundle name map
                    var clientNameToBundleNameMap = {};
                    clientRecords.forEach(function(clientRecord){
                        clientNameToBundleNameMap[clientRecord.name] = clientRecord.bundle;
                    });

                    // get client bundle data
                    var clientList = false;
                    if (CONFIG.mongoClientListType == "object")
                        clientList = {};
                    else
                        clientList = [];

                    // get all bundels
                    collectionClientBundles.
                        find({}, {_id:0}).
                        toArray(function(errBundle, bundleRecords) {

                            // now we have all bundles
                            
                            if (errBundle) throw errBundle;

                            var bundleNameToEntryMap = {};
                            bundleRecords.forEach(function(bundleRecord){
                                bundleNameToEntryMap[bundleRecord.name] = bundleRecord;
                            });

                            //_innerLogger("client loop");

                            //  append received bundle data for each client
                            clientRecords.forEach(function(currentClientRecord) {

                                var conditionFnResult = null;
                                if (CONFIG.conditionFn)
                                    conditionFnResult = CONFIG.conditionFn(currentClientRecord);
                                //console.dir(currentClientRecord.feedConfiguration._exportConfigurations);

                                if (conditionFnResult === false) {
                                    self.log("%s - removed according to condition", currentClientRecord.name);
                                    return;
                                }
                                //console.dir(conditionFnResult);
                                var clientInfo = {
                                    clientName: currentClientRecord.name,
                                    bundle: currentClientRecord.bundle,
                                    custom: conditionFnResult,
                                    clusters: []
                                };

                                if (bundleNameToEntryMap.hasOwnProperty(clientInfo.bundle) &&
                                    bundleNameToEntryMap[clientInfo.bundle].clusters) {
                                    clientInfo.clusters = bundleNameToEntryMap[clientInfo.bundle].clusters;
                                    //_innerLogger("Client: %s; cluster: %s", clientInfo.clientName, clientInfo.clusters.join(','));
                                }
                                else
                                    _innerLogger("Can't find bundle '%s' info for client %s", clientInfo.bundle, clientInfo.clientName);

                                //_innerLogger("Current bundle : %s", currentClientRecord.bundle);
                                if (_.isArray(clientList))
                                    clientList.push(clientInfo);
                                else
                                    clientList[currentClientRecord.name] = clientInfo;
                                    
                            });

                            //console.dir(bundleNameToEntryMap);
                            //console.dir(bundleRecords);
                            //console.dir(clientList);

                            callback(null, clientList);

                        }); // bundle collection: toArray

                }); // client collection: toArray

        }); // mongodb link
    };

    this.runQueryWithClientObj = function (clientObj, query, queryOptionsFn, finalCallback, onDataReceivedCallback) {
        
        // exit function when clientObj is empty
        if (_.isEmpty(clientObj)) {
            _innerLogger("runQueryWithClientObj: Client list is empty");
            finalCallback(null, false);
            return;
        }

        // group clients by clasters
        // and get uniq cluster names
        var clusterGroups = self.groupClientsByClusters(clientObj);

        function _inner_executeNextClientQuery (activeCluster, clusterEntry, clusterData, clusterCallback) {

            // leave cluster process when it has all data
            if (clusterEntry.length == 0) {
                clusterCallback(null, clusterData);
                return;
            }

            var clientObj = clusterEntry.shift();
            _innerLogger("Running client: %s", clientObj.clientName);

            self.executeMySqlQuery(
                MODULE_CONFIG.mysqldb(activeCluster),
                query,
                function (mysqllink) {
                    var standartQueryValues = {
                        CLIENTNAME: mysqllink.escape(clientObj.clientName),
                        LIMIT: CONFIG.mysqlProductPageLinksLimit
                    };
                    var customQueryValues = {};
                    if (queryOptionsFn)
                        customQueryValues = queryOptionsFn(mysqllink, clientObj);

                    return _.extend(standartQueryValues, customQueryValues);
                },

                function(error, rows, cols) {
                    if (error) throw error;
                    
                    _innerLogger("Cluster: %s, Items left: %s, Data received: %s; Rows count: %s",
                        activeCluster, 
                        clusterEntry.length, 
                        clientObj.clientName, 
                        rows.length);

                    var recordObj = {
                        rows: rows,
                        cols: cols
                    };

                    if (onDataReceivedCallback) {
                        var callbackResult = onDataReceivedCallback(null, recordObj, clientObj);
                        if (_.isObject(callbackResult))
                            recordObj = callbackResult;
                    }

                    //console.dir(recordObj);
                    clusterData.push(recordObj);

                    _inner_executeNextClientQuery(activeCluster, clusterEntry, clusterData, clusterCallback);
                }
            );
        } // end of inner fn

        // make connection to involved clusters
        self.getClusterConnections(clusterGroups.clusterNames, function () {

            var clusterTasks = {};

            // #2. get product page links and check them
            for (var clusterID in clusterGroups.clusterDataMap) {
                // #3. get products client links per cluster
                (function(activeCluster, clusterEntry) {
                    // #4. add cluster task
                    clusterTasks[activeCluster] = function(clusterCallback) {

                        // get client count per cluster
                        //var activeTasksCount = clusterEntry.length;
                        //var clusterData = [];
                        _innerLogger("Cluster: %s, total clients: %s", activeCluster, clusterEntry.length);
                        _inner_executeNextClientQuery(activeCluster, clusterEntry, [], clusterCallback);
                        // run all clients of particular cluster
                        //clusterEntry.forEach(function(clientObj){

                        //});

                    }; // #4 add cluster task
                })(clusterID, clusterGroups.clusterDataMap[clusterID]); // lock cluster
            } // #2

            // run parallel tasks for all clusters
            async.parallel(clusterTasks, finalCallback);

        }); // cluster connections
    };

    this.getClientsAndRunQuery = function (name, query, queryOptionsFn, finalCallback, onDataReceivedCallback) {
        _innerLogger("Client list: %s", (name == "*")? "all" : name);
        // #1. get bundles
        self.getClientObjects(name, function(error, clientObjects){
            //console.dir(clientObjects);
            if (error) throw error;
            self.runQueryWithClientObj(clientObjects, query, queryOptionsFn, finalCallback, onDataReceivedCallback);
        }); // get client objects
    };

    // query wrappers
    // ***************************

    this.getActiveProductCount = function (name, finalCallback, perClientCallback) {
        
        var commonProductCounter = 0;

        this.getClientsAndRunQuery(name,
            mySqlCommands.getProductCount,
            false,
            function(){finalCallback(null, commonProductCounter);},
            // on data received callback
            function (e, dataObj, clientObj) {

                if (e) throw e;

                if (dataObj.rows && dataObj.rows.length == 1)
                    commonProductCounter += dataObj.rows[0].Count;

                if (perClientCallback)
                    perClientCallback(null, dataObj.rows, clientObj);

                return dataObj.rows;
            }
        );
    };

    this.getProductPageLinksByClientNames = function (name, finalCallback, perClientCallback) {

        this.getClientsAndRunQuery(name,
            mySqlCommands.getActivePDPURLs,
            false,
            finalCallback,
            perClientCallback
        );
    };

    this.getSmartSeoClientWithPDPLinks = function (name, finalCallback, perClientCallback) {
        
        CONFIG.mongoFiledsToSelect = {_id:0,name:1,bundle:1,"feedConfiguration._exportConfigurations":1};
        CONFIG.mongoClientListType = "array"
        CONFIG.conditionFn = function (singleClientObj) {
            //console.dir(singleClientObj);
            // do not include client with empty export feeds
            if (!!!singleClientObj.feedConfiguration || 
                !!!singleClientObj.feedConfiguration._exportConfigurations || 
                singleClientObj.feedConfiguration._exportConfigurations.length == 0)
                return false;

            var smartSeoIsAdvanced = null;

            singleClientObj.feedConfiguration._exportConfigurations.forEach(function(config){
                // we only want feeds that are scheduled to generated
                if (config._schedule._days.length && 
                    config._exportName && 
                    config._exportName.indexOf('smartseo.zip') > 0) {
                    //self.log("Client: %s, Feed Name: %s;", singleClientObj.name, config._exportName);
                    // check smart seo is advanced or basic
                    if (config._generatorConfiguration._maximumPageNumber > 1)
                        smartSeoIsAdvanced = true;
                    else
                        smartSeoIsAdvanced = false;
                } else
                    return false; // skip this client
            });

            // do not include client with non-smartSeo feeds
            if (smartSeoIsAdvanced === null)
                return false;

            return {seoAdvanced: smartSeoIsAdvanced};
        };

        this.getClientsAndRunQuery(name,
            mySqlCommands.getActivePDPURLs,
            false,
            finalCallback,
            // on data received callback
            function (e, dataObj, clientObj) {

                if (e) throw e;

                //console.dir(dataObj);
                var rowList = [];
                if (dataObj.rows) {
                    for (var id in dataObj.rows)
                        rowList.push(dataObj.rows[id].Value);
                    rowList = _.uniq(rowList);
                }

                if (perClientCallback)
                    perClientCallback(null, rowList, clientObj);

                return rowList;
            }
        );
    };

    this.getRecentUsedEmailTemplatesByClientNames = function (name, finalCallback, perClientCallback) {
        console.log(CONFIG.emailsActivetime);
        this.getClientsAndRunQuery(name,
            mySqlCommands.getRecentClientEmails,
            function (mysqllink,clientObj){
                return {ACTIVETIME: CONFIG.emailsActivetime};
            },
            finalCallback,
            // on data received callback
            function (e, dataObj, clientObj) {
                if (e) throw e;

                var emailsRowList = {clientName: clientObj.clientName, EmailTemplates: []};

                //If a client has emails
                if (!!dataObj.rows[0]) {
                    for (var id in dataObj.rows)
                        emailsRowList.EmailTemplates.push({
                            TemplateName: dataObj.rows[id].TemplateName,
                            Count: dataObj.rows[id].Count,
                            ServiceProvider: dataObj.rows[id].ProviderType
                        });
                }

                if (perClientCallback)
                    perClientCallback(null, emailsRowList, clientObj);

                return emailsRowList;
            }
        );
    };    

    // helpers
    // ***************************

    this.groupClientsByClusters = function (clientObj) {
        // #1. group clients by clusters
        var clientsPerCluster = {};
        var involvedClusterNames = [];
        for (var clientID in clientObj) {
            if (!!!clientObj[clientID].clusters || clientObj[clientID].clusters.length == 0)
                continue;
            var cluster = clientObj[clientID].clusters[0];
            involvedClusterNames.push(cluster);
            if (!!!clientsPerCluster[cluster])
                clientsPerCluster[cluster] = [];
            clientsPerCluster[cluster].push(clientObj[clientID]);
        }

        return {
            clusterNames: _.uniq(involvedClusterNames),
            clusterDataMap: clientsPerCluster
        };
    };

    this.getCommand = function (cmd, args) {
        for(var argID in args)
            cmd = cmd.replace(new RegExp('\\$\\$' + argID + '\\$\\$', 'ig'), args[argID]);
        //_innerLogger(cmd);
        return cmd.replace(/ +(?= )/g,'').trim();
    };

    // data import/export
    // ***************************

    this.getSavePath = function (fname) {
        // add default extension
        if (fname.indexOf(".") < 0)
            fname += ".json";
        return CONFIG.tempPath + "/" + fname;
    };

    this.importDataToJsonFile = function (data, fname, doNotSaveIfEmpty, callback) {
        var fpath = self.getSavePath(fname);
        if (doNotSaveIfEmpty && !!!data) {
            if (callback)
                callback("Empty data", data, fpath);
            return
        }
        if (callback)
            fs.writeFile(fpath, JSON.stringify(data), callback);
        else
            fs.writeFileSync(fpath, JSON.stringify(data));
    };

    // config structure
    //   host
    //   db
    //   collection
    //   mode
    //   options
    //   port
    this.importDataToMongoDb = function(config, data, callback) {
        self.log("Import to mongodb");
        self.log(" -- host: " + config.host);
        self.log(" -- database: " + config.db);

        var activeTasks = [];
        _getMongoDBLink(config, function(error, client) {
            if (error) throw error;
            var collection = new mongo.Collection(client, config.collection);
            for (var key in data)
                (function(activeKey) {
                    activeTasks.push(1);
                    //console.dir(data[activeKey]);
                    switch (config.mode) {
                        case "update": {
                            self.log("performing update: " + activeKey);
                            collection.update(
                                {name: activeKey},
                                {$set: data[activeKey]},
                                config.options,
                                function(e) {
                                    dbActionCallback(e, activeKey);
                            });
                            break;
                        }
                        case "insert": {
                            self.log("performing insert: " + activeKey);
                            collection.insert(data[activeKey], function(e) {
                                dbActionCallback(e,activeKey);
                            });
                            break;
                        }
                        default: {
                            callback("Unknown action: " + config.mode);
                            break;
                        }
                    }
                })(key);

            function dbActionCallback(error, activeKey) {
                activeTasks.pop();
                if (error) {
                    console.warn(err.message);
                } else
                    self.log('[' + activeKey + ']: successfully updated');

                if (activeTasks.length == 0) {
                    self.log("mongodb: complete");
                    callback(null, data);
                }
            }

        });
    };

    this.importFileDataToMongoDb = function(config, fname, onDataEmpty, finalCallback) {
        // get json object
        self.getJsonFileObject(fname, function(jsonData){
            if (_.isEmpty(jsonData))
                jsonData = onDataEmpty();
            // export ot mongo
            self.importDataToMongoDb(config, jsonData, finalCallback);
        });
    }

    this.getJsonFileObject = function (fname, callback) {
        var result = self.getJsonFile(fname, (callback?function(error, data){
            if (error) throw error;
            callback(JSON.parse(data));
        }:null));

        if (!callback)
            return result;
    }

    this.getJsonFile = function (fname, callback) {
        // get filepath
        var fpath = self.getSavePath(fname);

        if (!fs.existsSync(fpath)) {
            if (callback)
                callback(false, false);
            return false;
        }

        if (callback)
            fs.readFile(fpath, 'utf8', callback);
        else
            return fs.readFileSync(fpath, 'utf8');
    };

    // database and connections
    // ***************************
    this.getClusterConnections = function (clusters, callback) {
        var nonConnectedClusterCount = clusters.length;
        for (var cx in clusters) {
            _getMySQLLink(MODULE_CONFIG.mysqldb(clusters[cx]), function(){
                nonConnectedClusterCount--;
                if (nonConnectedClusterCount <= 0)
                    callback();
            });
        }
    };

    this.executeMySqlQuery = function (mySqlConfig, query, queryOptionsFn, onDataReceivedCallback) {
        // mysqlConnection
        _getMySQLLink(mySqlConfig, function(error, mysqllink) {
            // throw error message
            if (error) throw error;
            // get mysql query
            var q = self.getCommand(query, queryOptionsFn(mysqllink));
            //self.log(q);
            // perform query
            mysqllink.query(q).execute(onDataReceivedCallback);   
        }); // mysqlConnection 
    };

    this.getMySQLConnection = function (config, callback) {
        if (_.isString(config))
            config = MODULE_CONFIG.mysqldb(config);
        _getMySQLLink(config, callback);
    };

    this.getMongoDBConnection = function (config, callback) {
        if (_.isString(config))
            config = MODULE_CONFIG.mongodb(config);
        _getMongoDBLink(config, callback);
    };

    function _getMySQLLink (config, callback) {
        // check for existed connection
        if (clusterConnections.hasOwnProperty(config.host)) {
            //_innerLogger('--- using existed mysql connection: ' + config.host);
            callback(null, clusterConnections[config.host], config.cluster);
            return;
        }

        //create new connection
        _innerLogger('--- new mysql connection to ' + config.host + ":" + config.port);
        new mysql.Database({
            hostname: config.host,
            user: config.user,
            password: config.pwd,
            database: config.db,
            port: config.port
        }).connect(function(error) {
            if (error) {
                return _innerLogger("CONNECTION ERROR: " + error);
            }
            _innerLogger("mysql " + config.host + ": connection ok");
            clusterConnections[config.host] = this;
            callback(error, this, config.cluster);
        });
    };

    function _getMongoDBLink (config, callback) {
        // return existed connection
        var connectionID = config.host.toString(24);
        if (mongoDbConnections.hasOwnProperty(connectionID)) {
            _innerLogger("--- using existed mongodb connection: " + config.host);
            return callback(null, mongoDbConnections[connectionID]);
        }

        // make new connection
        _innerLogger("--- new mongodb connection to: " + config.host);
        new mongo.Db(
            config.db,
            new mongo.Server(config.host, config.port, {}),
            {safe : true}
        ).open(function(error, client) {
            if (error)
                throw error;
            _innerLogger("mongodb " + config.host + ": connection ok");
            mongoDbConnections[connectionID] = client;
            callback(error, client);
        });
    };

    // loggers
    // ***************************
    function _innerLogger () {
        if (CONFIG.showLogMessages)
            logger.log(util.format.apply(null, arguments));
    };

    this.log = function () {
        logger.log(util.format.apply(null, arguments));
    };

    if (options)
        return self.setup(options);
}