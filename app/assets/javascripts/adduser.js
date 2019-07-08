$(document).on('turbolinks:load', function(){
  function buildHTML(name, id) {
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    $("#chat-group-users").append(html);
  }

  $(document).on("click", ".user-search-add.chat-group-user__btn.chat-group-user__btn--add", function (e) {
    e.preventDefault();
    console.log("add");
    var user = $(this).parent('.chat-group-user.clearfix');
    console.log(user);
    var id = user.children('.user-search-add.chat-group-user__btn.chat-group-user__btn--add').attr('data-user-id');
    console.log(id);
    var name = user.children(".chat-group-user__name").text();
    console.log(name);
    buildHTML(name, id);
    $("#user-search-result").empty();
  });

  $(document).on('click', '.user-search-remove', function() {
    var remove_user = $(this).parent('.chat-group-user.clearfix.js-chat-member');
    remove_user.remove();
  });
});