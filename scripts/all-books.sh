#!/usr/bin/env bash

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1

echo
echo --------------------------------------------
echo 
echo "Calling getBooks function"
echo

near call $CONTRACT getBooks --accountId $OWNER

echo
echo