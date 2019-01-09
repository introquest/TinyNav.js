(function(factory){

    // -----------------------
    // AMD Compatibility
    // -----------------------
    //
    // jCarousel registers as an asynchronous module with dependency on jQuery for [AMD][1] compatible script loaders.
    // Besides that it also complies with [CommonJS][2] module definition for Node and such.
    // Of course, no fancy script loader is necessary and good old plain script tag still works too.
    //
    // [1]:http://en.wikipedia.org/wiki/Asynchronous_module_definition
    // [2]:http://en.wikipedia.org/wiki/CommonJS
    //
    var
        amd= typeof define == 'function' && define.amd && (define(['jquery'], factory) || true),
        commonjs= !amd && typeof module == 'object' && typeof module.exports == 'object' && (module.exports= factory),
        plain= !amd && !commonjs && factory(jQuery)

})(function(jQuery){ return jQuery.tinyNav || (function(jQuery, window, document, undefined){

    'use strict';

    var tinyNav = jQuery.tinyNav = function(element, options) {
        return jQuery(element).tinyNav(options);
    };

    tinyNav.version = '1.2';

    /*! http://tinynav.viljamis.com v1.2 by @viljamis */
    (function ($, i) {
      $.fn.tinyNav = function (options) {

        // Default settings
        var settings = $.extend({
          'active' : 'selected', // String: Set the "active" class
          'header' : '', // String: Specify text for "header" and show header instead of the active item
          'indent' : '- ', // String: Specify text for indenting sub-items
          'label'  : '' // String: sets the <label> text for the <select> (if not set, no label will be added)
        }, options);

        return this.each(function () {

          // Used for namespacing
          i++;

          var $nav = $(this),
            // Namespacing
            namespace = 'tinynav',
            namespace_i = namespace + i,
            l_namespace_i = '.l_' + namespace_i,
            $select = $('<select/>').attr("id", namespace_i).addClass(namespace + ' ' + namespace_i);

          if ($nav.is('ul,ol')) {

            if (settings.header !== '') {
              $select.append(
                $('<option/>').text(settings.header)
              );
            }

            // Build options
            var options = '';

            $nav
              .addClass('l_' + namespace_i)
              .find('a')
              .each(function () {
                options += '<option value="' + $(this).attr('href') + '">';
                var j;
                for (j = 0; j < $(this).parents('ul, ol').length - 1; j++) {
                  options += settings.indent;
                }
                options += $(this).text() + '</option>';
              });

            // Append options into a select
            $select.append(options);

            // Select the active item
            if (!settings.header) {
              $select
                .find(':eq(' + $(l_namespace_i + ' li')
                .index($(l_namespace_i + ' li.' + settings.active)) + ')')
                .attr('selected', true);
            }

            // Change window location
            $select.change(function () {
              window.location.href = $(this).val();
            });

            // Inject select
            $(l_namespace_i).after($select);

            // Inject label
            if (settings.label) {
              $select.before(
                $("<label/>")
                  .attr("for", namespace_i)
                  .addClass(namespace + '_label ' + namespace_i + '_label')
                  .append(settings.label)
              );
            }

          }

        });

      };
    })(jQuery, 0);

    return jQuery.tinyNav;

})(jQuery, window, document);

});