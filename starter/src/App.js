import "./App.css";
import { useEffect, useState } from "react";
import MainDisplayPage from "./components/BookShelves/MainDisplayPage";
import SearchPage from "./components/Search/SearchPage";
import { Routes, Route } from "react-router-dom";
import * as BookApi from "./BooksAPI";

function App() {
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    const getAllBooks = async () => {
      let response = await BookApi.getAll();

      setAllBooks(response);
    };

    getAllBooks();
  }, []);

  const updateBookShelf = (book, newShelf) => {
    let tempAllBooks = [...allBooks];
    let index = tempAllBooks.findIndex((bookDetail) => {
      return bookDetail.id === book.id;
    });
    if (index >= 0) {
      tempAllBooks[index].shelf = newShelf;
      setAllBooks(tempAllBooks);
    } else {
      BookApi.getAll().then((data) => {
        setAllBooks(data);
      });
    }
  };

  return (
    <div className="app">
      <Routes>
        <Route
          exact
          path="/"
          element={
            <MainDisplayPage
              allBooks={allBooks}
              updateBookShelf={(book, newShelf) =>
                updateBookShelf(book, newShelf)
              }
            ></MainDisplayPage>
          }
        />
        <Route
          path="/search"
          element={
            <SearchPage
              allBooks={allBooks}
              updateBookShelf={(book, newShelf) =>
                updateBookShelf(book, newShelf)
              }
            ></SearchPage>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
