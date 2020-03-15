$(document).ready(() => {

  var $body = $('body');
  //$body.html('');


  //$('.clear-timeline').hide();

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

  
  function getUserTweets(author) {
    var userObj = streams.users[author];
    console.log(userObj);
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


  function getImprovedDate(date) {
    var hr = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    return `[${hr}:${min}:${sec}]`;
  }


  //getUserTweets('mracus');


/*  getUserTweets('shawndrost');
  getUserTweets('sharksforcheap');
  getUserTweets('mracus');
  getUserTweets('douglascalhoun');

  setTimeout(function(){
    getUserTweets('shawndrost');
  }, 10000);*/


  $('#btn-timeline').on('click',()=>{
    $('.followers').toggle(600);
  });

  $('#btn-tweet').on('click',()=>{
    alert('This functionality has not been built yet.');
  });

  $('#btn-refresh').on('click', ()=>{
    renderFeed();
  });

  $(".btn-link").on('click', event => {
    $('.clear-timeline').html('<h5>Clear Timeline</h5>');
    $('.clear-timeline').show();
    getUserTweets(users[$(event.currentTarget).val()]);
  });

});


/* JQUERY EFFECTS

  $('.login-button').on('click', () => {
    $('.login-form').show();
  });
  
  $('.menu-button').on('mouseenter', () => {
    $('.nav-menu').show()
  })
  
  $('.nav-menu').on('mouseleave', () => {
    $('.nav-menu').hide();
  })
  
  $('.product-photo').on('mouseenter', event => {
    $(event.currentTarget).addClass('photo-active')
  }).on('mouseleave', event => {
    $(event.currentTarget).removeClass('photo-active')
  })





*/