$(function() {
  var Database = {
    database_url: 'database.csv',
    search: function(input_string) {
      $.ajax({
        url: self.database_url,
        async: false,
        success: function(raw_results) {
          var results = [];

          raw_results.split('\n').forEach(function(raw_result_item){
            result_item = raw_result_item.split(';');

            results.append({
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
