'use strict';

const BasePage = require('./BasePage');

class DocsPage extends BasePage {
  constructor(url, getPage) {
    super(url, getPage);
    this.docs = element(by.css('#docs-body'));
  }

  getText() {
    return this.docs.getText();
  }
}

module.exports = DocsPage;