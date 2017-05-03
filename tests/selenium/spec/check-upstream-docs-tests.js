const DocsPageObject = require('../framework/page-objects/DocsPageObject');

describe('upstream docs string tests', function() {
  var baseUrl = 'http://localhost:4000';
  var docsPage;

  beforeEach(function() {
    browser.ignoreSynchronization = true;
    docsPage = new DocsPageObject(); 
  });

  it('has authClient.signIn visible in okta-auth-js documentation', function() {
    docsPage.navigateTo(baseUrl + "/code/javascript/okta_auth_sdk.html");

    expect(docsPage.getText()).toContain('authClient.signIn');
  });

  it('has .renderEl visible in okta-signin-widget documentation', function() {
    docsPage.navigateTo(baseUrl + "/code/javascript/okta_sign-in_widget.html");

    expect(docsPage.getText()).toContain('.renderEl');
  });

});
