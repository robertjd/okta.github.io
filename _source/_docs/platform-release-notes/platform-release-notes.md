---
layout: docs_page
title: Platform Release Notes
excerpt: Summary of changes to the Okta Platform since Release 2017.12
---

## Release 2017.14

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

### Platform Feature Improvements

#### Revoke Access Tokens and Refresh Tokens

Use the `oauthTokens` parameter when clearing user sessions to revoke all OpenID Connect and OAuth Access Tokens and Refresh Tokens
issued to the user. For more information, see [the Users API](/docs/api/resources/users.html#clear-user-sessions).<!-- OKTA-116904 -->

#### Token Requests with Grant Type password

Token requests with `password` grant type (`grant_type`) and `openid` scope now returns an ID Token.
Previously only the appropriate Access Token or Refresh Token was returned. <!-- OKTA-117288 -->

#### Authentication That Overrides Client Request Context

Authenticates a user via a trusted application or proxy that uses the activation token.
For more information, see [Authentication API[(/docs/api/resources/authn.html#primary-authentication-with-activation-token). <!-- OKTA-119692 -->

#### HAL Link for User in Provisioned State

A [HAL link](https://tools.ietf.org/html/draft-kelly-json-hal-06) to `/api/v1/users/:uid/lifecycle/reactivate` is now provided
for requests when the user is in a PROVISIONED state but doesn't have a password. <JV: needs "for more info" link>. <!-- OKTA-119221 -->

#### New Developer Org Banner

A new banner displays when you log into your developer org. It provides links to common onboarding tasks.
Once you dismiss the banner, it can't be displayed again. <!-- OKTA-121055 -->

### Platform Bugs Fixed

 * Request to `/api/v1/users` while the user was still activating failed to return an HTTP 409 error. (OKTA-120458)
 * REACT samples contained errors. (OKTA-120530) <JV: Not yet merged, so double check this one>

### Does Your Org Have This Change Yet?

To verify the current release for an org, click the **Admin** button and check the footer of the Dashboard page.

![Release Number in Footer](/assets/img/release_notes/version_footer.png)

### Looking for Something Else?

* [Platform Release Note Index](platform-release-notes2016-index.html)
* For changes outside the Okta platform, see the [Product Release Notes](https://help.okta.com/en/prev/Content/Topics/ReleaseNotes/preview.htm).

