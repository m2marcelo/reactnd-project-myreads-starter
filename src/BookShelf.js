import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import './App.css'


class BookShelf extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    changeShelf: PropTypes.func.isRequired
  }

  render() {
    const { books, title, category, changeShelf } = this.props

    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.length !== 0 && books.map((book) => (
              <li key={book.id} className='contact-list-item'>
                <Book
                  book={book}
                  onChangeShelf={changeShelf}
                  selectDefault={book.shelfName ? book.shelfName : category}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
