#!/bin/bash

showHelp () {
	echo "Usage:"
	echo ""
	echo "bvUpgradeUtils <script> <args>"
	echo ""
	echo "avaialble scripts:"
	echo " 1) styling"
	echo " 2) clientcards"
	echo ""
	echo "Run '<script> help' to get more information"
}


TOOLDIR="./tools"
SCRIPTPATH="$TOOLDIR/$1.js"

if [ ! -z "$1" ]
then

	if [ "$1" = "?" ] || [ "$1" = "help" ]  || [ "$1" = "--help" ]
	then
		showHelp
	else

		case $1 in 
			styling)
				phantomjs $SCRIPTPATH $2
				;;
			clientcards)
				node $SCRIPTPATH $2
				;;
			*)
				echo "Wrong script name"
				;;
		esac
	fi
else
	showHelp
fi