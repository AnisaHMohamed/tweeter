/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const escape = function(str) {
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

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
    <div class="daysAgo">${escape(formatTime(tweet.created_at))}</div>
    <div class="references">
    <a href='#1'> <i class="far fa-flag"></i> </a>
    <a href='#2'><i class="fas fa-retweet"></i></a>
    <a href='#3'> <i class="fas fa-heart"></i></a>

     <div class="wrapper">
     <div class="heart x1"></div>
     <div class="heart x2"></div>
     <div class="heart x3"></div>
     <div class="heart x4"></div>
     <div class="heart x5"> </div>
     <div class="altheart x6"></div>
   </div>
    </div>
  </footer>`;
  return $("<article>")
    .addClass("tweet")
    .append(tweetBody);
}
//renderTweets
function renderTweets(tweets) {
  $("#tweets-container").replaceWith("<section id='tweets-container'/>"); //.empty works too

  tweets.forEach(tweet => {
    $("#tweets-container").prepend(createTweetElement(tweet));
  });
}

$(document).ready(function() {
  const $form = $("#createTweet");

  $(".new-tweet").hide();

  $("#writeTweet").click(function() {
    $(".new-tweet").slideToggle("slow", function() {
      //text area to be hid
      $("#textInput").focus();
    });
  });

  $form.on("submit", function(event) {
    event.preventDefault();
    const inputText = $("#textInput").val();


    if (!inputText) {
      $("#validInput").addClass('alert')

    } else if (inputText.length > 140) {
      $("#validInput").removeClass('alert')

    } else {
      
 
      $.post("/tweets", $form.serialize())
      .done(function(data) {
        $("#counter")
        .text(140)
        loadtweets();
        $("#textInput")
        .val("")
        .empty();
        $("#validInput").removeClass('alert')
      
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

const formatTime = milliseconds => {
  const hour = 1000 * 60 * 60;
  const day = hour * 24;
  const month = day * 30;
  const year = month * 12;

  const hoursAway = Math.floor((Date.now() - milliseconds) / hour);
  const daysAway = Math.floor((Date.now() - milliseconds) / day);
  const monthsAway = Math.floor((Date.now() - milliseconds) / month);
  const yearsAway = Math.floor((Date.now() - milliseconds) / year);
  if (Date.now() === milliseconds) {
    return "Just now";
  } else if (yearsAway > 0) {
    return `${yearsAway} years ago`; // years away
  } else if (monthsAway > 0) {
    return `${monthsAway} months ago`; // months away
  } else if (daysAway > 0) {
    return `${$daysAway} days ago`; // days away
  } else if (hoursAway > 0) {
    return `${hoursAway} hours ago`; //hours away
  } else {
    return "Recently";
  }
};
