import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import './App.css'


class BookShelf extends Component {
  state = {
  }

  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
  }

  render() {
    const { books, title } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
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
