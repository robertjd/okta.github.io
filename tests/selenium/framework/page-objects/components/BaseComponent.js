'use strict';

const util = require('../../shared/util');
const _ = require('lodash');

class BaseComponent {
  constructor(containerSelector, componentSelector) {
    if (!_.isUndefined(containerSelector) && !_.isString(containerSelector)) {
      this._setElement(containerSelector);
    }
    else {
      this._setElementByClass(containerSelector, componentSelector);
    }
  }

  _setElementByClass(containerSelector, componentSelector) {
    this._setElement($(_.toString(containerSelector) + _.toString(componentSelector)));
  }

  _setElement(el) {
    this.$el = el;
  }

  _hasClass(className, el) {
    return (el || this.$el).getAttribute('class').then(function (attr) {
      if (attr.split(' ').indexOf(className) !== -1) {
        return true;
      }
      return false;
    });
  }

  _doesNotHaveClass(className, el) {
    return (el || this.$el).getAttribute('class').then(function (attr) {
      if (attr.split(' ').indexOf(className) === -1) {
        return true;
      }
      return false;
    });
  }

  /*
    Wait for the passed element to have a certain class.  The promise is resolved when the element has the class passed.
    If no element is passed then the function will act on the component element.
   */
  _waitForElementHasClass(className, el) {
    return browser.wait(util.EC.and(function () {
      return this._hasClass(className, el);
    }.bind(this)));
  }
}

module.exports = BaseComponent;
