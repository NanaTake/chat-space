$(document).on('turbolinks:load', function(){
  function buildHTML(datafromsearch){
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">
                    ${datafromsearch.name}
                  </p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${datafromsearch.id}" data-user-name="${datafromsearch.name}" >
                    追加
                  </div>
                </div>`
    $("#user-search-result").append(html);
  }

  function NoResult(message){
    let html = `<li>${message}</li>`
    $("#user-search-result").append(html);
  }
  
  $(".chat-group-form__search.clearfix").on("keyup", function() {
    var input = $("#user-search-field").val();

    $.ajax({
      type: 'GET',
      url: '/users/search',
      data: { keyword: input },
      dataType: 'json'
    })

    .done(function(users) {
      $("#user-search-result").empty();
      if (users.length !== 0) {
        users.forEach(function(data){
          buildHTML(data);
        });
      }
      else {
        NoResult("一致するユーザーが見つかりません");   
      }
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    });
  });
});