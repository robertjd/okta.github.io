const BlogPage = require('../framework/page-objects/BlogPage');

describe('blog page tests', function() {
  const blogPage = new BlogPage('/blog');

  beforeEach(function() {
    browser.ignoreSynchronization = true;
    blogPage.load();
  });

  it('has blog posts with read more links to open them', function() {
    expect(blogPage.getBlogPostCount()).toBeGreaterThan(0);
    expect(blogPage.doBlogsHaveReadMoreLink()).toBe(true);

    let blogLink = blogPage.getBlogLink(1);
    blogPage.clickReadMoreOnPost(1);
    expect(blogLink).toContain(blogPage.getCurrentURL());
  });

  it('has pagination and navigates to next and previous links', function() {
    expect(blogPage.isPaginationVisible()).toBe(true);
    expect(blogPage.doesPaginationHaveLinks()).toBe(true);

    blogPage.clickNext();
    expect(blogPage.getCurrentURL()).toBe('/blog/page/2/');
    blogPage.clickPrevious();
    expect(blogPage.getCurrentURL()).toBe('/blog/');

    blogPage.clickItem(2);
    expect(blogPage.getCurrentURL()).toBe('/blog/page/2/');
    blogPage.clickItem(1);
    expect(blogPage.getCurrentURL()).toBe('/blog/');
  });
});
