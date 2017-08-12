import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './App.css'


class Book extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }

  componentDidMount() {

  }

  render() {
    const { title, author, thumbnail } = this.props

    const thumbStyle = {
      width: '128px',
      height: '193px',
      backgroundImage: 'url(' + thumbnail + ')',
    };

    return (
      <div className="book">
        <div className="book-top">
          <div className="book-cover" style={thumbStyle}>
          </div>
          <div className="book-shelf-changer">
            <select>
              <option value="none" disabled="">Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{title}</div>
        <div className="book-authors">{author}</div>
      </div>
    )
  }
}

export default Book
