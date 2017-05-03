'use strict';

const util = require('../shared/util');
const _ = require('lodash');

class BasePageObject {
  constructor(url, getPage) {
    this.url = url;
    if (_.isUndefined(getPage) || getPage) {
      this.get();
    }
    this.initialize();
  }

  get() {
    browser.get(util.formatUrl(this.url, true));
    util.wait($('.Page'));
  }

  navigateTo(url) {
    browser.get(util.formatUrl(url, true));
    util.wait($('.Page'));  
  }

  setWindowSize(width, height) {
    browser.driver.manage().window().setSize(width, height);
  }

  initialize() {}
}

module.exports = BasePageObject;
