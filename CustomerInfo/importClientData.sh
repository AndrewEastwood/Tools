#!/bin/bash

CLIDATA="data/temp.json";

if [ -z "$1" ]
then
    echo 'importClientData.sh <dbhost>';
    exit 1;
else
    if [ -a CLIDATA ] && [ "$2" == "force" ]
    then
        mongo $1 --quiet cimport.js > $CLIDATA;
        echo "All client data cards were importe";
    else
        echo "Using existed data file";
    fi
fi

phantomjs convertClientDataToJiraCSV.js $CLIDATA