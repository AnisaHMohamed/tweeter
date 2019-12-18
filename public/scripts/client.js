/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
const user = [
  {
    user: {
      name: "Newton",
      avatars: "https://i.imgur.com/73hZDYK.png",
      handle: "@SirIsaac"
    },
    content: {
      text:
        "If I have seen further it is by standing on the shoulders of giants"
    },
    created_at: 1461116232227
  },
  {
    user: {
      name: "Descartes",
      avatars: "https://i.imgur.com/nlhLi3I.png",
      handle: "@rd"
    },
    content: {
      text: "Je pense , donc je suis"
    },
    created_at: 1461113959088
  }
];

function createTweetElement(tweet) {
  let tweetBody = `<header>
<div class="nameImg">
<img src="${tweet.user.avatars}" alt="" />
<div class="name">${tweet.user.name}</div>
</div>
<div class="userName">${tweet.user.handle}</div>

</header>
<p>${tweet.content.text}</p>
<footer>
<div class="daysAgo">${tweet.created_at}</div>
<div class="references">arefs for like and commenting</div>
</footer>`;

  return $("<article>")
    .addClass("tweet")
    .append(tweetBody);
}
//renderTweets
function renderTweets(tweets) {
  for (let index = 0; index < tweets.length; index++) {
    let tweet = tweets[index];
    $("#tweets-container").append(createTweetElement(tweet));
  }
}

$(document).ready(function() {
  renderTweets(user);
});
