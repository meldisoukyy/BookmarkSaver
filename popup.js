function saveBookmark(e) {
  e.preventDefault();

  const title = document.querySelector('#bookmark-form_title').value.trim();
  const url = document.querySelector('#bookmark-form_url').value.trim();
  const bookmark = { title, url };

  browser.storage.local.get('bookmarks').then(result => {
    const bookmarks = result.bookmarks || [];
    bookmarks.push(bookmark);
    browser.storage.local.set({ bookmarks }).then(() => {
      showBookmarks(bookmarks);
      document.querySelector('#bookmark-form').reset();
    });
  });
}

function deleteBookmark(index) {
  browser.storage.local.get('bookmarks').then(result => {
    const bookmarks = result.bookmarks || [];
    bookmarks.splice(index, 1);
    browser.storage.local.set({ bookmarks }).then(() => {
      showBookmarks(bookmarks);
    });
  });
}


function showBookmarks(bookmarks) {
  const list = document.querySelector('#bookmark-list');
  list.innerHTML = '';

  if (bookmarks.length !== 0) {
    const header = document.querySelector('#bookmark-list_header');
    header.textContent = 'Saved Bookmarks!';
  }

  bookmarks.forEach((bookmark, index) => {
    const item = document.createElement('li');
    const title = document.createElement('a');
    const deleteBtn = document.createElement('button');

    item.className = 'bookmark-item';
    title.className = 'bookmark-item_title';
    deleteBtn.className = 'bookmark-item_delete';

    title.href = bookmark.url;
    title.textContent = bookmark.title;
    title.target = '_blank';

    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteBookmark(index);

    item.appendChild(title);
    item.appendChild(deleteBtn);
    list.appendChild(item);
  });
}

document.querySelector('#bookmark-form').addEventListener('submit', saveBookmark);

browser.storage.local.get('bookmarks').then(result => {
  showBookmarks(result.bookmarks || []);
});