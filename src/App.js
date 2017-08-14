import React from 'react'
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
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: true,
    query: '',
    books:[]
  }

  updateQuery = (query) => {
    if (query.length > 0){
      BooksAPI.search(query.trim(), 20).then((books) => {
        if (books.error) {
          this.setState({ books: [] })
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
          })
          this.setState({ books })
        }
      })
    }
  }

  render() {
    return (
      <div className="app">
        {this.state.showSearchPage ? (
          <div className="search-books">
            <div className="search-books-bar">
              <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
              <div className="search-books-input-wrapper">
                {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
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
                title='Search Results'/>
            </div>
          </div>
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf
                  books={currentlyReading.books}
                  title={currentlyReading.title}/>
                <BookShelf
                  books={wantToRead.books}
                  title={wantToRead.title}/>
                <BookShelf
                  books={read.books}
                  title={read.title}/>
              </div>
            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
