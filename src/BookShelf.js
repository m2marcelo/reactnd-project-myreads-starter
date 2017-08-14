import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import './App.css'


class BookShelf extends Component {
  state = {
  }

  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  render() {
    const { books } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">Search Results</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.length !== 0 && books.map((book) => (
              <li key={book.id} className='contact-list-item'>
                <Book
                  author={book.authors}
                  title={book.title}
                  thumbnail={book.imageLinks.thumbnail}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
