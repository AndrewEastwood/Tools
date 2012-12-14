#!/bin/bash
echo `mongo $1 --quiet --eval 'db.clients.find({},{_id:0}).forEach(printjson)'` > data/allClients.secure
echo 'All client data cards were imported'

phantomjs lib/convertClientDataToJiraCSV.js 