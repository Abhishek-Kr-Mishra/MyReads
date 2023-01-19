import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as BookApi from "../../BooksAPI";
import Book from "../BookShelves/Book";
import PropTypes from "prop-types";
import {debounce} from "lodash" 

const SearchPage = ({ allBooks, updateBookShelf }) => {
  const [searchValue, setSearchValue] = useState("");
  const [searchedBook, setSearchedBook] = useState([]);

  const updateSearchedBook = (book, newShelf) => {
    const updateBook = () => {
      const index = searchedBook.findIndex((bookDetail) => {
        return bookDetail.id === book.id;
      });

      if (index >= 0) {
        let tempSearchedBook = [...searchedBook];
        tempSearchedBook[index].shelf = newShelf;
        setSearchedBook(tempSearchedBook);
        updateBookShelf(book, newShelf);
      }
    };

    updateBook();
  };

  useEffect(() => {
    let isApiAuthorised;
    const searchBook = () => {
      if (searchValue.trim().length > 0) {
        isApiAuthorised = true;
        if (isApiAuthorised) {
          BookApi.search(searchValue, 50)
            .then((data) => {
              if (data.error) {
                setSearchedBook([]);
              } else {
                if (data.length) {
                  allBooks.forEach((book) => {
                    data.forEach((searchBookData) => {
                      if (book.id === searchBookData.id) {
                        searchBookData["shelf"] = book.shelf;
                      }
                    });
                  });
                  setSearchedBook(data);
                } else {
                  setSearchedBook([]);
                }
              }
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } else {
        setSearchedBook([]);
      }
    };

    const debouncedSave = debounce(() => searchBook(), 500);
		debouncedSave();

    return () => {
      if (isApiAuthorised) {
        isApiAuthorised = false;
      }
    };
  }, [searchValue, allBooks]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to="/">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            onChange={(event) => setSearchValue(event.target.value)}
            value={searchValue}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchedBook.map((book) => {
            return (
              <Book
                key={book.id}
                bookDetail={book}
                updateBookShelf={(book, newShelf) =>
                  updateSearchedBook(book, newShelf)
                }
              />
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default SearchPage;

SearchPage.propTypes = {
  allBooks: PropTypes.array.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};
