#!/bin/bash node

CLIDATA="data/temp.csv";

if [ -z "$1" ]
then
    echo 'importClientData.sh <dbhost>';
    exit 1;
else
    if [ ! -e CLIDATA ] || [ "$2" == "force" ]
    then
        mongo $1 --quiet cimport.js > $CLIDATA;
        echo "All client data cards were imported";
    else
        echo "Using existed data file";
    fi
fi

cat $CLIDATA
#phantomjs convertClientDataToJiraCSV.js $CLIDATA