'use strict';

const BasePage = require('./BasePage');
const util = require('../shared/util');

class BlogPage extends BasePage {
  constructor(url) {
    super(url);
    this.blogElement = $('.wrap.blog');
    this.blogPostElements = $$('article.post-block');
    this.paginationElement = $('.pagination');
    this.nextLink = element(by.partialLinkText('Next'));
    this.prevLink = element(by.partialLinkText('Prev'));
    this.setPageLoadElement(this.blogElement);
  }
  
  getBlogPostCount() {
    return this.blogPostElements.count();
  }

  isPaginationVisible() {
    return this.paginationElement.isDisplayed();
  }

  doesPaginationHaveLinks() {
    let links = ['Prev', '1', '2', 'Next'];

    return this.paginationElement.getText().then(function(text) {
      for (let i = 0; i < links.length; i++) {
        if (text.indexOf(links[i]) < 0) {
          return false;
        }
      }
      return true;
    })
  }

  doBlogsHaveReadMoreLink() {
    let blogCount = 0;
    return this.blogPostElements.filter(function (blogPost) {
      blogCount++;
      let readMoreLink = blogPost.element(by.linkText('Read more'));
      return readMoreLink.isPresent();
    }).then(function (elementList) {
      return elementList.length == blogCount;
    })
  }

  clickNext() {
    return this.nextLink.click();
  }

  clickPrevious() {
    return this.prevLink.click();
  }

  clickItem(item) {
    let itemLink = element(by.linkText(item.toString()));
    return itemLink.click();
  }

  clickReadMoreOnPost(post) {
    let blogPost = this.blogPostElements.get(post);
    let readMoreLink = blogPost.element(by.linkText('Read more'));
    return readMoreLink.click();
  }
  
  getBlogLink(post) {
    let blogPost = this.blogPostElements.get(post);
    let title = blogPost.element(by.css('a'));
    return title.getAttribute('href');
  }
}

module.exports = BlogPage;