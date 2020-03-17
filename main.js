$(document).ready(() => {

  var $body = $('body');

  $('.clear-timeline').on('click', () => {
    $('.left-bar').html('');
    $('.clear-timeline').toggle();
  });

  function renderFeed() {
    //clear the div each time function is called
    $('.tweet-list').html('');
    //get a new copy of streams.home data
    let tweetsFeed = streams.home;
    console.log(tweetsFeed);
    //sort the data by descending times
    tweetsFeed.sort(function(a,b) {
      return b.created_at - a.created_at;
    });
    //display the tweets in the feed
    for (let k = 0; k < tweetsFeed.length; k++) {
      let tweet = tweetsFeed[k];
      let $tweet = $('<div class="tweets"></div>');
      $tweet.html(`${getImprovedDate(tweet.created_at)} @${tweet.user}: ${tweet.message}`);
      $tweet.appendTo(".tweet-list");
    }
  }

  renderFeed();

  //build user btns for the timeline sidebar
  for (var i = 0; i < users.length; i++) {
    let $userBtn = $('<button></button>');
    //console.log(users[i]);
    $userBtn.attr({
          type: "button",
          class: "btn btn-link",
          value: i,
          id: `btn-${users[i]}`
        });
    $userBtn.html(`${users[i]}`);
    $(".followers h4").after($userBtn);
  }

  //display tweets by user (for timeline sidebar)
  function getUserTweets(author) {
    var userObj = streams.users[author];
    $('.left-bar').html('');

    userObj.sort(function(a,b) {
      return b.created_at - a.created_at;
    });
    
    for (let array in userObj) {
      var userTweet = userObj[array];
      var $addItem = $('<div class="tweets"></div>');
      var date = getImprovedDate(userTweet.created_at);
      $addItem.html(`${date}: ${userTweet.message}`);
      $addItem.appendTo(".left-bar");
      //for(let msg in allUserTweets) {
      //console.log(userTweet.message, userTweet.created_at);
      //}
      //console.log(allUserTweets);
    }
  }

  //change default date display to HH:MM:S instead of full timezone
  function getImprovedDate(date) {
    var hr = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    return `[${hr}:${min}:${sec}]`;
  }


  //allow timeline to be toggled/hidden
  $('#btn-timeline').on('click',()=>{
    $('.followers').toggle(600);
  });

  //for future version giving user ability to tweet
  $('#btn-tweet').on('click',()=>{
    alert('This functionality has not been built yet.');
  });

  //appends newly generated tweets (appending in descending order by time)
  $('#btn-refresh').on('click', ()=>{
    renderFeed();
  });

  //give users ability to clear a users timeline
  $(".btn-link").on('click', event => {
    $('.clear-timeline').html('<h5>Clear Timeline</h5>');
    $('.clear-timeline').show();
    getUserTweets(users[$(event.currentTarget).val()]);
  });

});