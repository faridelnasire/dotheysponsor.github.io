$(function() {
  /*
    Database
  */
  var Database = {
    database_url: 'database.csv',
    items: [],
    search: function(input_string) {
      return self.items;
    },
    initiate: function() {
      $.ajax({
        url: self.database_url,
        async: false,
        success: function(raw_results) {
          raw_results.split('\n').forEach(function(raw_result_item){
            result_item = raw_result_item.split(';');

            self.items.push({
              year: result_item[0],
              company: result_item[1],
              role: result_item[2]
            })
          });

          return results;
        }
      });
    }
  };

  Database.initiate();

  var search_input = $('header#page-header input[type="text"].search-bar');

  search_input.on('input', function() {
    var search_input = $(this).val();

    if(search_input.length) {
      $('body').addClass('searching');

      var results = Database.search(search_input);
      console.log(results);
    } else {
      $('body').removeClass('searching');
    }
  });
});
