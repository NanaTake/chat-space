$(document).on('turbolinks:load', function(){
  function buildHTML(message) {
    var content = (message.content !== null) ? `${ message.content }` : "" ;
    var image = (message.image.url !== null) ? `<img class= "lower-message__image" src= "${message.image.url}" >` : "" ;
    var html = `<div class="message" data-message-id="${message.id}">
                  <div class="upper-message">
                    <p class="upper-message__user-name">
                      ${message.user_name}
                    </p>
                    <p class="upper-message__date">
                      ${message.created_at}
                    </p>
                  </div>
                  <p class="lower-message">
                    <div class="lower-message__content">
                    ${content}
                    </div>
                    ${image}
                  </p>
                </div>`
  return html;
  }

  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formdata = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({  
      url: url,
      type: 'POST',
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('#new_message')[0].reset();
      $('.chat-main').animate({scrollTop: $('.chat-main')[0].scrollHeight}, 'fast');
    })
    .fail(function(){
      alert('エラーが発生したためメッセージは送信できませんでした。');
    })
    .always(function(){
      $('.form__form-for__submit').prop('disabled', false);
    })
  })

  var reloadMessages = function () {
    $(document).ready(function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
        var last_message_id = $('.message:last').data("message-id");

        $.ajax({
          url: "api/messages",
          type: 'get',
          dataType: 'json',
          data: {last_id: last_message_id}
        })

        .done(function (messages) {
          var insertHTML = '';
          messages.forEach(function (message) {
            insertHTML = buildHTML(message);
            $('.messages').append(insertHTML);
          })
          $('.chat-main').animate({scrollTop: $('.chat-main')[0].scrollHeight}, 'fast');
        })
        .fail(function () {
          alert('自動更新に失敗しました');
        });
      }
    });
  };
  setInterval(reloadMessages, 5000);
});