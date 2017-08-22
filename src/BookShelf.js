import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'
import './App.css'


class BookShelf extends Component {
  state = {
    shelfBooks: []
  }

  static propTypes = {
    books: PropTypes.array.isRequired,
    title: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
  }

  changeShelf = (shelfName, book) => {
    console.log('shelfName = ', shelfName);
    console.log('book = ', book);
    console.log('state.shelfBooks = ', this.state.shelfBooks);
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps !== this.props) {
        this.setState({shelfBooks: this.props.books})
    }
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
                  book={book}
                  onChangeShelf={this.changeShelf}/>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default BookShelf
