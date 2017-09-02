import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import BookShelf from './BookShelf'
import './App.css'


class MyReads extends Component {
  static propTypes = {
    reading: PropTypes.array.isRequired,
    wantRead: PropTypes.array.isRequired,
    read: PropTypes.array.isRequired,
    changeShelf: PropTypes.func.isRequired,
    openSearch: PropTypes.func.isRequired
  }


  render() {
    const { reading, wantRead, read, changeShelf, openSearch } = this.props

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
          {reading.length > 0 && (
            <BookShelf
              books={reading}
              title="Currently Reading"
              category="currentlyReading"
              changeShelf={changeShelf}/>
            )}
            {wantRead.length > 0 && (
            <BookShelf
              books={wantRead}
              title="Want to Read"
              category="wantToRead"
              changeShelf={changeShelf}/>
            )}
            {read.length > 0 && (
            <BookShelf
              books={read}
              title="Read"
              category="read"
              changeShelf={changeShelf}/>
            )}
          </div>
        </div>
        <div className="open-search">
          <Link to='/search' className='add-a-book' onClick={openSearch}>>Add a book</Link>
        </div>
      </div>
    )
  }
}

export default MyReads
