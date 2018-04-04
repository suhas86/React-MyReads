import React from "react";
import { Route } from "react-router-dom";
import BookList from "./BookList";
import BookSearch from "./BookSearch";

import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    searchedBooks: []
  };
  getAllBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  };
  searchBooks = value => {
    if (value.trim().length > 1) {
      BooksAPI.search(value).then(searchedBooks => {
        if (searchedBooks.error) {
          this.setState(() => ({
            searchedBooks: []
          }));
        } else {
          this.setState(() => ({
            searchedBooks: searchedBooks.map(book => {
              this.state.books.map(b => {
                if (b.id === book.id) {
                  book.shelf = b.shelf;
                }
                return book;
              });
              return book;
            })
          }));
        }
      });
    } else {
      this.setState(() => ({
        searchedBooks: []
      }));
    }
  };
  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then(book => {
      this.getAllBooks();
    });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <BookList
              books={this.state.books}
              getBooks={this.getAllBooks}
              updateBookShelf={(book, shelf) => {
                this.updateBookShelf(book, shelf);
              }}
            />
          )}
        />
        <Route
          path="/search"
          render={() => (
            <BookSearch
              searchedBooks={this.state.searchedBooks}
              searchBooks={value => {
                this.searchBooks(value);
              }}
              updateBookShelf={(book, shelf) => {
                this.updateBookShelf(book, shelf);
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
