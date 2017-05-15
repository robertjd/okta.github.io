const NavPage = require('../framework/page-objects/NavPage');
const util = require('../framework/shared/util');

describe('page layout and browser size tests', function() {
  const navPage = new NavPage();

  beforeEach(function() {
    browser.ignoreSynchronization = true;
    navPage.load();
  });
  
  it('shows the main navigation with desktop browser sizes', function(done) {
    navPage.runTestOnDesktopBrowserSize();
    navPage.waitUntilTopNavOnScreen();
    expect(navPage.isMobileNavDisplayed()).toBeFalsy();
    done();
  });

  // Phantom does not support the CSS transform we use to hide the top nav
  util.itNoPhantom('shows mobile navigation with mobile browser sizes', function(done) {
    navPage.runTestOnMobileBrowserSize();
    navPage.waitUntilTopNavOffScreen();
    expect(navPage.isMobileNavDisplayed()).toBeTruthy();

    navPage.clickMobileToggle();
    expect(navPage.isMobileNavActive()).toBeTruthy();
    done();
  });

  it('does search on desktop browser sizes', function(done) {
    navPage.runTestOnDesktopBrowserSize();
    navPage.clickSearchIcon();
    expect(navPage.areSearchResultsPresent()).toBeFalsy();
    navPage.enterSearchText('Authentication').then(function(){
      navPage.submitSearch();
    });
    expect(navPage.areSearchResultsPresent()).toBeTruthy();
    done();
  });
});
