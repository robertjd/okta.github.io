'use strict';

const BasePage = require('./BasePage');

class NavPage extends BasePage {
  constructor(getPage) {
    var url = 'http://localhost:4000';
    super(url, getPage);
    this.topNav = element(by.css('#top-nav'));
    this.mobileNav = element(by.css("#mobile-nav"));
  }
  
  waitTillTopNavOnScreen() {
    this.waitTillOnScreen(this.topNav);
  }

  waitTillTopNavNotOnScreen() {
    this.waitTillNotOnScreen(this.topNav);
  }
  
  isMobileNavDisplayed() {
    return this.mobileNav.isDisplayed();
  }
}

module.exports = NavPage;