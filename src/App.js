import React from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'
import {
  currentlyReading,
  wantToRead,
  read
} from './constants'


class BooksApp extends React.Component {

  state = {
    query: '',
    books:[],
    reading: currentlyReading.books,
    wantRead: wantToRead.books,
    read: read.books,
  }

  findInShelf = (book, shelfName) => {
    return shelfName.find(storedBook => storedBook.title === book.title)
  }

  updateQuery = (query) => {
    if (query.length > 0){
      BooksAPI.search(query.trim(), 20).then((books) => {
        if (books.error) {
          this.clearSearch()
        } else {
          books.map((book) => {
            if (!book.authors) {
              book.authors = ['']
            }
            if (!book.title) {
              book.title = ''
            }
            if (!book.imageLinks ||
               !book.imageLinks.thumbnail) {
              book.imageLinks = { thumbnail: ''}
            }
            if (this.findInShelf(book, this.state.reading)) {
              book.shelfName = 'currentlyReading'
            } else if (this.findInShelf(book, this.state.wantRead)) {
              book.shelfName = 'wantToRead'
            } else if (this.findInShelf(book, this.state.read)) {
              book.shelfName = 'read'
            } else {
              book.shelfName = 'none'
            }
          })
          this.setState({ books })
        }
      })
    }
  }

  changeShelf = (shelfName, book) => {
    if (book.shelfName !== shelfName) {
      book.shelfName = shelfName
    }

    switch (shelfName) {
      case 'currentlyReading':
        this.setState((state) => ({
          wantRead: state.wantRead.filter((c) => c.id !== book.id),
          read: state.read.filter((c) => c.id !== book.id),
          reading: state.reading.concat([ book ])
        }))
        break;
      case 'wantToRead':
        this.setState((state) => ({
          reading: state.reading.filter((c) => c.id !== book.id),
          read: state.read.filter((c) => c.id !== book.id),
          wantRead: state.wantRead.concat([ book ])
        }))
        break;
      case 'read':
        this.setState((state) => ({
          reading: state.reading.filter((c) => c.id !== book.id),
          wantRead: state.wantRead.filter((c) => c.id !== book.id),
          read: state.read.concat([ book ])
        }))
        break;
      case 'none':
      default:
        this.setState((state) => ({
          reading: state.reading.filter((c) => c.id !== book.id),
          wantRead: state.wantRead.filter((c) => c.id !== book.id),
          read: state.read.filter((c) => c.id !== book.id),
        }))
        break;
    }
  }

  clearSearch = () => {
    this.setState({ books: [] })
  }

  render() {
    return (
      <div className="app">
          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    books={this.state.reading}
                    title={currentlyReading.title}
                    category="currentlyReading"
                    changeShelf={this.changeShelf}/>
                  <BookShelf
                    books={this.state.wantRead}
                    title={wantToRead.title}
                    category="wantToRead"
                    changeShelf={this.changeShelf}/>
                  <BookShelf
                    books={this.state.read}
                    title={read.title}
                    category="read"
                    changeShelf={this.changeShelf}/>
                </div>
              </div>
              <div className="open-search">
                <Link to='/search' className='add-a-book' onClick={this.clearSearch}>Add a book</Link>
              </div>
            </div>
          )}/>
          <Route path='/search' render={({ history }) => (
            <div className="search-books">
              <div className="search-books-bar">
                <Link to='/' className="close-search">Close</Link>
                <div className="search-books-input-wrapper">
                  <input type="text"
                  placeholder="Search by title or author"
                  onChange={(event) => {
                    this.updateQuery(event.target.value)
                    }
                  } />
                </div>
              </div>
              <div className="search-books-results">
                <BookShelf
                  books={this.state.books}
                  title='Search Results'
                  category="none"
                  changeShelf={this.changeShelf}/>
              </div>
            </div>
          )}/>
      </div>
    )
  }
}

export default BooksApp
