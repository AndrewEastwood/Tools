#!/bin/bash

showHelp () {
	echo "Usage:"
	echo ""
	echo "bvUpgradeUtils <script> <command> <clientName>"
	echo ""
	echo "avaialble scripts:"
	echo " 1) styling [update|grab]"
	echo " 2) clientcards"
	echo " 3) xmlparser"
	echo ""
	echo "Run '<script> help' to get more information"
}

SCRIPT=$1
COMMAND=$2
CLIENTNAME=$3

TOOLS_HOME="/home/andriy/GitRepo/Tools/bv"
TOOLDIR="$TOOLS_HOME/tools"
SCRIPTPATH="$TOOLDIR/$SCRIPT.js"

if [ ! -z "$SCRIPT" ]
then

	if [ "$SCRIPT" = "?" ] || [ "$SCRIPT" = "help" ]  || [ "$SCRIPT" = "--help" ]
	then
		showHelp
	else

		if [ -z "$ARGS" ]
		then
			ARGS=$COMMAND
		fi

		case "$SCRIPT" in 
			styling)
				DIGEST=`getDigest.sh $CLIENTNAME`
				phantomjs $SCRIPTPATH -digest "$DIGEST"
				
				if [ "$COMMAND" = "update" ]
				then
					modifyImplementation.sh $CLIENTNAME file "$TOOLS_HOME/data/styles/$CLIENTNAME.update"
				fi
				;;
			xmlparser)
				node $SCRIPTPATH $ARGS
				;;
			clientcards)
				node $SCRIPTPATH $ARGS
				;;
			*)
				echo "Wrong script name"
				;;
		esac
	fi
else
	showHelp
fi

echo "DONE"