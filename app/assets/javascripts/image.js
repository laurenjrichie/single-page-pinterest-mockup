$(document).ready(function() {
  $("input[type='submit']").on('click', function(event) {
    var new_title = $("#image_title").val();
    var new_url = $("#image_url").val();
    var new_username = $("#image_username").val();

    event.preventDefault();

    $.ajax("/images",
      { type: 'post',
        data: {
          image: {
            title: new_title,
            url: new_url,
            username: new_username,
          }
        }
      }
    ).done(function(data) {
      $('#image_title').val('');
      $('#image_url').val('');
      $('#image_username').val('');

      var new_image = '<div data-id="' + data.id + '" \
      class="col-md-4" ><img src="' + data.url + '"><p><strong>' + data.title + '</strong>\
        |  <span class="glyphicon glyphicon-user"></span>' + data.username + '\
          |  <span class="glyphicon glyphicon-remove"></span>  |  \
          <span id="likes"> '+ data.likes + '</span>\
          <span class="glyphicon glyphicon-heart"></span></div>';

      $('#image_display').append(new_image);
    }).fail(function(data) {
      console.log(data.responseText);
    });
  });

  $("#image_display").on('click', 'span.glyphicon-remove', function(event) {
    var id = $(this).parent().parent().data('id');
    var url = '/images/' + id

    $.ajax(url, {type: 'delete'}).done(function(data) {
      var div = $('div[data-id="' + data.id + '"]');
      div.fadeOut(function() {
        div.remove();
      });
    }).fail(function(data) {});

  });

  $("#image_display").on('click', 'span.glyphicon-heart', function(event){
    var id = $(this).parent().parent().data('id');
    $.ajax('/images/' + id, {type: 'patch'}).done(function(data) {
      $('span#likes').text(data.likes);
    });

  });

});
