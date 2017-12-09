$(function() {
  var search_input = $('header#page-header input[type="text"].search-bar');

  search_input.on('input', function() {
    if($(this).val().length) {
      $('body').addClass('searching');
    } else {
      $('body').removeClass('searching');
    }
  });
});
