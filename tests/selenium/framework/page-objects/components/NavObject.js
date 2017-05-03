'use strict';

const BaseComponent = require('./BaseComponent');

class NavObject extends BaseComponent {
  constructor(containerSelector) {
    super(containerSelector, 'nav');
  }

  getTopNav() {
    return this.$el.$("#top-nav");
  }

  getTopNavElements() {
    // FIXME: Try selecting the element using `:first-child`
    return this.$el.$$('#top-nav ul li');
  }

  getTopNavDocumentationText() {
    return this.getTopNavElements().get(1).getText();
  }

  getMobileNav() {
    return this.$el.$("#mobile-nav");
  }

  getMobileNavHeight() {
    return this.getMobileNav().getSize().then(function(dimension) {
      return dimension.height;
    });
  }

  getMobileNavWidth() {
    return this.getMobileNav().getSize().then(function(dimension) {
      return dimension.width;
    });
  }
}

module.exports = NavObject;