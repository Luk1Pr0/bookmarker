const modal = document.getElementById("modal");
const modalShow = document.getElementById("show-modal");
const modalClose = document.getElementById("close-modal");
const bookmarkForm = document.getElementById("bookmark-form");
const websiteNameEl = document.getElementById("website-name");
const websiteUrlEl = document.getElementById("website-url");
const bookmarksContainer = document.getElementById("bookmarks-container");

let bookmarks = [];

function showModal() {
    modal.classList.add("show-modal");
    websiteNameEl.focus();
}

// Validate form
function validate(nameValue, urlValue) {
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    const regEx = new RegExp(expression);
    if (!nameValue || !urlValue) {
        alert("Please fill in both fields");
        return false;
    }
    if (!urlValue.match(regEx)) {
        alert("Please provide a valid web address url");
        return false;
    }
    // Valid
    return true;
}

function fetchBookmarks() {
    // get bookmarks from local storage if available
    if (localStorage.getItem("bookmarks")) {
        bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    } else {
        // Create a bookmarks array
        bookmarks = [
            {
                name: "mb-works",
                url: "mb-works.co.uk",          
            },
        ];
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks)); 
    }
    console.log(bookmarks);
}

// Handle data from the form
function storeBookmark(e) {
    e.preventDefault();
    const nameValue = websiteNameEl.value;
    let urlValue = websiteUrlEl.value;
    if (!urlValue.includes("http://", "https://")) {
        urlValue = `https://${urlValue}`;
    }
    if (!validate(nameValue, urlValue)) {
        return false;
    }
    const bookmark = {
        name: nameValue,
        url: urlValue,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    fetchBookmarks();
    bookmarkForm.reset();
    websiteNameEl.focus();
}

// Event listeners
modalShow.addEventListener("click", showModal);
modalClose.addEventListener("click", () => modal.classList.remove("show-modal"));
window.addEventListener("click", (e) => (e.target === modal ? modal.classList.remove("show-modal") : false));
bookmarkForm.addEventListener("submit", storeBookmark);

// Fetch bookmarks on load
fetchBookmarks();