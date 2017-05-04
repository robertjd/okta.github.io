const DocsPage = require('../framework/page-objects/DocsPage');

describe('upstream docs string tests', function() {
  var baseUrl = 'http://localhost:4000';
  var docsPage;

  beforeEach(function() {
    browser.ignoreSynchronization = true;
  });

  it('has authClient.signIn visible in okta-auth-js documentation', function() {
    docsPage = new DocsPage(baseUrl + "/code/javascript/okta_auth_sdk.html"); 
    expect(docsPage.getText()).toContain('authClient.signIn');
  });

  it('has .renderEl visible in okta-signin-widget documentation', function() {
    docsPage = new DocsPage(baseUrl + "/code/javascript/okta_sign-in_widget.html"); 
    expect(docsPage.getText()).toContain('.renderEl');
  });

});
