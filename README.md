## Marcelo's MyReads project

This is the Marcelo's solution for the final assessment project for Udacity's React Fundamentals course, developed by [React Training](https://reacttraining.com). It was based on the template provided by Udacity, https://github.com/udacity/reactnd-project-myreads-starter.

## Installing and running

After clone this project, go to the project path. Make sure you have npm installed, if not get it here https://www.npmjs.com.

In project path, install all dependencies running:

npm install

After that is just run the project using this command:

npm start

If you don't like npm, you may also run using yarn, get it here: https://yarnpkg.com/en/ then just run:

yarn start

After running the start command that you prefer, you will be able to see the project in this address:
http://localhost:3000/

## How to use

In the main page you will see your books divides by categories, Currently reading, want to read and read. You can change the books in the shelves as you want by clicking on the green button. If you want to remove the book, just move it to 'none'.

In the search page you just need to input the name of the book or the author. The books will be shown and you can move it to the shelves as you desire. If a book is already on some of your shelves, it will display the shelf name when you click the green button, if not it must be set as 'none' by default. I am using the template search, so these are the terms that you must use to get responses:

'Android', 'Art', 'Artificial Intelligence', 'Astronomy', 'Austen', 'Baseball', 'Basketball', 'Bhagat', 'Biography', 'Brief', 'Business', 'Camus', 'Cervantes', 'Christie', 'Classics', 'Comics', 'Cook', 'Cricket', 'Cycling', 'Desai', 'Design', 'Development', 'Digital Marketing', 'Drama', 'Drawing', 'Dumas', 'Education', 'Everything', 'Fantasy', 'Film', 'Finance', 'First', 'Fitness', 'Football', 'Future', 'Games', 'Gandhi', 'History', 'History', 'Homer', 'Horror', 'Hugo', 'Ibsen', 'Journey', 'Kafka', 'King', 'Lahiri', 'Larsson', 'Learn', 'Literary Fiction', 'Make', 'Manage', 'Marquez', 'Money', 'Mystery', 'Negotiate', 'Painting', 'Philosophy', 'Photography', 'Poetry', 'Production', 'Program Javascript', 'Programming', 'React', 'Redux', 'River', 'Robotics', 'Rowling', 'Satire', 'Science Fiction', 'Shakespeare', 'Singh', 'Swimming', 'Tale', 'Thrun', 'Time', 'Tolstoy', 'Travel', 'Ultimate', 'Virtual Reality', 'Web Development', 'iOS'


## What You're Getting
```
+--public/    
 |-- index.html - same as provided in template
 |-- favicon.ico - React Icon, You may change if you wish.
+-- src/
 +-- icons/ - Helpful images for your app. Use at your discretion.
  |-- add.svg
  |-- arrow-back.svg
  |-- arrow-drop-down.svg
 |-- App.js - Root of the app, it calls MyReads and Search react components.
 |-- App.css - Styles for the app.
 |-- App.test.js - I'm not using this, same as template.
 |-- Book.js - Book react component used to show a single book.
 |-- BooksAPI.js - A JavaScript API for the provided Udacity backend.
 Instructions for the methods are below.
 |-- BookShelf.js - A react component used to show a shelf of books.
 |-- index.js - same as provided in template.
 |-- index.css - same as provided in template.
 |-- MyReads.js - A react component that shows all shelves, in the case Currently Reading, Want To Read and Read.
 |-- Search.js - A react component that shows the search page.
|-- .gitignore
|-- CONTRIBUTING.MD - Information about contributing to this repo.
TL;DR - Fork and clone your own version of this to use it.
|-- README.MD - This README file.
|-- SEARCH_TERMS.md - The whitelisted short collection of available search terms
for you to use with your app.
|-- package.json - npm package manager file. It's unlikely that you'll need to modify this.
```
