import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'


class Book extends Component {
  static propTypes = {
    book: PropTypes.object,
    onChangeShelf: PropTypes.func.isRequired,
    selectDefault: PropTypes.string.isRequired
  }


  render() {
    const { book, onChangeShelf, selectDefault } = this.props
    let thumbStyle = {}

    if (book.imageLinks) {
      thumbStyle = {
        backgroundImage: 'url(' + book.imageLinks.thumbnail + ')',
      };
    }

    return (
      <div className="book">
        <div className="book-top">
          {book.imageLinks && (
          <div className="book-cover" style={thumbStyle}>
          </div>)}
          <div className="book-shelf-changer">
            <select
              defaultValue={selectDefault}
              onChange={(event) => {
                onChangeShelf(event.target.value, book)
                }
              }>
              <option value="move to" disabled="true">Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">
          {book.authors && book.authors.map(author => <div key={author}> {author} </div>)}
        </div>
      </div>
    )
  }
}

export default Book
