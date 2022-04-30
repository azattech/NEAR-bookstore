#!/usr/bin/env bash

[ -z "$CONTRACT" ] && echo "Missing \$CONTRACT environment variable" && exit 1
[ -z "$OWNER" ] && echo "Missing \$OWNER environment variable" && exit 1

read -p "Enter Book Name: " name
echo
echo "You entered $name"

echo

read -p "Enter book's author: " author
echo
echo "You entered $author"

echo

read -p "Enter Book Description: " description
echo
echo "You entered $description"

echo

read -p "Enter book image: " image
echo
echo "You entered $image"

echo

read -p "Enter Book Price (Please enter as a yocto: ex: 2000000000000000000000000): " price
echo
echo "You entered $price"

echo
echo --------------------------------------------
echo 
echo "Calling setBook function"

near call $CONTRACT setBook '{"name": "'"$name"'", "author": "'"$author"'", "description": "'"$description"'", "image": "'"$image"'", "price" : "'"$price"'"}' --accountId $OWNER

echo
echo