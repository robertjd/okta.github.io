---
layout: docs_page
title: Platform Release Notes
excerpt: Summary of changes to the Okta Platform since Release 2017.29
---

## Release 2017.30

### Platform Features

#### Email Factor  <!-- OKTA-133829  -->

The following EA feature enhancement is in preview orgs and expected in production orgs during the week of July 24, 2017. To enable an EA feature, contact Okta Support.

You can send a one-time password (OTP) and an activation link to an email address as part of enrolling a user.

#### Sign-In Widget Build Changes   <!--  OKTA-132800  -->

The way to build the Okta Sign-In Widget has changed. For more information, see [Okta Sign-In Widget Quickstart](/code/javascript/okta_sign-in_widget.html).


### Platform Bugs Fixed

These platform bug fixes are available in preview orgs and expected in production orgs the week of July 31, 2017.

* Okta Sign-In Widget formatting conflicted with the surrounding user interface.  (OKTA-121127)

* Under some circumstances users who did not have a secondary email address could not perform a self-service password reset operation.   (OKTA-128340)

* "When the `expand` parameter was set in GET requests to [`/api/vi/groups`](/docs/api/resources/groups.html#list-groups), the second and subsequent pages of the response did not have the same `expand` setting.  (OKTA-132503)

* [`/oauth2/v1/clients`](https://developer.okta.com/docs/api/resources/oauth-clients.html#register-new-client) returned HTTP status code 200 rather than 201 when creating a client successfully.  (OKTA-128839)

* [`/oauth2/v1/clients/{clientId}`](/docs/api/resources/oauth-clients.html#get-oauth-client) returned HTTP status code 404 rather than 401 when it did not find the specified client.  (OKTA-130804, OKTA-130848)



### Does Your Org Have This Change Yet?

To verify the current release for an org, click the **Admin** button and check the footer of the Dashboard page.

{% img release_notes/version_footer.png alt:"Release Number in Footer" %}


### Looking for Something Else?

* [Platform Release Note Index](platform-release-notes2016-index.html)
* For changes outside the Okta platform, see the [Product Release Notes](https://help.okta.com/en/prev/Content/Topics/ReleaseNotes/preview.htm).

