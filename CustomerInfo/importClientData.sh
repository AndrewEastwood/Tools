#!/bin/bash
if [$1 === '']
then
    echo 'importClientData.sh <dbhost>';
    exit 1;
else
    echo `mongo $1 --quiet --eval 'db.clients.find({},{_id:0}).forEach(printjson)'` > data/allClients.secure
    echo 'All client data cards were imported'
fi

phantomjs lib/convertClientDataToJiraCSV.js 