#!/bin/bash

set -o errexit -o nounset

if [ "$TRAVIS_BRANCH" != "master" ]
then
  echo "This commit was made against the $TRAVIS_BRANCH and not the master! No deploy!"
  exit 0
fi

rev=$(git rev-parse --short HEAD)

cd release

git init
git config user.name "Kris Lianee Maini"
git config user.email "krma@nodes.dk"

git remote add upstream "https://$GH_TOKEN@github.com/nodes-frontend/nMessages.git"
git fetch upstream
git reset upstream/gh-pages

touch .

git add -A .
git commit -m "rebuild pages at ${rev}"
git push upstream HEAD:gh-pages