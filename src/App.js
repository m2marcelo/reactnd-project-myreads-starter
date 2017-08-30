import React from 'react'
import { Route, Link } from 'react-router-dom'
import './App.css'
import BookShelf from './BookShelf'
import * as BooksAPI from './BooksAPI'


class BooksApp extends React.Component {

  state = {
    query: '',
    books:[],
    reading: [],
    wantRead: [],
    read: [],
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

  fillShelves = () => {
    let { reading, wantRead, read } = []
    BooksAPI.getAll().then((books) => {
      if (books.length !== 0) {
        reading = books.filter((book) => book.shelf === "currentlyReading")
        wantRead = books.filter((book) => book.shelf === "wantToRead")
        read = books.filter((book) => book.shelf === "read")
        this.setState({reading, wantRead, read})
      }
    })
  }


  componentDidMount() {
    this.fillShelves()
  }

  changeShelf = (shelfName, book) => {
    BooksAPI.update(book, shelfName).then((books) => {
      this.fillShelves()
    })
  }

  clearSearch = () => {
    this.setState({ books: [] })
  }

  render() {
    const { reading, wantRead, read } = this.state

    return (
      <div className="app">
          <Route exact path='/' render={() => (
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
                    changeShelf={this.changeShelf}/>
                  )}
                  {reading.length > 0 && (
                  <BookShelf
                    books={wantRead}
                    title="Want to Read"
                    category="wantToRead"
                    changeShelf={this.changeShelf}/>
                  )}
                  {reading.length > 0 && (
                  <BookShelf
                    books={read}
                    title="Read"
                    category="read"
                    changeShelf={this.changeShelf}/>
                  )}
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
