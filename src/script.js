$(function() {
  var Database = {
    database_url: 'database.csv',
    search: function(input_string) {
      $.ajax({
        url: self.database_url,
        async: false,
        success: function(result) {
          return $.parseJSON(result);
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
