# MyReads Project

Bookshelf app that allows you to select and categorize books you have read, are currently reading, or want to read

## To run application

* install all project dependencies with `npm install`
* start the development server with `npm start`

## Project Structure
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with the app.
├── package.json # npm package manager file. 
├── public
│   ├── favicon.ico # React Icon.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app.
    ├── App.js # This is the root of your app. 
    ├── App.test.js # Used for testing. 
    ├── BooksAPI.js # A JavaScript API
    ├── BookList.js # A component to display list of books for each shelf
    ├── BookSearch.js # A component to display Search field and result
    ├── BookItem.js # A component reused in both BookList and BookSearch to display single book with shelf selection option
    ├── icons # Helpful images for your app.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles.
    └── index.js # It is used for DOM rendering only.

