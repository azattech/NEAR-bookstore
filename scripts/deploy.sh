#!/usr/bin/env shell

[ -z "$CONTRACT_NAME" ] && echo "Missing \$CONTRACT_NAME environment variable"

echo "deleting $CONTRACT_NAME"
echo
near delete $CONTRACT_NAME 

echo --------------------------------------------
echo
echo "cleaning up the /neardev folder"
echo
rm -rf ./neardev

# exit on first error after this point to avoid redeploying with successful build
set -e

echo --------------------------------------------
echo
echo "rebuilding the contract (release build)"
echo
yarn build

echo --------------------------------------------
echo
echo "redeploying the contract"
echo
near dev-deploy ./build/release/greeter.wasm

echo --------------------------------------------
echo run the following commands
echo
echo 'export CONTRACT_NAME=Your-Dev-ID-123-456.testnet'

exit 0