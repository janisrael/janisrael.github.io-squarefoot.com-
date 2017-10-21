$('#contact-send').click(form_registration);

function form_registration() {

  var input_data = $('#contact-form').serialize();
  $.ajax({
    type: 'post',
    url: 'contact.php',
    data: input_data,
    dataType: 'json',
    success: function(msg) {
      console.log(msg);
      if (msg.Status) {
        alert('Success!');
      } else {
        alert('Error!');
      }
    },
    error: function() {
      console.log('ERROR!');
    }
  });
  return false;
}