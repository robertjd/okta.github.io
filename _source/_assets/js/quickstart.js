//= require vendor/director-1.2.6.min.js

  // links working
  // default content
  // icons

/**
 * need to have implicit vs code template for each server/framework choice
 */

  var authCodeClients = ['ios', 'android'];
  var implicitClients = ['widget', 'angular', 'react'];
  var serverLanguages = ['node','java'];
  var defaultClient = 'widget';
  var defaultServer = 'node';
  var defaultFramework = 'generic';

  var knownClients = new RegExp(implicitClients.concat(authCodeClients).join('|'));

  var linkDefinitions = {
    clients: [
      {
        name: 'angular',
        label: 'Angular'
      },
      {
        name: 'ios',
        label: 'iOS'
      },
      {
        name: 'widget',
        label: 'Sign-In Widget',
        active: true
      }
    ],
    servers: [
      {
        active: true,
        name: 'node',
        label: 'Node JS',
        frameworks: [
          {
            active: true,
            name: 'generic',
            label: 'Generic Node'
          },
          {
            name: 'express',
            label: 'Express.js'
          }
        ]
      },
      {
        name: 'java',
        label: 'Java',
        frameworks: [
          {
            name: 'generic',
            label: 'Generic Java',
            active: true
          },
          {
            name: 'spring',
            label: 'Spring'
          }
        ]
      },
      {
        name: 'php',
        label: 'PHP',
        frameworks: [
          {
            name: 'generic',
            label: 'Generic PHP',
            active: true
          }
        ]
      }
    ]
  }

  function applyCurrentUrl() {
    var matches = window.location.hash.match('/([^\/]*)?\/?([^\/]*)?\/?([^\/]*)');
    if (matches && matches.length) {
      var activeClient = matches[1];
      var activeServer = matches[2];
      var activeFramework = matches[3];
      linkDefinitions.clients.forEach(function (client) {
        client.active = client.name === activeClient;
      });
      linkDefinitions.servers.forEach(function (server) {
        server.active = server.name === activeServer;
        server.frameworks.forEach(function (framework) {
          framework.active = framework.name === activeFramework;
        });
      });
    }
  }

  applyCurrentUrl();

  linkDefinitions.clients.forEach(function (client) {
    var link = $('<a>', {
      text: client.label,
      class: client.active ? 'active' : '',
      click: function () {
        linkDefinitions.clients.forEach(function (client) {
          client.link.removeClass('active');
          client.active = false;
        });
        $(this).addClass('active');
        client.active = true;
        setUrl();
      }
    });
    client.link = link;
    $('#client-selector').append(link);
  });

  linkDefinitions.servers.forEach(function (server) {
    var link = $('<a>', {
      text: server.label,
      class: server.active ? 'active' : '',
      click: function () {
        linkDefinitions.servers.forEach(function (server) {
          server.link.removeClass('active');
           server.active = false;
        });
        renderFrameworkLinks(server);
        $(this).addClass('active');
        server.active = true;
        setUrl();
      }
    });
    server.link = link;
    $('#server-selector').append(link);
    if (server.active) {
      renderFrameworkLinks(server);
    }
  });

  function renderFrameworkLinks(server) {
    $('#framework-selector a').each(function (i, element) {
      $(element).remove();
    });

    server.frameworks.forEach(function (framework) {
      var link = $('<a>', {
        text: framework.label,
        class: framework.active ? 'active' : '',
        click: function () {
          server.frameworks.forEach(function (framework) {
            framework.link.removeClass('active');
            framework.active = false;
          });
          $(this).addClass('active');
          framework.active = true;
          setUrl();
        }
      });
      framework.link = link;
      $('#framework-selector').append(link);
    });
  }

  function setUrl() {
    var hash = '#/';
    linkDefinitions.clients.forEach(function (client) {
      if (client.active) {
        hash += client.name + '/';
      }
    });
    linkDefinitions.servers.forEach(function (server) {
      if (server.active) {
        hash += server.name + '/';
        server.frameworks.forEach(function (framework) {
          if (framework.active) {
            hash += framework.name;
          }
        });
      }
    });

    window.location.replace(hash);
  }


  if (!window.location.hash || !knownClients.test(window.location.hash)) {
    setUrl();
  }

  var routes = {
    '/([^\/]*)?\/?([^\/]*)?\/?([^\/]*)': function(client, server, framework) {

      if (!client) {
        client = defaultClient
      }

      if (!server) {
        server = defaultServer;
      }

      if (!framework) {
        framework = defaultFramework;
      }

      var clientContentUrl = client + '/default-example.html';

      var serverExampleType = implicitClients.indexOf(client) > -1 ? 'implicit' : 'auth-code';

      var serverContentUrl = server + '/' + framework + '-' + serverExampleType + '.html';

      $.ajax({
        url: clientContentUrl
      }).done(function( html ) {
        $( "#client_content" ).html( html );
      });

      $.ajax({
        url: serverContentUrl
      }).done(function( html ) {
        $( "#server_content" ).html( html );
      });

    }
  };

  window.scrollToServer = function () {
    $('body').animate({scrollTop: $('#server_setup').offset().top - 150});
    $('#server_setup_link').addClass('active');
    $('#client_setup_link').removeClass('active');
  };

  window.scrollToClient = function () {
    $('body').animate({scrollTop: $('#client_setup').offset().top - 150});
    $('#client_setup_link').addClass('active');
    $('#server_setup_link').removeClass('active');
  };

  var router = Router(routes);

  router.init();

  $('#client_setup_link').addClass('active');

