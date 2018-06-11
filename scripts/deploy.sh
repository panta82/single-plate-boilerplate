#!/usr/bin/env bash

REL_DIR="`dirname \"$0\"`"
DIR=`readlink -e $REL_DIR`

cd $DIR/..

npm run build
cp ./CNAME ./dist/CNAME
$DIR/git-directory-deploy.sh