//= require vendor/director-1.2.6.min.js
$(function() {


/**
 * need to have implicit vs code template for each server/framework choice
 */

  var defaultClient = 'widget';

  if (!window.location.hash) {
    window.location.hash = '/' + defaultClient;
  }

  var routes = {
    '/([^\/]*)?\/?([^\/]*)?\/?([^\/]*)': function(client, server, framework) {

      if (client && !server) {
        $('#server-language-selector a').each(function (i, element) {
          element.hash = element.hash.replace(/#\/([^\/]+)\/([^\/]+)/, '#/' + client + '/$2')
        });
      }

      $.ajax({
        url: client + '.html'
      }).done(function( html ) {
        $( "#client_content" ).html( html );
      });

      $.ajax({
        url: server + '.html'
      }).done(function( html ) {
        $( "#server_content" ).html( html );
      });

    }
  };

  var router = Router(routes);

  router.init();

}());