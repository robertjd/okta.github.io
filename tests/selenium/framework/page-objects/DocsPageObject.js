'use strict';

const BasePageObject = require('./BasePageObject');
const DocsObject = require('./components/DocsObject');

class DocsPageObject extends BasePageObject {
	constructor(getPage) {
		var url = 'http://localhost:4000';
		super(url, getPage);
	}

	initialize() {
		this.docs = new DocsObject();
	}

	getText() {
		return this.docs.getText();
	}
}

module.exports = DocsPageObject;