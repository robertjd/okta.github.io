'use strict';

const BasePageObject = require('./BasePageObject');
const NavObject = require('./components/NavObject');

class NavPageObject extends BasePageObject {
	constructor(getPage) {
		var url = 'http://localhost:4000';
		super(url, getPage);
	}

	initialize() {
		this.nav = new NavObject();
	}

	getDocumentationText() {
		return this.nav.getTopNavDocumentationText();
	}

	getMobileNavHeight() {
		return this.nav.getMobileNavHeight();
	}

	getMobileNavWidth() {
		return this.nav.getMobileNavWidth();
	}
}

module.exports = NavPageObject;