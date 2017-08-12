import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'
import Book from './Book'

class FoundBooks extends Component {
  state = {
    books: []
  }
  static propTypes = {
    query: PropTypes.string.isRequired,
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
      console.log('state = ', this.state.books);
    })
  }

  render() {
    const { books } = this.state
    const { query } = this.props

    let showingBooks
    console.log('render -> query = ', query, 'books = ', books);
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      console.log('render -> books = ', books)
      showingBooks = books.filter((books) => match.test(books.title))
    } else {
      showingBooks = books
    }

    showingBooks.sort(sortBy('title'))
    console.log('showingBooks = ', showingBooks)
    return (
      <div className="found-books">
        <ol className="found-books-list">
          {query.length !== 0 && showingBooks.map((books) => (
            <li key={books.id} className='contact-list-item'>
              <Book
                author={books.authors[0]}
                title={books.title}
                thumbnail={books.imageLinks.thumbnail}/>
            </li>
          ))}
        </ol>
      </div>
    )
  }
}

export default FoundBooks
