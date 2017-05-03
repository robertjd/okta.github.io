#!/bin/bash
set -ex

if [ $TRAVIS_EVENT_TYPE != 'push' ]; then
  export PHANTOMJS=true
fi

# 1. Install phantomJs if this is a pull request - for external PR's, we can't
#    run against SauceLabs. More info on running prebuilt in Travis:
#    https://www.npmjs.com/package/phantomjs-prebuilt#continuous-integration
if [ "$PHANTOMJS" == "true" ]; then
  export PHANTOMJS_VERSION=2.1.1
  export PATH=$PWD/travis_phantomjs/phantomjs-$PHANTOMJS_VERSION-linux-x86_64/bin:$PATH

  if [ $(phantomjs --version) != $PHANTOMJS_VERSION ]; then rm -rf $PWD/travis_phantomjs; mkdir -p $PWD/travis_phantomjs; fi
  if [ $(phantomjs --version) != $PHANTOMJS_VERSION ]; then wget -O $PWD/travis_phantomjs/phantomjs-$PHANTOMJS_VERSION-linux-x86_64.tar.bz2 https://github.com/Medium/phantomjs/releases/download/v$PHANTOMJS_VERSION/phantomjs-$PHANTOMJS_VERSION-linux-x86_64.tar.bz2; fi
  if [ $(phantomjs --version) != $PHANTOMJS_VERSION ]; then tar -xvf $PWD/travis_phantomjs/phantomjs-$PHANTOMJS_VERSION-linux-x86_64.tar.bz2 -C $PWD/travis_phantomjs; fi

  phantomjs --version
fi

# 2. Run the npm install to pull in test dependencies
npm install

# 3. Run tests
npm test
