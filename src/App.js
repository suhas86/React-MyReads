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
  /**
   * @description Get all books and set it to books state
   */
  getAllBooks = () => {
    BooksAPI.getAll().then(books => {
      this.setState(() => ({
        books
      }));
    });
  };
  /**
   * @description Search book and add shelf if books are already added to shelf.
   * Min text required for search is 2 charecters
   *  @param {string} value query text
   */
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
  /**
   * @description Update book to selected shelf
   * @param {object} book book object
   * @param {string} shelf to which book has to be moved
   */
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
