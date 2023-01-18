import PropTypes from "prop-types";
import Book from "./Book";

const BookShelf = ({ shelf, allBooks, updateBookShelf }) => {
  const filteredBooks = allBooks.filter((book) => {
    return book.shelf === shelf.value;
  });
  return (
    <div>
      <div className="bookshelf">
        <h2 className="bookshelf-title">{shelf.name}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {filteredBooks.map((book) => {
              return (
                <Book
                  key={book.id}
                  bookDetail={book.shelf === shelf.value ? book : ""}
                  updateBookShelf={updateBookShelf}
                />
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default BookShelf;

BookShelf.propTypes = {
  allBooks: PropTypes.array.isRequired,
  shelf: PropTypes.object.isRequired,
  updateBookShelf: PropTypes.func.isRequired,
};
