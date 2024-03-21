#!/bin/sh

rm -rf pkg
mkdir pkg

cp LICENSE pkg
cp -r bin/ pkg/
cp README.md pkg
cp -r dist/* pkg/
cp package.json pkg