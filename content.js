document.addEventListener('keypress', function(e) {
  if (document.activeElement.tagName.toLowerCase() !== 'input' && document.activeElement.tagName.toLowerCase() !== 'textarea') {
    var keyword = String.fromCharCode(e.which);
    var currentInput = keyword.toLowerCase();

    var bookmarks = [{
      keyword: "Packaging",
      url: "https://packagingoftheworld.com/"
    }];

    for (var i = 0; i < bookmarks.length; i++) {
      var bookmark = bookmarks[i];
      if (bookmark.keyword.toLowerCase().indexOf(currentInput) === 0) {
        chrome.runtime.sendMessage({ action: "suggestBookmark", url: bookmark.url });
        break;
      }
    }
  }
});