$(function() {
  $.getJSON('api', updateFeedback);

  $('.feedback-form').submit(function(e) {
    e.preventDefault();
    $.post('api', {
      name: $('#feedback-form-name').val(),
      title: $('#feedback-form-title').val(),
      message: $('#feedback-form-message').val()
    }, updateFeedback);
  });

  $('.feedback-messages').on('click', (e)=> {
      if (e.target.className == 'glyphicon glyphicon-remove') {
        $.ajax({
          url: 'api/' + e.target.id,
          type: 'DELETE',
          success: updateFeedback
        }); //ajax
      } // the target is a delete button
  }); //feedback messages

  function updateFeedback(data) {
   let dataOutput = '';
   $.each(data,function(key, item) {
     dataOutput += '     <div class="feedback-item item-list media-list">';
     dataOutput += '       <div class="feedback-item media">';
     dataOutput += '       <div class="media-left"><button class="feedback-delete btn btn-xs btn-danger"><span id="' + key + '" class="glyphicon glyphicon-remove"></span></button></div>';
     dataOutput += '         <div class="feedback-info media-body">';
     dataOutput += '           <div class="feedback-head">';
     dataOutput += '             <div class="feedback-title">' + item.title + ' <small class="feedback-name label label-info">' + item.name + '</small></div>';
     dataOutput += '           </div>';
     dataOutput += '           <div class="feedback-message">' + item.message + '</div>';
     dataOutput += '         </div>';
     dataOutput += '       </div>';
     dataOutput += '     </div>';
   });
   $('.feedback-messages').html(dataOutput);
  }
});
