jsonModify() {
	echo `echo "$1" | underscore process "data.$2 = '$3'; data" 2>&1`
}