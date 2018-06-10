#!/usr/bin/env bash

REL_DIR="`dirname \"$0\"`"
DIR=`readlink -e $REL_DIR`

mkdir -p $DIR/../dist
cp $DIR/../CNAME $DIR/../dist/CNAME
$DIR/git-directory-deploy.sh