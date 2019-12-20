$(document).ready(function() {
  $("#textInput").on("keyup", function(event) {
    const tweetLength = $(this).val().length;
    const max = 140;
    const remainingChar = max - tweetLength;

    if (remainingChar < 0) {
      $("#counter")
        .text(remainingChar)
        .addClass("over");

      $("#charactersAlert")
      .addClass("over");
      
      $('.references')
      .addClass("over")

    } else {
      $("#counter")
      .text(remainingChar)
      .removeClass("over");

      $("#charactersAlert")
      .removeClass("over");
        
      $('.references')
      .removeClass("over")
      
    }
  });
});
