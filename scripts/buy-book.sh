#!/usr/bin/env bash

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1


read -p "Enter Book Id: " bookId
echo
echo "You entered $bookId"

read -p "Enter Deposit Amount: " deposit
echo
echo "You entered $deposit"


echo
echo --------------------------------------------
echo 
echo "Calling buyBook function"
echo

near call $CONTRACT buyBook '{"bookId": '$bookId'}' --accountId $OWNER --deposit $deposit

echo
echo