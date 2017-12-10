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
          Database.items[i].company.toLowerCase().indexOf(query.toLowerCase()) > -1 ||
          Database.items[i].role.toLowerCase().indexOf(query.toLowerCase()) > -1
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
                company: result_item[1],
                role: result_item[2]
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
    handleInput: function() {
      var query = $(this).val();

      if(query.length) {
        $('body').addClass('searching');
        Database.search(query);
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
        var new_item = $(SearchResults.template).clone().appendTo(SearchResults.element);

        new_item.find('.company').text(item.company);
        new_item.find('.role').text(item.role);
        new_item.find('.year').text(item.year);
      });

      console.log(SearchResults.items)
    }
  };

  /*
    Initiate objects
  */
  Database.init();
  SearchBar.init();
});
