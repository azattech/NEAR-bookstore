#!/usr/bin/env bash

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1


read -p "Enter Book Id: " id
echo
echo "You entered $id"

echo
echo --------------------------------------------
echo 
echo "Calling buyBook function"
echo

near call $CONTRACT getBook '{"id": '$id'}' --accountId $OWNER

echo
echo