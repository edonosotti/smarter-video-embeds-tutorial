function getVideoEmbeds() {
  /* Selectors were taken from FitVids.js and edited:
   * https://github.com/davatron5000/FitVids.js/blob/f72b623e466bfe596b5800458d6043675ffb091b/jquery.fitvids.js
   * It is worth checking that code because it has
   * some possibly handy additional features, not
   * ported here to keep this tutorial simple. */
  var selectors = [
    'iframe[src*="player.vimeo.com"]',
    'iframe[src*="youtube.com"]',
    'iframe[src*="youtube-nocookie.com"]',
    'iframe[src*="kickstarter.com"][src*="video.html"]',
    'video'
  ];

  var videos = $('body').find(selectors.join(','));
  // Again, kudos to the FitVids.js team!
  return videos.not('.do-not-resize');
}

function resizeVideos(elements) {
  $(elements).each(function() {
    var width = $(this).width();
    var height = parseInt((width * 9) / 16);
    $(this).height(height);
  });
}

function setCustomCovers(elements) {
  $(elements).each(function() {
    var customCover = $(this).data("custom-cover");
    if (customCover) {
      var coverElement = $('<a href="#" class="custom-video-cover"></a>');
      var label = $(this).data("custom-cover-label");
      if (label) {
        coverElement.html(label);
      }
      coverElement.css('background-image', 'url(' + customCover + ')');
      coverElement.width($(this).width());
      coverElement.height($(this).height());
      coverElement.data('video-element', $(this));
      $(this).replaceWith(coverElement);
    }
  });

  setCustomCoverEventListeners();
}

function setCustomCoverEventListeners() {
  $('.custom-video-cover').click(function(e) {
    e.preventDefault();
    $(this).replaceWith($(this).data('video-element'));
  });
}

function setCustomVideoControls() {
  /* Look for a <video> element wrapped into the same
   * container as the elements with the '.btn-play' and
   * '.btn-pause' classes and call the video API.
   * This approach keeps the HTML code easy and clean,
   * but it requires the <video> elements and their
   * controls to be wrapped in the same container. */
  $('.btn-play').click(function(e) {
    e.preventDefault();
    $(this).parent().children('video')[0].play();
  });
  $('.btn-pause').click(function(e) {
    e.preventDefault();
    $(this).parent().children('video')[0].pause();
  });
}

function setCustomSelectorVideoControls() {
  /* Look for a <video> element using the selector
   * provided with the data-video-selector="" attribute
   * of the button tag. This approach is more flexible,
   * it allows free placement of the <video> elements
   * and their control elements. */
  $('.btn-play-selector').click(function(e) {
    e.preventDefault();
    $($(this).data('video-selector'))[0].play();
  });
  $('.btn-pause-selector').click(function(e) {
    e.preventDefault();
    $($(this).data('video-selector'))[0].pause();
  });
}

function fixLinksForJsFiddle() {
  /* Helper function to change self-hosted video links
   * to absolute URLs to GitHub Pages to run the code
   * in JSFiddle. */
  if (window.location.href.indexOf('fiddle.jshell.net') < 0) {
    return;
  }

  $('video source').each(function() {
    var src = $(this).attr('src');
    src = 'https://edonosotti.github.io/smarter-video-embeds-tutorial/www/' + src;
    $(this).attr('src', src);
  });

  $('video').each(function() {
    $(this)[0].load();
  })
}

$(function() {
  var videos = getVideoEmbeds();
  console.log(videos);
  resizeVideos(videos);
  setCustomCovers(videos);
  setCustomVideoControls();
  setCustomSelectorVideoControls();
  fixLinksForJsFiddle();
});
