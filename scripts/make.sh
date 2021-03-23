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
    cd "./projects/$p" && \
    npx ng build --prod $p && cd ../..
  done
}

function publish() {
  ## Release theme all
  for p in ${packages[@]}; do
    cd "./dist/$p" && \
    npm publish
  done
}


case "$1" in
  "build") build ;;
  "build-release") version && build;;
  "publish") publish;;
  *) echo >&2 "Invalid option: $@"; exit 1;;
esac


