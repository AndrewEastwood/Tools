var cursor = db.clients.find({}, {_id:0});
var itemsToSkip = 0;
//var itemsToPrint = 100;
print("[")
while(cursor.hasNext()/* && itemsToPrint > 0*/){

    if (itemsToSkip > 0) {
        cursor.next();
        itemsToSkip--;
        continue;
    }

    printjson(cursor.next());
    if (cursor.hasNext())
    print(",");
    //itemsToPrint--;
}
print("]");