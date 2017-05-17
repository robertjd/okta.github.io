'use strict';

const util = require('../shared/util');
const _ = require('lodash');
const EC = protractor.ExpectedConditions;
const baseUrl = 'http://localhost:4000';

class BasePage {
  constructor(relativeURL) {
    this.pageLoadElement = "";
    if(relativeURL) {
      this.url = baseUrl + relativeURL;
    } else {
      this.url = baseUrl;
    }
  }

  setPageLoadElement(element) {
    this.pageLoadElement = element;
  }

  load() {
    this.get();
    return this.waitForPageLoad();
  }

  waitForPageLoad() {
    return util.wait(this.pageLoadElement);
  }

  get() {
    browser.ignoreSynchronization = true;
    browser.get(this.url);
  }

  setWindowSize(width, height) {
    browser.driver.manage().window().setSize(width, height);
  }

  waitUntilOnScreen(elementFinder) {
    browser.wait(util.isOnScreen(elementFinder));
  }

  waitUntilOffScreen(elementFinder) {
    browser.wait(EC.not(util.isOnScreen(elementFinder)));
  }

  elementsContainText(elements, expectedTextArray) {
    if (!Array.isArray(expectedTextArray)) {
      expectedTextArray = [expectedTextArray];
    }
    return elements.filter((element, index) => {
      return element.getText().then((text) => {
        return expectedTextArray.indexOf(text) > -1;
      });
    }).then((elementList) => {
      return elementList.length == expectedTextArray.length;
    })
  }

  urlContains(str) {
    return EC.urlContains(str)();
  }

  getCurrentURL() {
    return browser.getCurrentUrl().then(function(url) {
      // return url relative to baseURL
      return url.replace(baseUrl, '');
    })
  }

  getBaseURL() {
    return baseUrl;
  }

  // FIXME: Take sizes from the CSS that we use to define sizes.
  resizeDesktop() {
    browser.driver.manage().window().setSize(1060, 640);
  }

  resizeMobile() {
    browser.driver.manage().window().setSize(360, 640);
  }
}

module.exports = BasePage;
