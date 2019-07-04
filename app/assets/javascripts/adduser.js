$(document).on('turbolinks:load', function(){
  function buildHTML(name, id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $(".chat-group-form__field--right.add-position").append(html);
  }

  $(document).on("click", ".user-search-add", function (e) {
    var user = $(this).parent('.chat-group-user.clearfix');
    var id = user.children('.user-search-add').attr('data-user-id');
    var name = user.children(".chat-group-user__name").text();
    buildHTML(name, id);
    $("#user-search-result").empty();
  });

  $(document).on('click', '.user-search-remove', function() {
    var remove_user = $(this).parent('.chat-group-user.clearfix.js-chat-member');
    remove_user.remove();
});
});