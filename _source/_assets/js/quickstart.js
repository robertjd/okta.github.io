//= require vendor/director-1.2.6.min.js
$(function() {

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

  if (!window.location.hash || !knownClients.test(window.location.hash)) {
    window.location.hash.replace('/' + defaultClient);
  }

  var frameworkDefinitions = {
    node: [
      {
        name: 'generic',
        label: 'Generic Node'
      },
      {
        name: 'express',
        label: 'Express.js'
      }
    ],
    java: [
      {
        name: 'generic',
        label: 'Generic Java'
      },
      {
        name: 'spring',
        label: 'Spring'
      }
    ]
  };


  var routes = {
    '/([^\/]*)?\/?([^\/]*)?\/?([^\/]*)': function(client, server, framework) {

      console.log('GET', client, server, framework);

      // When the client changes, need to change the deep links for servers

      if (!client) {
        client = defaultClient
      }

      if (!server) {
        server = defaultServer;
      }

      if (!framework) {
        framework = defaultFramework;
      }


      $('#client-selector a').each(function (i, element) {
        element.href = '#/' + element.dataset.value + '/' + server + '/' + framework;
        console.log(1, element.href);
        // element.href = '#/' + element.hash.replace(/#\/([^\/]+)\/([^\/]+)\/([^\/]+)/, '#/' + '$1/' + server + '/$3' );
      });

      $('#server-selector a').each(function (i, element) {
        element.href = '#/' + client + '/' + element.dataset.value + '/' + framework;
        console.log(2, element.href);
      });

      $('#framework-selector a').each(function (i, element) {
        element.href = '#/' + client + '/' + server + '/' + element.dataset.value;
        console.log(3, element.href);
      });


      var clientContentUrl = client + '/default-example.html';

      var serverExampleType = implicitClients.indexOf(client) > -1 ? 'implicit' : 'code';

      var serverContentUrl = server + '/' + serverExampleType + '-' + framework + '.html';

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

      $('#client-selector a').each(function (i, element) {
        if (element.hash.match(client)) {
          return $(element).addClass('active');
        }
        $(element).removeClass('active');
      });
      $('#server-selector a').each(function (i, element) {
        if (element.hash.match(server)) {
          return $(element).addClass('active');
        }
        $(element).removeClass('active');
      });
      $('#framework-selector a').each(function (i, element) {
        $(element).remove();
      });
      frameworkDefinitions[server].forEach(function(frameworkDefinition) {
        var link = $('<a>', {
          text: frameworkDefinition.label,
          href: '#/' + client + '/' + server + '/' + frameworkDefinition.name,
          class: frameworkDefinition.name === framework ? 'active' : ''
        });
        $('#framework-selector').append(link);
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

}());