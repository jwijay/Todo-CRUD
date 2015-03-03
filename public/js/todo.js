$("ul").on("click", "#remove-button", function() {
  this.parentNode.submit();
});

$("ul").on("change", "input[type=checkbox]", function() {
  var doc_id = $(this).data('todo-id');

  if ($(this).prop("checked")) {
    $.ajax({
      url : '/todos/'+doc_id+'/complete',
      type : "PUT"
    });
    console.log('/todos/'+doc_id+'/complete');
    alert('put request sent DAWG');
  } else {
    $.ajax({
      url : '/todos/'+doc_id+'/uncomplete',
      type : "PUT"
    });
    console.log('/todos/'+doc_id+'/uncomplete');
    alert('put request sent to uncomplete the task.');
  }
});