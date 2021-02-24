#! /bin/bash

PACKAGE_VERSION=$(cat projects/$NAME/package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g' \
  | tr -d '[[:space:]]')

git add ./projects/$NAME && git commit -m "nouvelle version ${NAME} ${PACKAGE_VERSION}" && git tag $NAME${PACKAGE_VERSION} && git push && git push --tags
