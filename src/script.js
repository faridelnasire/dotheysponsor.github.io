String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.split(search).join(replacement);
};

$(function() {
  /*
    Database
  */
  var Database = {
    database_url: 'database.txt',
    items: [],
    search: function(query) {
      SearchResults.items = [];

      for (var i = 0; i < Database.items.length; i++) {
        if(
          Database.items[i].company.indexOf(query) > -1 ||
          Database.items[i].role.indexOf(query) > -1
        ) {
          SearchResults.items.push(Database.items[i]);
        }
      }

      SearchResults.render();
    },
    init: function() {
      $.ajax({
        url: Database.database_url,
        async: true,
        success: function(results) {
          results.split('\n').forEach(function(result_item){
            result_item = result_item.split(';');

            if(result_item.length == 3) {
              Database.items.push({
                year: result_item[0],
                company: result_item[1].toLowerCase(),
                role: result_item[2].toLowerCase()
              });
            }
          });
        }
      });
    }
  };


  /*
    Search Bar
  */
  var SearchBar = {
    element: $('input[type="text"].search-bar'),
    query: '',
    handleInput: function() {
      SearchBar.query = $(this).val();

      if(SearchBar.query.length) {
        $('body').addClass('searching');
        Database.search(SearchBar.query);
      } else {
        $('body').removeClass('searching');
      }
    },
    init: function() {
      SearchBar.element.on('input', SearchBar.handleInput);
    }
  };


  /*
    Search Results
  */

  var SearchResults = {
    element: $('section#search-results ol'),
    template: $('section#search-results ol li.template'),
    items: [],
    render: function() {
      $('div.result-count span').text(SearchResults.items.length);

      SearchResults.element.html('');

      SearchResults.items.forEach(function(item) {
        var new_item = $(SearchResults.template).clone().appendTo(SearchResults.element).removeClass('template');

        // Highlight query in result
        // start_char = item.company.indexOf(SearchBar.query);
        // end_char = start_char + SearchBar.query.length;
        item.company_verbose = item.company.replaceAll(
          SearchBar.query, '<span class="highlighted">' + SearchBar.query + '</span>'
        );
        item.role_verbose = item.role.replaceAll(
          SearchBar.query, '<span class="highlighted">' + SearchBar.query + '</span>'
        );

        new_item.find('.company').html(item.company_verbose);
        new_item.find('.role').html(item.role_verbose);
        new_item.find('.year').text(item.year);
      });
    }
  };

  /*
    Initiate objects
  */
  Database.init();
  SearchBar.init();
});
