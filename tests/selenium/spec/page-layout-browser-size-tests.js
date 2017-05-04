const NavPage = require('../framework/page-objects/NavPage');

describe('page layout and browser size tests', function() {
  var navPage;

  beforeEach(function() {
    browser.ignoreSynchronization = true;
    navPage = new NavPage();
  });
  
  it('does not have mobile navigation visible at large sizes', function() {
    // FIXME: Abstract this into a "Run this test on desktop" function.
    //        Take sizes from the CSS that we use to define sizes.
    navPage.setWindowSize(1060, 640);
    
    navPage.waitTillTopNavOnScreen();
    expect(navPage.getMobileNavHeight()).toEqual(0);
    expect(navPage.getMobileNavWidth()).toEqual(0);
  });
  
  itNoPhantom('has mobile navigation visible at small sizes', function() {
    navPage.setWindowSize(360, 640);
    
    navPage.waitTillTopNavNotOnScreen();
    expect(navPage.getMobileNavHeight()).toBeGreaterThan(0);
    expect(navPage.getMobileNavWidth()).toBeGreaterThan(0);
  });
  
  function itNoPhantom(desc, fn) {
    if (process.env.PHANTOMJS) {
      xit(desc, fn);
    } else {
      it(desc, fn);
    }
  }

});
