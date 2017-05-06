'use strict';

const BasePage = require('./BasePage');
const baseUrl = 'http://localhost:4000';

class DocsPage extends BasePage {
  constructor(url, getPage) {
    super(baseUrl + url, getPage);
    this.docs = element(by.css('#docs-body'));
    this.h1Elements = element.all(by.css('h1'));
    this.h2Elements = element.all(by.css('h2'));
  }

  doesh1HeaderContain(header1String) {
    return this.h1Elements.filter(function(element, index) {
      return element.getText().then(function(text) {
        return text === header1String;
      })
    }).then(function(elementList) {
      return elementList.length == 1;
    })
  }

  doesh2HeaderContain(header2Strings) {
    return this.h2Elements.filter(function(element, index) {
      return element.getText().then(function(text) {
        for (var i = 0; i < header2Strings.length; i++) {
          if (text == header2Strings[i]) {
            return true;
          }
        }
      })
    }).then(function(elementList) {
      return elementList.length == header2Strings.length;
    })
  }
}

module.exports = DocsPage;