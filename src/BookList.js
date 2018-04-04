import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import BookItem from "./BookItem";

class BookList extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    getBooks: PropTypes.func.isRequired,
    updateBookShelf: PropTypes.func.isRequired
  };
  /**
   * @description On Component mount get books
   */
  componentDidMount() {
    this.props.getBooks();
  }
  render() {
    const { books, updateBookShelf } = this.props;
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Currently Reading</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books
                      .filter(book => book.shelf === "currentlyReading")
                      .map(b => (
                        <BookItem
                          key={b.id}
                          book={b}
                          updateBookShelf={(book, shelf) => {
                            updateBookShelf(book, shelf);
                          }}
                        />
                      ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Want to Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books
                      .filter(book => book.shelf === "wantToRead")
                      .map(b => (
                        <BookItem
                          key={b.id}
                          book={b}
                          updateBookShelf={(book, shelf) => {
                            updateBookShelf(book, shelf);
                          }}
                        />
                      ))}
                  </ol>
                </div>
              </div>
              <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                    {books.filter(book => book.shelf === "read").map(b => (
                      <BookItem
                        key={b.id}
                        book={b}
                        updateBookShelf={(book, shelf) => {
                          updateBookShelf(book, shelf);
                        }}
                      />
                    ))}
                  </ol>
                </div>
              </div>
            </div>
          </div>
          <div className="open-search">
            <Link to="/search">Add a book</Link>
          </div>
        </div>
      </div>
    );
  }
}

export default BookList;
