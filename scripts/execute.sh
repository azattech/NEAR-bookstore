 #!/usr/bin/env bash

# exit on first error after this point to avoid redeploying with successful build
set -e

echo
echo ---------------------------------------------------------
echo "Step 0: Check for environment variable with contract name"
echo ---------------------------------------------------------
echo

[ -z "$CONTRACT_NAME" ] && echo "Missing \$CONTRACT_NAME environment variable" && exit 1
[ -z "$CONTRACT_NAME" ] || echo "Found it! \$CONTRACT_NAME is set to [ $CONTRACT_NAME ]"

echo
echo
echo ---------------------------------------------------------
echo "Step 1: Call 'view' functions on the contract"
echo
echo "(run this script again to see changes made by this file)"
echo ---------------------------------------------------------
echo
echo "get Books"

near view $CONTRACT_NAME getBook '{ "id": “1” }'

echo 
echo  "get all books"
echo  "please add your test account"

near view $CONTRACT_NAME getBooks  --accountId accountID

echo 
echo  "set a book"

 near call $CONTRACT_NAME setBook '{
  "book": {
      "id": “1”,
      "name": "The Bitcoin Standard",
      "author": "Saifedean Ammous",
      "description": "a new electronic cash system thats fully peer-to-peer, with no trusted third party",
      "price": “2000000000000000000000000",
      "image": "https://images-na.ssl-images-amazon.com/images/I/411zm29rf-L._SX335_BO1,204,203,200_.jpg"
    }
 }' --accountId accountID

echo 
echo  "buying a book"

near call $CONTRACT_NAME buyBook '{ "id: "1", "price", "2000000000000000000000000"}' --accountId accountID --deposit 2

echo

echo "now run this script again to see changes made by this file"
exit 0
