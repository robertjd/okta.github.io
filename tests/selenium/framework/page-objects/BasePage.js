'use strict';

const util = require('../shared/util');
const _ = require('lodash');
const EC = protractor.ExpectedConditions;
const baseUrl = 'http://localhost:4000';

class BasePage {
  constructor(relativeURL) {
    if(relativeURL) {
      this.url = baseUrl + relativeURL;
    } else {
      this.url = baseUrl;
    }
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

  elementContainsText(element, expectedTextArray) {
    return element.getText().then(function(text) {
      let found = true;
      for (let i = 0; i < expectedTextArray.length; i++) {
        if (text.indexOf(expectedTextArray[i]) < 0) {
          found = false;
        }
      }
      return found;
    })
  }

  urlContains(str) {
    return EC.urlContains(str)();
  }

}

module.exports = BasePage;
