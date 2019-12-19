/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function createTweetElement(tweet) {
  let tweetBody = `<header>
<div class="nameImg">
<img src="${escape(tweet.user.avatars)}" alt="" />
<div class="name">${escape(tweet.user.name)}</div>
</div>
<div class="userName">${escape(tweet.user.handle)}</div>

</header>
<p>${escape(tweet.content.text)}</p>
<footer>
<div class="daysAgo">${escape(tweet.created_at)}</div>
<div class="references">arefs for like and commenting</div>
</footer>`;

  return $("<article>")
    .addClass("tweet")
    .append(tweetBody);
}
//renderTweets
function renderTweets(tweets) {
  $("#tweets-container").replaceWith("<section id='tweets-container'/>"); //.empty works too
  for (let index = 0; index < tweets.length; index++) {
    let tweet = tweets[index];
    $("#tweets-container").prepend(createTweetElement(tweet));
  }
}

$(document).ready(function() {
  const $form = $("#createTweet");
  // $("#writeTweet").on("click", function(event) {
    $("#writeTweet").click(function() {
      $(".new-tweet").slideToggle( "slow", function() { //text area to be hid
        console.log( "nav write tweet")

      });
    });

  $form.on("submit", function(event) {
    event.preventDefault();
    $("#textInput").empty()
    const $inputText = $('#textInput').val();
    if ($inputText === null || $inputText === ''){
      alert('empty string')
    } else if($inputText.length > 140){
      alert('too long string')

    }else{
      $.post("/tweets", $form.serialize()).done(function(data) {
    
        loadtweets();
      
    
    });
  }
  });

  function loadtweets() {
    $.get("/tweets").then(function(data) {
      renderTweets(data);
    });
  }

  loadtweets();
});




