import React from 'react'
import { Route } from 'react-router-dom'
import './App.css'
import MyReads from './MyReads'
import SearchBooks from './Search'
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
    } else {
      this.clearSearch()
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
            <MyReads
              reading={reading}
              wantRead={wantRead}
              read={read}
              changeShelf={this.changeShelf}
              openSearch={this.clearSearch}/>
          )}/>
          <Route path='/search' render={({ history }) => (
            <SearchBooks
              books={this.state.books}
              inputSearch={this.updateQuery}
              changeShelf={this.changeShelf}/>
          )}/>
      </div>
    )
  }
}

export default BooksApp
