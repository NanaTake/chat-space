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
    e.preventDefault();
    var name = $(".chat-group-user__name.search").text();
    var id = $(".user-search-add").data('data-user-id');
    buildHTML(name, id);
    $("#user-search-result").empty();
  });

  $(document).on('click', '.user-search-remove', function() {
    var me = $(this),
        kw = me.closest('.chat-group-user.clearfix.js-chat-member');
    kw.remove();
});
});