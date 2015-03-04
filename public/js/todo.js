$(function() {
  $('ul input[type=checkbox][checked]').siblings().find('span.title').css({
      'text-decoration' : 'line-through',
      'color' : '#AAA'
  });
  $('ul input[type=checkbox][checked]').siblings().find('span.description').css({
      'text-decoration' : 'line-through',
      'color' : '#AAA'
  });

  $("ul").on("click", "#remove-button", function() {
    this.parentNode.submit();
  });

  $("ul").on("change", "input[type=checkbox]", function() {
    var doc_id = $(this).data('todo-id');

    if ($(this).prop("checked")) {
      $(this).siblings().find('span.title').css({
        'text-decoration' : 'line-through',
        'color' : '#AAA'
      });
      $(this).siblings().find('span.description').css({
        'text-decoration' : 'line-through',
        'color' : '#AAA'
      });
      $.ajax({
        url : '/todos/'+doc_id+'/complete',
        type : "PUT"
      });
    } else {
      $(this).siblings().find('span.title').css({
        'text-decoration' : 'none',
        'color' : '#333'
      });
      $(this).siblings().find('span.description').css({
        'text-decoration' : 'none',
        'color' : '#333'
      });
      $.ajax({
        url : '/todos/'+doc_id+'/uncomplete',
        type : "PUT"
      });
    }

    $('.not_done_count').load('/ .not_done_count');
    $('.done_count').load('/ .done_count');
  });
});
