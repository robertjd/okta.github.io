'use strict';

const BaseComponent = require('./BaseComponent');

class DocsObject extends BaseComponent {
  constructor(containerSelector) {
    super(containerSelector, '#docs-body');
  }

  getText() {
    return this.$el.getText();
  }
}

module.exports = DocsObject;