const NavPage = require('../framework/page-objects/NavPage');
const util = require('../framework/shared/util');

describe('navigation bar search tests', function() {
  const navPage = new NavPage();

  beforeEach(function() {
    browser.ignoreSynchronization = true;
    navPage.load();
  });

  it('does search on desktop browser sizes', function () {
    navPage.setWindowSize(1060, 640);

    navPage.clickSearchIcon();
    expect(navPage.areSearchResultsPresent()).toBeFalsy();

    navPage.enterSearchText('Authentication');
    navPage.submitSearch();

    expect(navPage.areSearchResultsPresent()).toBeTruthy();
  });

  util.itNoPhantom('does search on mobile browser sizes', function () {
    navPage.setWindowSize(360, 640);

    navPage.clickMobileSearch();
    expect(navPage.areSearchResultsPresent()).toBeFalsy();

    navPage.enterMobileSearchText('Authentication');
    navPage.submitMobileSearch();

    expect(navPage.areSearchResultsPresent()).toBeTruthy();
  });
});
