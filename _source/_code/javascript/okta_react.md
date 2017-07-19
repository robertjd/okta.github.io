---
layout: docs_page
title: React + Okta Auth SDK
weight: 30
excerpt: Integrate Okta with a React application using Auth JS.
---

# Overview
This guide will walk you through integrating authentication into a React application with Okta by performing these steps:
1. Add an OpenID Connect Client in Okta
2. Create a React App
3. Create an Authentication Utility
4. Create Routes
5. Start Your App

## Prerequisites
If you do not already have a **Developer Edition Account**, you can create one at [https://developer.okta.com/signup/](https://developer.okta.com/signup/).

## Add an OpenID Connect Client in Okta
* Log into the Okta Developer Dashboard, and **Create New App**
* Choose **Single Page App (SPA)** as the platform, then populate your new OpenID Connect application with values similar to:

| Setting             | Value                                               |
| ------------------- | --------------------------------------------------- |
| Application Name    | OpenId Connect App *(must be unique)*               |
| Login redirect URIs | http://localhost:3000/callback                      |
| Logout redirect URIs| http://localhost:3000/login                         |

> *As with any Okta application, make sure you assign Users or Groups to the OpenID Connect Client. Otherwise, no one can use it.*

### Enable [CORS](http://developer.okta.com/docs/api/getting_started/enabling_cors.html)
For security reasons, browsers make it difficult to make requests to other domains. In this example, we'll make requests from `http://localhost:3000` to `https://{yourOrg}.oktapreview.com`.

You can configure `https://{yourOrg}.oktapreview.com` to accept our requests by [enabling CORS for `http://localhost:3000`](/docs/api/getting_started/enabling_cors.html#granting-cross-origin-access-to-websites).

## Create a React App
To quickly create a React app, install the create-react-app CLI:
```bash
$ npm install -g create-react-app
```

Now, create a new application:
```bash
$ create-react-app okta-app
```

This creates a new project named `okta-app` and installs all required dependencies.

The simplest way to add authentication into a React app is using the [Okta Auth JS](okta_auth_sdk) library. We can install it via `npm`:
```bash
$ cd okta-app && npm install @okta/okta-auth-js --save
```

We'll also need `react-router-dom` to manage our routes:
```bash
[okta-app] $ npm install react-router-dom --save
```

## Create an Authentication Utility
Users can sign in to your React application a number of different ways.
The easiest, and most secure way is to use the **default login page**. This page renders the [Okta Sign-In Widget](okta_sign-in_widget), equipped to handle User Lifecycle operations, MFA, and more. 

First, create `src/Auth.js` as an authorization utility file and use it to bootstrap the required fields to login:

> Important: We're using Okta's organization authorization server to make setup easy, but it's less flexible than a custom authorization server. Most SPAs send access tokens to access APIs. If you're building an API that will need to accept access tokens, [create an authorization server](https://developer.okta.com/docs/how-to/set-up-auth-server.html#create-an-authorization-server)

```typescript
// src/Auth.js

import OktaAuth from '@okta/okta-auth-js';

export default class Auth {
  oktaAuth = new OktaAuth({
    url: 'https://{yourOrg}.oktapreview.com',
    clientId: '{clientId}',
    issuer: 'https://{yourOrg}.oktapreview.com',
    redirectUri: 'http://localhost:3000/callback',
  });
  
  constructor(args) {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.onLogin = args.onLogin;
    this.onLogout = args.onLogout;
  }

  isAuthenticated() {
    // Checks if there is a current accessToken in the TokenManger.
    return !!this.oktaAuth.tokenManager.get('accessToken');
  }

  login() {
    // Launches the login redirect.
    this.oktaAuth.token.getWithRedirect({ 
      responseType: ['id_token', 'token'],
      scopes: ['openid', 'email', 'profile']
    });
  }

  async logout() {
    this.oktaAuth.tokenManager.clear();
    await this.oktaAuth.signOut();
    this.onLogout();
  }

  async handleAuthentication() {
    const tokens = await this.oktaAuth.token.parseFromUrl();
    for (let token of tokens) {
      if (token.idToken) {
        this.oktaAuth.tokenManager.add('idToken', token);
      } else if (token.accessToken) {
        this.oktaAuth.tokenManager.add('accessToken', token);
      }
    }
    this.onLogin();
  }
}
```

## Add Routes
Lets take a look at what routes are needed:
- `/`: A default page to handle basic control of the app.
- `/callback`: Handle the response from Okta and store the returned tokens.
- `/protected`: A route protected by an `isAuthentication` check.

### `/`
First, create `src/Home.js` to provide the Login logic:

```typescript
// src/Home.js

import React from 'react';
import { Link } from 'react-router-dom';

export default props => {
  // Change the button that's displayed, based on our authentication status
  const button = props.auth.isAuthenticated() ?
    <button onClick={props.auth.logout}>Logout</button> :
    <button onClick={props.auth.login}>Login</button>;

  return (
    <div>
      <Link to='/'>Home</Link><br/>
      <Link to='/protected'>Protected</Link><br/>
      {button}
    </div>
  );
};
```

### `/callback`
In order to handle the redirect back from Okta, we need to capture the token values from the URL. Use the `/callback` route to handle the logic of storing these tokens and redirecting back to the main page.

Create a new component `src/Callback.js`:

```typescript
// src/Callback.js

import React from 'react';
import { Redirect } from 'react-router-dom';

export default props => {
  if (!props.auth.isAuthenticated()) {
    props.auth.handleAuthentication(props.onAuthenticated);
    return null;
  }
  return <Redirect to='/'/>;
}
```

### `/protected`
This route will be protected, only permitting users with a valid `accessToken`.

Create a new component `src/Protected.js`:

```typescript
// src/Protected.js

import React from 'react';

export default props => {
  if (!props.auth.isAuthenticated()) {
    props.auth.login();
    return null;
  }
  return <h3>Protected</h3>;
};
```

### Connect the Routes
Update `src/App.js` to include your project components and routes:

```typescript
// src/App.js

import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Auth from './Auth';
import Home from './Home';
import Callback from './Callback';
import Protected from './Protected';

class App extends Component {
  componentWillMount() {
    this.auth = new Auth({
      onLogin: this.onLogin.bind(this),
      onLogout: this.onLogout.bind(this)
    });
  }

  onLogin() {
    this.setState({
      isAuthenticated: true
    });
  }

  onLogout() {
    this.setState({
      isAuthenticated: false
    });
  }

  render() {
    return (
      <Router>
        <div>
          <Route path='/' exact={true} render={() => <Home auth={this.auth}/>}/>
          <Route path='/callback' render={() => <Callback auth={this.auth}/>}/>
          <Route path='/protected' render={() => <Protected auth={this.auth}/>}/>
        </div>
      </Router>
    );
  }
}

export default App;
```

## Start your app
Finally, start your app:

```bash
[okta-app] $ npm start
```

## Conclusion
You have now successfully authenticated with Okta! Now what? With a user's `id_token`, you have basic claims for the user's identity. You can extend the set of claims by modifying the `scopes` to retrieve custom information about the user. This includes `locale`, `address`, `groups`, and [more](../../docs/api/resources/oidc.html).

## Support 
Have a question or see a bug? Post your question on [Okta Developer Forums](https://devforum.okta.com/).
