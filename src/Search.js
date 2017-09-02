import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import './App.css'

class SearchBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    inputSearch: PropTypes.func.isRequired,
    changeShelf: PropTypes.func.isRequired
  }


  render() {
    const { books, inputSearch, changeShelf } = this.props

    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text"
              placeholder="Search by title or author"
              onChange={(event) => {
                inputSearch(event.target.value)
              }
            } />
          </div>
        </div>
        <div className="search-books-results">
          <BookShelf
            books={books}
            title='Search Results'
            category="none"
            changeShelf={changeShelf}/>
        </div>
      </div>
    )
  }
}

export default SearchBooks
