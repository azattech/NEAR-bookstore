#!/usr/bin/env bash

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
yarn build:release

echo --------------------------------------------
echo
echo "redeploying the contract"
echo
near dev-deploy ./contract/build/release/greeter.wasm

echo --------------------------------------------
echo run the following commands
echo
echo "export CONTRACT_NAME=dev-123-456>"

exit 0