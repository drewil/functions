document.addEventListener('DOMContentLoaded', function () {

	const searchInput = document.getElementById('searchInput');
	const resultsList = document.getElementById('resultsList');
	const folderNamesContainer = document.getElementById('folderNamesContainer');

	// Search bookmarks
	function searchBookmarks(query) {

		chrome.bookmarks.search(query, function (bookmarks) {

			resultsList.innerHTML = '';
			folderNamesContainer.innerHTML = '';

			bookmarks.forEach(function (bookmark) {

				// Fetch the parent folder name
				const folderNamePromise = new Promise((resolve, reject) => {
					chrome.bookmarks.get(bookmark.parentId, function (folder) {
						resolve(folder[0].title);
					});
				});

				// Once the folder name is retrieved
				folderNamePromise.then(folderName => {
					const folderNameItem = document.createElement('div');
					folderNameItem.textContent = folderName;
					folderNamesContainer.appendChild(folderNameItem);
				});

				// Create and append list item for bookmark suggestion
				const listItem = document.createElement('li');
				listItem.textContent = bookmark.title;
				listItem.addEventListener('click', function () {
					chrome.tabs.create({ url: bookmark.url });
				});
				resultsList.appendChild(listItem);

			});
		});
	}

	// Input
	searchInput.addEventListener('input', function () {

		const query = searchInput.value.trim();

		if (query.length > 0) {
			searchBookmarks(query);
		} else {
			resultsList.innerHTML = '';
			folderNamesContainer.innerHTML = '';
		}
	});
});