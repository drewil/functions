// chrome.bookmarks.getTree(function(bookmarkTreeNodes) {
//   console.log(bookmarkTreeNodes);
// });

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === "suggestBookmark") {
    chrome.tabs.update(sender.tab.id, { url: request.url });
  }
});