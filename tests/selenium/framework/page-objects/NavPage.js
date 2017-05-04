'use strict';

const BasePage = require('./BasePage');

class NavPage extends BasePage {
  constructor(getPage) {
    var url = 'http://localhost:4000';
    super(url, getPage);
    this.topNav = element(by.css('#top-nav'));
    this.mobileNav = element(by.css("#mobile-nav"));
  }

  getMobileNavHeight() {
    return this.mobileNav.getSize().then(function(dimension) {
      return dimension.height;
    });
  }

  getMobileNavWidth() {
    return this.mobileNav.getSize().then(function(dimension) {
      return dimension.width;
    });
  }

  waitTillTopNavOnScreen() {
    BasePage.prototype.waitTillOnScreen(this.topNav);
  }

  waitTillTopNavNotOnScreen() {
    BasePage.prototype.waitTillNotOnScreen(this.topNav);
  }
}

module.exports = NavPage;