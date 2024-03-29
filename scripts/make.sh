#! /bin/bash

packages=(common loopback notification pwa autoform autotable auth)

VERSION=$(npm run version --silent)

## Tree must be clean

## Update package version off all package
function version() {
  for p in ${packages[@]}; do
    echo "Versioning $p"
    cd "./projects/$p" && \
    npm --no-git-tag-version version $VERSION && \
    cd ../..
  done
}

function build() {
  for p in ${packages[@]}; do
    echo "Building $p"
    npx ng build --configuration production $p
    node ./scripts/ivyprepublish.js ./dist/${p}/package.json
  done
}

function remove_ivy() {
  for p in ${packages[@]}; do
    node ./scripts/ivyprepublish.js ./dist/${p}/package.json
  done
}

function publish() {
  ## Release theme all
  for p in ${packages[@]}; do
    (cd "./dist/$p" && npm publish)
  done
}

function build_doc() {
  (cd ./projects/$1/ && ../../node_modules/.bin/compodoc -p ./tsconfig.lib.json && mv documentation ../../dist/demo/assets/documentation-$1)
}

case "$1" in
  "build") build ;;
  "build-release") version && build && remove_ivy;;
  "build-site") npm run build:demo && build_doc 'autoform' && build_doc 'common';;
  "publish") publish;;
  *) echo >&2 "Invalid option: $@"; exit 1;;
esac


