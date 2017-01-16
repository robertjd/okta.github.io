---
layout: docs_page
title: Platform Release Notes
excerpt: Summary of changes to the Okta Platform since Release 2016.51
---

## Release 2017.02

<!-- ### Advance Notice: API Rate Limit Improvements

In the coming months, Okta will improve how API rate limits are reported, and how they are enforced.

* Shortly after February 8, 2017, we'll provide system log alerts to let you know that you exceeded an API rate limit. At this time, we'll change some rate limits.
* Shortly after March 8, 2017, rate limits will be enforced.

Of course, as each change is released, we'll announced here.

For more details, see [API Rate Limit Improvements](https://support.okta.com/help/articles/Knowledge_Article/API-Rate-Limit-Improvements). --> <!-- OKTA-110472 -->

### Feature Improvements: New Expression Language Function

The new [expression language](/reference/okta_expression_language) function `Arrays.toCsvString(array)` converts an array to a comma-delimited string. For example:

`Arrays.toCsvString({"This", "is", " a ", "test"})` returns `This,is, a ,test` <!-- OKTA-51976 -->

### Platform Bugs Fixed

* Introspection behavior for OpenID Connect and API Access Management was inconsistent across all token types when users were not in the ACTIVE state. (OKTA-110445)
* Incorrect text in the Okta user interface, related to authorization (OpenID Connect and API Access Management), was corrected: 
    * **Password** became **Resource Owner Password** in **Apps** > **General Settings** > **Allowed Grant Types**.
    * **Resource Owner Credential** became **Resource Owner Password** in the Edit Rule page of the authorization server configuration dialog
        (**Security** > **API** > **Authorization Servers**). (OKTA-110749)   
* In some orgs, the links for `self` and `next` were returned with incorrect values. (OKTA-111350)

### Does Your Org Have This Change Yet?

To verify the current release for an org, click the **Admin** button and check the footer of the Dashboard page.

![Release Number in Footer](/assets/img/release_notes/version_footer.png)

### Looking for Something Else?

* [Platform Release Note Index for 2016](platform-release-notes2016-index.html)
* For changes outside the Okta platform, see the [Release Notes Knowledge Hub](http://support.okta.com/help/articles/Knowledge_Article/Release-Notes-Knowledge-Hub).

