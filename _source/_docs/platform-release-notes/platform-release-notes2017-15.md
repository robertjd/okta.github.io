---
layout: docs_page
title: Platform Release Notes
excerpt: Summary of changes to the Okta Platform since Release 2017.12
---

## Release 2017.15

### Advance Notice: API Rate Limit Improvements

We are making org-wide rate limits more granular, and treating authenticated end-user interactions
separately. More granular rate limits will further lessen the likelihood of calls to one URI impacting
another. Treating authenticated end-user interactions separately will lessen the chances of one user's
impacting another. We’re also providing a transition period so you can see what these changes will
look like in your Okta system log before enforcing them:

1. By approximately Friday, 4/7/2017, you'll see system log alerts that let you know if you
would have exceeded any of the new API rate limits. We're making this feature available over the next few days to all preview orgs,
and the feature will remain in preview for at least two weeks.
2. Starting later in April, 2017, we’ll treat authenticated end-user interactions on a per-user basis.
Interactions like SSO after login won't apply to your org-wide API rate limits.
3. Early in May, 2017, we will enforce the new, more granular rate limits. At that
point, the warnings in the System Log will change to error notifications.

Of course, as each change is released, we'll announce the change here.

For a full description of the rate limit changes, see [API Rate Limit Improvements](https://support.okta.com/help/articles/Knowledge_Article/API-Rate-Limit-Improvements).<!-- OKTA-110472 -->

<!--
### Feature Improvements
 * xxx
-->
<!-- (OKTA-114417) -->

<!-- ### Platform Bugs Fixed
 * description (OKTA-number)
 -->

### Does Your Org Have This Change Yet?

To verify the current release for an org, click the **Admin** button and check the footer of the Dashboard page.

![Release Number in Footer](/assets/img/release_notes/version_footer.png)

### Looking for Something Else?

* [Platform Release Note Index](platform-release-notes2016-index.html)
* For changes outside the Okta platform, see the [Product Release Notes](https://help.okta.com/en/prev/Content/Topics/ReleaseNotes/preview.htm).

