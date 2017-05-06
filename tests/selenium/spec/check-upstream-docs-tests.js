const DocsPage = require('../framework/page-objects/DocsPage');

describe('upstream docs string tests', function() {
  var docsPage;

  beforeEach(function() {
    browser.ignoreSynchronization = true;
  });

  it('has headers visible in okta-auth-js documentation', function() {
    docsPage = new DocsPage("/code/javascript/okta_auth_sdk.html");
    expect(docsPage.doesh1HeaderContain("Overview")).toBeTruthy();
    var header2Strings = ['Prerequisites', 'Installation', 'Authentication Flow'];
    expect(docsPage.doesh2HeaderContain(header2Strings)).toBeTruthy();
  });

  it('has headers visible in okta-signin-widget documentation', function() {
    docsPage = new DocsPage("/code/javascript/okta_sign-in_widget.html");
    expect(docsPage.doesh1HeaderContain("Overview")).toBeTruthy();
    var header2Strings = ['A simple example', 'An in-depth example', 'Customization'];
    expect(docsPage.doesh2HeaderContain(header2Strings)).toBeTruthy();
  });
});
