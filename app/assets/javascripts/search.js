$(document).on('turbolinks:load', function(){
  function buildHTML(data){
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${data.name}
                  </p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${data.id}" data-user-name="${data.name}">
                    追加
                  </div>
                </div>`
  }

  function NoResult(message){
    let html = `<li>${message}</li>`
  }
  
  $("#user-search-field").on("keyup", function() {
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users/index',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users).length !== 0) {
        users.forEach(function(data){
          var html = buildHTML(data);
          $("#user-search-result").append(html);
        });
      }
      else {
        NoResult("一致するユーザーが見つかりません");
        $("#user-search-result").append(html);
      }
    })
    .fail(function() {
      alert('error');
    });
  });
});